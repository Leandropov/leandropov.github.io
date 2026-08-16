document.documentElement.classList.add('js');

// Reveal blur-in on scroll
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
revealEls.forEach(el => io.observe(el));

// Trigger the hero heading immediately (it's above the fold on load)
requestAnimationFrame(() => {
  const hero = document.querySelector('.hero [data-reveal]');
  if (hero) setTimeout(() => hero.classList.add('is-visible'), 150);
});

// Copy email to clipboard
const copyBtn = document.getElementById('copyEmailBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      const label = copyBtn.querySelector('.email-label');
      const original = label.textContent;
      label.textContent = 'Copied!';
      setTimeout(() => { label.textContent = original; }, 1500);
    } catch (e) {
      // clipboard API unavailable — no-op
    }
  });
}

// El botón "Hablemos" ya es un enlace mailto: no necesita JavaScript.
