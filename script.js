/* Confirmar os dados antes de ativar o atendimento. Nunca reutilizar contatos de outro cliente. */
const OFFICE_PHONE = '5511917968087';
const areas = ['trabalhista', 'previdenciario', 'civil'];
const messages = {trabalhista:'Quero conversar sobre uma questão trabalhista.',previdenciario:'Quero conversar sobre uma questão previdenciária.',civil:'Quero conversar sobre um contrato, imóvel ou financiamento.'};
document.querySelectorAll('[data-contact]').forEach(link=>{link.href=`https://wa.me/${OFFICE_PHONE}?text=${encodeURIComponent('Olá, Primiano & Nakazone. '+messages[link.dataset.contact])}`;});
const select = document.querySelector('#contact-area');
contact(select.value);
function contact(area){select.value=area;document.querySelector('#contact-context').textContent=messages[area];if(OFFICE_PHONE){const link=document.querySelector('#contact-whatsapp');link.href=`https://wa.me/${OFFICE_PHONE}?text=${encodeURIComponent('Olá, Primiano & Nakazone. '+messages[area])}`;link.classList.remove('disabled');link.removeAttribute('aria-disabled');link.removeAttribute('tabindex');document.querySelector('#contact-note').textContent='Ao continuar, você será direcionado ao WhatsApp do escritório.';}}
function activate(area,update=false){if(!areas.includes(area))return;areas.forEach(key=>{const tab=document.querySelector('#tab-'+key);tab.setAttribute('aria-selected',String(key===area));tab.tabIndex=key===area?0:-1;document.querySelector('#panel-'+key).hidden=key!==area;});contact(area);if(update)history.pushState(null,'','#'+area);}
document.querySelectorAll('[data-tab]').forEach(tab=>{tab.addEventListener('click',()=>activate(tab.dataset.tab,true));tab.addEventListener('keydown',event=>{const index=areas.indexOf(tab.dataset.tab);let next;if(event.key==='ArrowRight')next=(index+1)%3;if(event.key==='ArrowLeft')next=(index+2)%3;if(event.key==='Home')next=0;if(event.key==='End')next=2;if(next!==undefined){event.preventDefault();activate(areas[next],true);document.querySelector('#tab-'+areas[next]).focus();}});});
document.querySelectorAll('[data-area]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();activate(link.dataset.area,true);document.querySelector('#areas').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}));
document.querySelectorAll('[data-contact]').forEach(link=>link.addEventListener('click',()=>contact(link.dataset.contact)));
select.addEventListener('change',()=>contact(select.value));
function route(){const area=location.hash.slice(1)||new URLSearchParams(location.search).get('area');if(areas.includes(area)){activate(area);document.querySelector('#areas').scrollIntoView();}}
window.addEventListener('hashchange',route);window.addEventListener('popstate',route);route();
const menuButton=document.querySelector('.menu-toggle'),menu=document.querySelector('#mobile-menu');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}});
document.querySelector('#year').textContent=new Date().getFullYear();
