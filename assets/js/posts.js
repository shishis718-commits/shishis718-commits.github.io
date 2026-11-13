(()=>{'use strict';
const root=document.getElementById('ap-published-posts');
if(!root)return;
const category=document.body.className.split(/\s+/).find(x=>/^page-/.test(x))?.replace('page-','');
const labels={daily:'日常生活',culture:'书影音',fanworks:'同人档案',interests:'兴趣收藏'};
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const safeImage=value=>{const v=String(value||'');return /^(https?:\/\/|\/|assets\/)/i.test(v)?escapeHTML(v):''};
const inline=value=>escapeHTML(value).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code>$1</code>');
const renderBody=value=>String(value||'').trim().split(/\n\s*\n/).filter(Boolean).map(part=>'<p>'+inline(part).replace(/\n/g,'<br>')+'</p>').join('');
const formatDate=value=>{if(!value)return '';const m=String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);return m?m[1]+'.'+m[2]+'.'+m[3]:escapeHTML(value)};
fetch('content/posts.json',{cache:'no-store'}).then(response=>{if(!response.ok)throw new Error('Article list unavailable');return response.json()}).then(data=>{
 const articles=(Array.isArray(data.articles)?data.articles:[]).filter(item=>item&&item.category===category&&item.title).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
 if(!articles.length)return;
 root.hidden=false;
 root.querySelector('.ap-posts-count').textContent=String(articles.length).padStart(2,'0')+' ENTRIES';
 root.querySelector('.ap-posts-list').innerHTML=articles.map(item=>{
  const cover=safeImage(item.cover);
  return '<article class="ap-published-card">'+
   (cover?'<img class="ap-post-cover" src="'+cover+'" alt="" loading="lazy">':'')+
   '<div class="ap-post-copy"><div class="ap-post-meta"><span>'+escapeHTML(labels[item.category]||'APPLE PLANET')+'</span><time>'+formatDate(item.date)+'</time></div>'+
   '<h3>'+escapeHTML(item.title)+'</h3>'+
   (item.excerpt?'<p class="ap-post-excerpt">'+escapeHTML(item.excerpt)+'</p>':'')+
   '<details class="ap-post-details"><summary>展开全文 <span aria-hidden="true">↗</span></summary><div class="ap-post-body">'+renderBody(item.body)+'</div></details></div></article>';
 }).join('');
 }).catch(()=>{ /* Keep the existing page intact if the article feed is unavailable. */ });
})();