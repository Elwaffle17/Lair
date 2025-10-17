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




document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('.instagram-carousel');

    // AQUÍ PEGAS TUS ENLACES DE INSTAGRAM
    const videoLinks = [
        "https://www.instagram.com/reel/DP4yiqgCXE2/?igsh=N245Y2hwdGR5cHMw",
        "https://www.instagram.com/reel/DPiL3iQjgR5/?igsh=a2U5bG5taHVnaGg=",
        "https://www.instagram.com/reel/C2i0agnLu3A/",
        "https://www.instagram.com/reel/C8C8Jd2Od59/",
        // Añade más enlaces aquí si lo deseas
    ];

    // Función para crear cada video incrustado
    function createInstagramEmbed(link) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';

        const blockquote = document.createElement('blockquote');
        blockquote.className = 'instagram-media';
        blockquote.setAttribute('data-instgrm-captioned', '');
        blockquote.setAttribute('data-instgrm-permalink', link);
        blockquote.setAttribute('data-instgrm-version', '14');
        blockquote.style.width = '100%';

        videoContainer.appendChild(blockquote);
        carouselContainer.appendChild(videoContainer);
    }

    // Cargar los videos del array
    videoLinks.forEach(link => {
        createInstagramEmbed(link);
    });

    // Cargar el script de incrustación de Instagram
    const instagramScript = document.createElement('script');
    instagramScript.async = true;
    instagramScript.src = "//www.instagram.com/embed.js";
    document.head.appendChild(instagramScript);

    // Una vez que el script de Instagram se carga, procesa los videos
    instagramScript.onload = () => {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    };
});

