(()=>{'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body=document.body;
const messages={
'page-daily':['你发现了一枚生活碎片。','今日份普通，也值得被收藏。','月亮今晚也在加班。'],
'page-culture':['书页里藏着另一种人生。','暂停一下，故事还没结束。','你正在解锁私人放映室。'],
'page-fanworks':['档案编号 AP-404：一段舍不得忘记的故事。','虚构世界，真实心动。','本档案仅供快乐使用。'],
'page-interests':['收藏癖是宇宙扩张的一种方式。','发现新东西的雷达已启动。','奇怪但喜欢，完全合理。']
};
const key=Object.keys(messages).find(k=>body.classList.contains(k))||'page-daily';
const progress=document.createElement('div');progress.id='ap-reading-progress';document.body.appendChild(progress);
const toast=document.createElement('div');toast.id='ap-secret-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.appendChild(toast);
const mark=document.createElement('div');mark.className='ap-floating-mark';mark.textContent='✳ stay curious';document.body.appendChild(mark);
let toastTimer;
function secret(msg){toast.textContent=msg;toast.classList.add('is-visible');document.querySelector('.site-header .brand-icon')?.classList.add('ap-egg-glow');clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.classList.remove('is-visible');document.querySelector('.site-header .brand-icon')?.classList.remove('ap-egg-glow')},3000)}
function update(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%'}
addEventListener('scroll',update,{passive:true});update();
let clicks=0,resetTimer;
const brand=document.querySelector('.site-header .brand');
brand?.addEventListener('click',e=>{clicks++;clearTimeout(resetTimer);resetTimer=setTimeout(()=>clicks=0,2600);if(clicks>=5){e.preventDefault();clicks=0;secret('APPLE PLANET // '+messages[key][Math.floor(Math.random()*messages[key].length)]);}});
let typed='';addEventListener('keydown',e=>{if(e.key.length===1){typed=(typed+e.key.toLowerCase()).slice(-5);if(typed==='apple'){typed='';secret('SECRET KEY ACCEPTED ✳ 欢迎回到苹果星球。')}}});
if(!reduce&&matchMedia('(pointer:fine)').matches){let last=0;addEventListener('pointermove',e=>{const now=performance.now();if(now-last<95)return;last=now;const s=document.createElement('i');s.className='ap-orbit-speck';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';s.style.setProperty('--dx',(Math.random()*34-17)+'px');s.style.setProperty('--dy',(Math.random()*34-17)+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),900)},{passive:true});}
if(!reduce){document.querySelectorAll('.content-card,.photo-item,.data-panel').forEach(el=>{el.addEventListener('pointermove',e=>{if(!matchMedia('(pointer:fine)').matches)return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(850px) rotateX('+(-y*2.8)+'deg) rotateY('+(x*2.8)+'deg) translateY(-3px)'},{passive:true});el.addEventListener('pointerleave',()=>{el.style.transform='';});});}
document.querySelector('.page-hero h1')?.addEventListener('dblclick',()=>secret(messages[key][Math.floor(Math.random()*messages[key].length)]));
})();