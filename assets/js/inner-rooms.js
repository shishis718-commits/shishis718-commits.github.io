(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const say=(el,msg)=>{if(el)el.textContent=msg};
if(document.body.classList.contains('page-daily')){
 const feedback=$('.daily-feedback');
 $$('.mood-options button').forEach(btn=>btn.addEventListener('click',()=>{$$('.mood-options button').forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));say(feedback,'已记下今天的心情：'+btn.dataset.mood+'。不用解释，留个标记就好。')}));
 const prompts=['今天有什么瞬间，让你想把时间按下暂停？','最近听到的最好听的一种声音是什么？','今天有没有一件很小、但让你舒服一点的事？','如果给今天起一个电影标题，会叫什么？','最近有什么东西正在悄悄改变你的心情？'];
 const q=$('.prompt-question'),next=$('.prompt-button');next?.addEventListener('click',()=>say(q,prompts[Math.floor(Math.random()*prompts.length)]));
 const postmark=$('.postmark-button'),postmarkResult=$('.postmark-result');
 const keepsakes=['愿你记得，某个普通夜晚也曾闪闪发亮。','把这一刻折起来，夹进未来某一天的书页。','今晚的风经过这里，替你保管一点温柔。','世界很大，而这一小段路也值得纪念。','不必发生大事，活过今天就已经很好。'];
 postmark?.addEventListener('click',()=>{
  const now=new Date(),date=now.toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric'});
  const mood=$('.mood-options button[aria-pressed="true"]')?.dataset.mood;
  postmarkResult.replaceChildren();
  const stamp=document.createElement('span');stamp.className='postmark-stamp';stamp.textContent='APPLE PLANET / MOON MAIL';
  const line=document.createElement('span');line.className='postmark-date';line.textContent=date+(mood?' · 今日天气：'+mood:' · 一封无天气的信');
  const note=document.createElement('span');note.className='postmark-note';note.textContent=keepsakes[Math.floor(Math.random()*keepsakes.length)];
  postmarkResult.append(stamp,line,note);postmarkResult.classList.add('is-stamped');postmark.setAttribute('aria-pressed','true');
 });
}
if(document.body.classList.contains('page-culture')){
 const cards=$$('.content-section .content-card');
 const filters=$$('.culture-filters button');
 filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));const f=btn.dataset.filter;cards.forEach(card=>{card.hidden=f!=='all'&&!card.dataset.kind?.split(' ').includes(f)})}));
}
if(document.body.classList.contains('page-interests')){
 const cards=$$('.page-content .content-card'),filters=$$('.interest-filters button'),result=$('.interest-result');
 filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));const f=btn.dataset.filter;cards.forEach(card=>{card.hidden=f!=='all'&&card.dataset.kind!==f;card.classList.remove('is-picked')})}));
 $('.random-interest')?.addEventListener('click',()=>{const visible=cards.filter(c=>!c.hidden);if(!visible.length)return;cards.forEach(c=>c.classList.remove('is-picked'));const chosen=visible[Math.floor(Math.random()*visible.length)];chosen.classList.add('is-picked');say(result,'今日随机打开：'+(chosen.querySelector('h3')?.textContent||'一份收藏')+' —— 去看看它吧。');chosen.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'})});
}
})();