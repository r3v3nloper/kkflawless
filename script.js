// KK Flawless – script.js

// ---- Navbar: Scroll-Effekt ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ---- Mobile Menü ----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
});

// Mobile Links schließen das Menü
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
  });
});

// ---- Smooth Scroll für interne Anker ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ---- Galerie: Platzhalter ausblenden wenn Bild geladen ----
document.querySelectorAll('.galerie-item__img').forEach(img => {
  const placeholder = img.closest('.galerie-item')?.querySelector('.img-placeholder');
  if (!placeholder) return;

  const checkLoaded = () => {
    if (img.naturalWidth > 0) {
      img.classList.add('loaded');
      placeholder.style.display = 'none';
    }
  };

  if (img.complete) {
    checkLoaded();
  } else {
    img.addEventListener('load', checkLoaded);
    img.addEventListener('error', () => {
      // Bild nicht gefunden → Platzhalter bleibt sichtbar
    });
  }
});

// ---- Über uns Bild: Platzhalter ----
const ueberUnsImg = document.querySelector('.ueber-uns__img');
if (ueberUnsImg) {
  const placeholder = ueberUnsImg.nextElementSibling;
  const checkLoaded = () => {
    if (ueberUnsImg.naturalWidth > 0) {
      if (placeholder?.classList.contains('img-placeholder')) {
        placeholder.style.display = 'none';
      }
    }
  };
  if (ueberUnsImg.complete) checkLoaded();
  else ueberUnsImg.addEventListener('load', checkLoaded);
}

// ---- Logo Icon Fallbacks (SVG) ----
// Falls SVG nicht geladen wird (z.B. Pfad fehlt), Icon einfach ausblenden
document.querySelectorAll('.navbar__logo-icon-img, .hero__logo-icon, .footer__logo-icon').forEach(img => {
  img.addEventListener('error', () => { img.style.display = 'none'; });
});
