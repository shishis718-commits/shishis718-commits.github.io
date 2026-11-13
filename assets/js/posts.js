(()=>{'use strict';
const root=document.getElementById('ap-published-posts');if(!root)return;
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const safeImage=value=>{const v=String(value||'');return /^(https?:\/\/|\/|assets\/)/i.test(v)?escapeHTML(v):''};
const safeLink=value=>{const v=String(value||'');return /^(https?:\/\/|\/)/i.test(v)?escapeHTML(v):''};
const inline=value=>escapeHTML(value).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code>$1</code>');
const renderBody=value=>String(value||'').trim().split(/\n\s*\n/).filter(Boolean).map(part=>'<p>'+inline(part).replace(/\n/g,'<br>')+'</p>').join('');
const dateParts=value=>{const m=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})/);return m?{year:m[1],label:m[1]+'.'+m[2]+'.'+m[3],iso:m[1]+'-'+m[2]+'-'+m[3]}:{year:'未注明日期',label:escapeHTML(value||'日期未注明'),iso:''}};
const tagList=item=>Array.isArray(item.tags)?item.tags.map(x=>String(x).trim()).filter(Boolean):[];
fetch('content/posts.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('feed unavailable');return r.json()}).then(data=>{
 const articles=(Array.isArray(data.articles)?data.articles:[]).filter(x=>x&&x.title).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
 const filter=root.querySelector('.ap-tag-filter');const list=root.querySelector('.ap-posts-list');const count=root.querySelector('.ap-posts-count');
 if(!articles.length){root.querySelector('.ap-posts-heading .meta').textContent='NOTHING HERE YET / FIRST NOTE SOON';count.textContent='00 ENTRIES';return;}
 const tags=[...new Set(articles.flatMap(tagList))].sort((a,b)=>a.localeCompare(b,'zh-CN'));
 filter.hidden=false;filter.innerHTML='<button type="button" class="is-active" data-tag="*">全部 <span>'+articles.length+'</span></button>'+tags.map(t=>'<button type="button" data-tag="'+escapeHTML(t)+'">'+escapeHTML(t)+' <span>'+articles.filter(a=>tagList(a).includes(t)).length+'</span></button>').join('');
 const render=active=>{
  const shown=articles.filter(a=>active==='*'||tagList(a).includes(active));
  count.textContent=String(shown.length).padStart(2,'0')+' ENTRIES';
  if(!shown.length){list.innerHTML='<p class="ap-empty-state">这个标签下面暂时还没有内容。</p>';return;}
  let lastYear='';
  list.innerHTML=shown.map((item,i)=>{const d=dateParts(item.date);const cover=safeImage(item.cover);const download=safeLink(item.download);const tagsHtml=tagList(item).map(t=>'<span class="ap-post-tag">'+escapeHTML(t)+'</span>').join('');
   const yearMark=d.year!==lastYear?'<div class="ap-year-marker"><span>'+escapeHTML(d.year)+'</span></div>':'';lastYear=d.year;
   const actions=download?'<div class="ap-post-actions"><a class="ap-download-button" href="'+download+'" download>↓ 下载文件</a></div>':'';
   return yearMark+'<article class="ap-timeline-entry"><div class="ap-entry-date"><time'+(d.iso?' datetime="'+d.iso+'"':'')+'>'+d.label+'</time><i></i></div><div class="ap-entry-card">'+(cover?'<img class="ap-post-cover" src="'+cover+'" alt="" loading="lazy">':'')+'<div class="ap-post-copy">'+(tagsHtml?'<div class="ap-post-tags">'+tagsHtml+'</div>':'')+'<h3>'+escapeHTML(item.title)+'</h3>'+(item.excerpt?'<p class="ap-post-excerpt">'+escapeHTML(item.excerpt)+'</p>':'')+'<details class="ap-post-details"><summary>展开内容 <span aria-hidden="true">↗</span></summary><div class="ap-post-body">'+renderBody(item.body)+'</div></details>'+actions+'</div></div></article>';
  }).join('');
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.08});
  list.querySelectorAll('.ap-timeline-entry').forEach(el=>observer.observe(el));
 };
 filter.addEventListener('click',e=>{const button=e.target.closest('button[data-tag]');if(!button)return;filter.querySelectorAll('button').forEach(b=>b.classList.toggle('is-active',b===button));render(button.dataset.tag)});
 root.querySelector('.ap-posts-heading .meta').textContent='THE ARCHIVE / EVERY NOTE HAS ITS MOMENT';render('*');
}).catch(()=>{root.querySelector('.ap-posts-heading .meta').textContent='THE PLANET IS QUIET RIGHT NOW';root.querySelector('.ap-posts-list').innerHTML='<p class="ap-empty-state">内容暂时无法加载，请稍后刷新。</p>';});
})();