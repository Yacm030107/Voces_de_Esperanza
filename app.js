fetch('datos.json').then(r=>r.json()).then(d=>{
  const gf=document.getElementById('gridFotos');
  d.fotos.forEach(f=>{
    const fig=document.createElement('figure');
    const img=document.createElement('img');
    img.src=f.file; img.alt=f.evento; img.loading='lazy'; img.decoding='async';
    const cap=document.createElement('figcaption');
    cap.textContent=f.evento;
    fig.appendChild(img); fig.appendChild(cap);
    fig.onclick=()=>{const lb=document.getElementById('lightbox');document.getElementById('lightboxImg').src=f.file;document.getElementById('lightboxCap').textContent=f.evento;lb.hidden=false;};
    gf.appendChild(fig);
  });
  const gv=document.getElementById('gridVideos');
  d.clips.forEach(c=>{
    const card=document.createElement('div');card.className='repro';
    const pant=document.createElement('div');pant.className='pantalla';
    const v=document.createElement('video');v.src=c.file;v.controls=true;v.preload='metadata';v.poster=c.file.replace('clip-','poster-').replace('.mp4','.jpg');v.disablePictureInPicture=true;v.setAttribute('controlsList','nodownload noremoteplayback');v.setAttribute('playsinline','');
    v.addEventListener('play',()=>{document.querySelectorAll('#gridVideos video').forEach(o=>{if(o!==v)o.pause();});});
    pant.appendChild(v);
    const p=document.createElement('div');p.className='titulo';p.textContent=c.evento;
    card.appendChild(pant);card.appendChild(p);gv.appendChild(card);
  });
}).catch(e=>{document.getElementById('gridFotos').textContent='No se pudo cargar datos.json: '+e;});
document.getElementById('lightbox').onclick=e=>{e.currentTarget.hidden=true;};
// Un video a la vez y solo dentro del sitio: pausa al cambiar de pestaña o al salir de pantalla
document.addEventListener('visibilitychange',()=>{if(document.hidden){document.querySelectorAll('video').forEach(v=>v.pause());};});
const obsOff=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting){e.target.pause();}});},{threshold:0.2});
new MutationObserver(()=>{document.querySelectorAll('#gridVideos video').forEach(v=>obsOff.observe(v));}).observe(document.getElementById('gridVideos'),{childList:true});
const PASO_FOTOS=[
  {img:'fotos/foto-02.jpg',cap:'Nace Voces de Esperanza · UTH Villanueva · Jun 2025'},
  {img:'fotos/foto-10.jpg',cap:'Previo a la primera presentación · FUNCAIN · Ago 2025'},
  {img:'fotos/foto-06.jpg',cap:'Presentación FUNCAIN · 10 Sept 2025'},
  {img:'fotos/foto-03.jpg',cap:'Bienvenida 3er período · UTH Villanueva · 2025'},
  {img:'fotos/foto-04.jpg',cap:'Bienvenida · 7 Feb 2026'},
  {img:'fotos/foto-08.jpg',cap:'Evento cristiano · 17 May 2026'},
];
function activaEtapa(k){
  if(!PASO_FOTOS[k])return;
  document.querySelectorAll('.etapa').forEach(t=>t.classList.toggle('activa',+t.dataset.paso===k));
  document.getElementById('fotoPaso').src=PASO_FOTOS[k].img;
  document.getElementById('capPaso').textContent=PASO_FOTOS[k].cap;
}
document.querySelectorAll('.etapa').forEach(el=>{
  el.addEventListener('click',()=>activaEtapa(+el.dataset.paso));
});
activaEtapa(0);
