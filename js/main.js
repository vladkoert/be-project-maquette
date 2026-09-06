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

// ---- Accordéon « Notre approche » (un seul volet ouvert, comme le template) ----
const accItems = document.querySelectorAll('.acc__item');
accItems.forEach(item => {
  const btn = item.querySelector('.acc__btn');
  if (btn.getAttribute('aria-expanded') === 'true') item.classList.add('is-open');
  btn.addEventListener('click', () => {
    const willOpen = !item.classList.contains('is-open');
    accItems.forEach(other => {
      other.classList.remove('is-open');
      other.querySelector('.acc__btn').setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

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
