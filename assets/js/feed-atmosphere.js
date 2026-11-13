(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
const body=document.body,home=document.querySelector('.ap-feed-home');
if(!home)return;
const toast=document.getElementById('apToast');
let toastTimer;
const say=message=>{if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)};
if(!reduce){
 for(let i=0;i<16;i++){const star=document.createElement('i');star.className='ap-atmosphere-star';star.textContent=i%4===0?'✳':'·';star.style.left=(4+(i*37)%92)+'%';star.style.top=(8+(i*23)%82)+'%';star.style.setProperty('--duration',(14+(i%7)*3)+'s');star.style.setProperty('--delay',(-i*1.7)+'s');star.style.setProperty('--opacity',(.12+(i%4)*.06));star.style.fontSize=(8+(i%4)*5)+'px';body.appendChild(star);}
}
if(fine&&!reduce){let raf=0;addEventListener('pointermove',e=>{if(raf)return;raf=requestAnimationFrame(()=>{home.style.setProperty('--ap-pointer-x',e.clientX+'px');home.style.setProperty('--ap-pointer-y',e.clientY+'px');raf=0})},{passive:true});}
const shark=document.querySelector('.ap-shark-frame img');
let sharkClicks=0,sharkTimer;
shark?.addEventListener('click',()=>{sharkClicks++;clearTimeout(sharkTimer);sharkTimer=setTimeout(()=>sharkClicks=0,1600);if(sharkClicks>=3){sharkClicks=0;say('鲨鲨：你终于发现我了。🦈')}})
const title=document.querySelector('.ap-title');let titleClicks=0,titleTimer;
title?.addEventListener('click',()=>{titleClicks++;clearTimeout(titleTimer);titleTimer=setTimeout(()=>titleClicks=0,1800);if(titleClicks>=4){titleClicks=0;say('这里没有正确路线，只有你自己的轨道。✳')}})
let code='';
addEventListener('keydown',e=>{if(e.key==='Escape'&&body.classList.contains('ap-orbit-night')){body.classList.remove('ap-orbit-night');say('返回日常轨道。');return}if(e.key.length!==1||e.ctrlKey||e.metaKey||e.altKey)return;code=(code+e.key.toLowerCase()).slice(-5);if(code.endsWith('moon')){code='';body.classList.toggle('ap-orbit-night');say(body.classList.contains('ap-orbit-night')?'月面模式已开启。':'月面模式已关闭。')}});
const heading=document.querySelector('.ap-timeline-heading h2');
heading?.addEventListener('dblclick',()=>say('时间不是直线，是一串被留下的小星星。'));
const scrollHint=document.querySelector('.ap-feed-scroll');
scrollHint?.addEventListener('click',()=>document.querySelector('.ap-timeline-section')?.scrollIntoView({behavior:reduce?'auto':'smooth'}));
if(fine&&!reduce){document.querySelectorAll('.ap-entry-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(1000px) rotateX('+(-y*1.5)+'deg) rotateY('+(x*1.5)+'deg) translateY(-2px)'},{passive:true});card.addEventListener('pointerleave',()=>card.style.transform='')})}
})();
