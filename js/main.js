// ---- Switch de logo ----
const logoImg = document.getElementById('logoImg');
const logoButtons = document.querySelectorAll('.logo-switch button');
const savedLogo = localStorage.getItem('logoVariant');
if (savedLogo && logoImg) {
  logoImg.src = savedLogo;
  logoButtons.forEach(b => b.classList.toggle('is-active', b.dataset.logo === savedLogo));
}
logoButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.logo;
    logoImg.src = src;
    localStorage.setItem('logoVariant', src);
    logoButtons.forEach(b => b.classList.toggle('is-active', b === btn));
  });
});

// ---- Menu burger (mobile) ----
const burger = document.querySelector('.burger');
const hdr = document.querySelector('.hdr');
if (burger && hdr) {
  burger.addEventListener('click', () => {
    const open = hdr.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      hdr.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', e => {
    if (hdr.classList.contains('menu-open') && !hdr.contains(e.target)) {
      hdr.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ---- Carrousel d'avis clients ----
const reviewCarousel = document.getElementById('reviewCarousel');
if (reviewCarousel) {
  const slides = Array.from(reviewCarousel.querySelectorAll('[data-slide-index]'));
  const dots = Array.from(reviewCarousel.querySelectorAll('.review-carousel__dot'));
  const nav = reviewCarousel.querySelector('.review-carousel__nav');
  let current = 0;

  function showSlide(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, j) => { s.hidden = j !== current; });
    dots.forEach((d, j) => d.classList.toggle('is-active', j === current));
  }

  if (slides.length <= 1) {
    if (nav) nav.hidden = true;
  } else {
    reviewCarousel.querySelectorAll('.review-carousel__arrow').forEach(btn => {
      btn.addEventListener('click', () => showSlide(current + Number(btn.dataset.dir)));
    });
    dots.forEach((dot, j) => dot.addEventListener('click', () => showSlide(j)));
  }
}

// ---- Apparition au défilement ----
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
