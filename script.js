// Simple JS for mobile interactions: nav toggle, smooth scroll, reveal sections, form stub
document.addEventListener('DOMContentLoaded', function(){
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', function(){
    const open = nav.classList.toggle('open');
    nav.setAttribute('aria-hidden', !open);
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({top, behavior:'smooth'});
        // close nav on mobile
        nav.classList.remove('open');
        nav.setAttribute('aria-hidden', true);
      }
    });
  });

  // IntersectionObserver to reveal sections
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('inview');
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.section').forEach(s => io.observe(s));

  // Contact form basic handler (no network)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    if(!name || !email){
      alert('Por favor completa nombre y correo.');
      return;
    }
    // Simulate success microinteraction
    const btn = form.querySelector('.btn-primary');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(()=>{
      btn.textContent = 'Enviado';
      btn.style.opacity = '0.9';
      form.reset();
      setTimeout(()=>{ btn.disabled = false; btn.textContent = 'Enviar'; }, 1400);
    }, 900);
  });
});
