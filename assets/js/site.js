(function(){
 var root=document.documentElement;
 function send(n,p){try{if(window.gtag){window.gtag('event',n,p||{});}}catch(e){}}
 function setTheme(t,save){
  root.setAttribute('data-theme',t);
  if(save){try{localStorage.setItem('theme',t);}catch(e){}}
  [].slice.call(document.querySelectorAll('[data-theme-set]')).forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-theme-set')===t));});
  var shot=document.getElementById('hero-shot');
  if(shot){var s=shot.getAttribute('data-'+t);if(s){shot.setAttribute('src',s);}}
  var cap=document.getElementById('hero-theme-label');
  if(cap){cap.textContent={light:'Light',dark:'Dark',night:'Night'}[t];}
 }
 var cur=root.getAttribute('data-theme')||'light';
 setTheme(cur,false);
 [].slice.call(document.querySelectorAll('[data-theme-set]')).forEach(function(b){
  b.addEventListener('click',function(){var t=b.getAttribute('data-theme-set');setTheme(t,true);send('theme_switch',{theme:t});});
 });
 var tg=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');
 if(tg&&nav){
  tg.addEventListener('click',function(){var o=nav.getAttribute('data-open')==='true';nav.setAttribute('data-open',String(!o));tg.setAttribute('aria-expanded',String(!o));});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.getAttribute('data-open')==='true'){nav.setAttribute('data-open','false');tg.setAttribute('aria-expanded','false');tg.focus();}});
 }
 document.addEventListener('click',function(e){
  var a=e.target.closest?e.target.closest('a'):null;if(!a||!a.href){return;}
  var u=a.href;
  if(u.indexOf('mailto:')===0){send('click_email',{location:a.getAttribute('data-loc')||'page'});}
  else if(u.indexOf('tel:')===0){send('click_phone');}
  else if(u.indexOf('linkedin.com')>-1){send('click_linkedin');}
  else if(u.indexOf('youtube.com')>-1){send('click_video',{video_url:u});}
  else if(u.indexOf('figma.com')>-1){send('click_figma');}
  else if(/resume\.pdf$/.test(u)){send('resume_download');}
  if(a.hasAttribute('data-cta')){send('cta_click',{cta:a.getAttribute('data-cta')});}
 });
 if('IntersectionObserver' in window){
  var seen={};
  var io=new IntersectionObserver(function(es){es.forEach(function(en){var k=en.target.getAttribute('data-view');if(en.isIntersecting&&k&&!seen[k]){seen[k]=1;send('view_section',{section:k});}});},{threshold:.3});
  [].slice.call(document.querySelectorAll('[data-view]')).forEach(function(s){io.observe(s);});
 }
})();
