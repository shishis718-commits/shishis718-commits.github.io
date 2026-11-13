(()=>{'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body=document.body;
const messages={
'page-daily':['你发现了一枚生活碎片。','今日份普通，也值得被收藏。','月亮今晚也在加班。','别急，生活正在加载下一帧。'],
'page-culture':['书页里藏着另一种人生。','暂停一下，故事还没结束。','你正在解锁私人放映室。','片尾字幕之后，还有彩蛋。'],
'page-fanworks':['档案编号 AP-404：一段舍不得忘记的故事。','虚构世界，真实心动。','本档案仅供快乐使用。','警告：可能在此停留过久。'],
'page-interests':['收藏癖是宇宙扩张的一种方式。','发现新东西的雷达已启动。','奇怪但喜欢，完全合理。','你的小宇宙又扩大了一点。']
};
const key=Object.keys(messages).find(k=>body.classList.contains(k))||'page-daily';
const progress=document.createElement('div');progress.id='ap-reading-progress';document.body.appendChild(progress);
const toast=document.createElement('div');toast.id='ap-secret-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.appendChild(toast);
const mark=document.createElement('button');mark.className='ap-floating-mark';mark.type='button';mark.textContent='✳ stay curious';mark.setAttribute('aria-label','切换星球夜航模式');document.body.appendChild(mark);
let toastTimer;
function secret(msg){toast.textContent=msg;toast.classList.add('is-visible');document.querySelector('.site-header .brand-icon')?.classList.add('ap-egg-glow');clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.classList.remove('is-visible');document.querySelector('.site-header .brand-icon')?.classList.remove('ap-egg-glow')},3000)}
function update(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%'}
addEventListener('scroll',update,{passive:true});update();
let clicks=0,resetTimer;
const brand=document.querySelector('.site-header .brand');
brand?.addEventListener('click',e=>{clicks++;clearTimeout(resetTimer);resetTimer=setTimeout(()=>clicks=0,2600);if(clicks>=5){e.preventDefault();clicks=0;secret('APPLE PLANET // '+messages[key][Math.floor(Math.random()*messages[key].length)]);}});
let typed='';addEventListener('keydown',e=>{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey){typed=(typed+e.key.toLowerCase()).slice(-5);if(typed==='apple'){typed='';secret('SECRET KEY ACCEPTED ✳ 欢迎回到苹果星球。')}if(typed.endsWith('orbit')){typed='';body.classList.toggle('ap-orbit-mode');secret(body.classList.contains('ap-orbit-mode')?'轨道模式已开启。慢慢漂浮吧。':'已返回日常轨道。')}}});
mark.addEventListener('click',()=>{body.classList.toggle('ap-orbit-mode');secret(body.classList.contains('ap-orbit-mode')?'夜航模式启动 ✳':'夜航模式结束，欢迎回来。')});
let idleTimer;
function resetIdle(){clearTimeout(idleTimer);idleTimer=setTimeout(()=>secret('宇宙没有催你。慢慢逛。'),52000)}
['pointerdown','keydown','scroll'].forEach(type=>addEventListener(type,resetIdle,{passive:true}));resetIdle();
if(!reduce&&matchMedia('(pointer:fine)').matches){let last=0;addEventListener('pointermove',e=>{const now=performance.now();if(now-last<115)return;last=now;const s=document.createElement('i');s.className='ap-orbit-speck';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';s.style.setProperty('--dx',(Math.random()*34-17)+'px');s.style.setProperty('--dy',(Math.random()*34-17)+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),900)},{passive:true});}
if(!reduce){document.querySelectorAll('.content-card,.photo-item,.data-panel').forEach(el=>{el.addEventListener('pointermove',e=>{if(!matchMedia('(pointer:fine)').matches)return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(850px) rotateX('+(-y*2.8)+'deg) rotateY('+(x*2.8)+'deg) translateY(-3px)'},{passive:true});el.addEventListener('pointerleave',()=>{el.style.transform='';});});}
document.querySelector('.page-hero h1')?.addEventListener('dblclick',()=>secret(messages[key][Math.floor(Math.random()*messages[key].length)]));
let imageClicks=0,imageReset;
document.querySelectorAll('.photo-item img,.content-card img').forEach(img=>img.addEventListener('click',()=>{imageClicks++;clearTimeout(imageReset);imageReset=setTimeout(()=>imageClicks=0,1800);if(imageClicks>=3){imageClicks=0;secret('这张也被放进记忆收藏夹了。✳')}}));
document.addEventListener('click',e=>{if(reduce||!e.target.closest('a,button,input,textarea,select,.content-card,.photo-item'))return;const spark=document.createElement('i');spark.className='ap-click-spark';spark.textContent=['✳','·','✦'][Math.floor(Math.random()*3)];spark.style.left=e.clientX+'px';spark.style.top=e.clientY+'px';document.body.appendChild(spark);setTimeout(()=>spark.remove(),750)},{passive:true});
})();