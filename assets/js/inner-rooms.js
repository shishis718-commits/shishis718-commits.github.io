(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const say=(el,msg)=>{if(el)el.textContent=msg};
if(document.body.classList.contains('page-daily')){
 const feedback=$('.daily-feedback');
 $$('.mood-options button').forEach(btn=>btn.addEventListener('click',()=>{$$('.mood-options button').forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));say(feedback,'已记下今天的心情：'+btn.dataset.mood+'。不用解释，留个标记就好。')}));
 const prompts=['今天有什么瞬间，让你想把时间按下暂停？','最近听到的最好听的一种声音是什么？','今天有没有一件很小、但让你舒服一点的事？','如果给今天起一个电影标题，会叫什么？','最近有什么东西正在悄悄改变你的心情？'];
 const q=$('.prompt-question'),next=$('.prompt-button');next?.addEventListener('click',()=>say(q,prompts[Math.floor(Math.random()*prompts.length)]));
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