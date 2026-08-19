const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
if (burger) {
  burger.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      header.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (e) => {
    if (header.classList.contains('menu-open') && !header.contains(e.target)) {
      header.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
    chip.setAttribute('aria-pressed', 'true');
  });
});

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
