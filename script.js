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

// Copiar el correo al portapapeles
const copyBtn = document.getElementById('copyEmailBtn');
if (copyBtn) {
  const label = copyBtn.querySelector('.email-label');

  const avisar = (texto) => {
    const original = label.textContent;
    label.textContent = texto;
    setTimeout(() => { label.textContent = original; }, 1500);
  };

  // Reserva para cuando el portapapeles moderno está bloqueado: pasa si la
  // página no va por https o si el navegador niega el permiso. Es una orden
  // obsoleta, pero sigue funcionando en todas partes y no pide permiso.
  const copiarALaAntigua = (texto) => {
    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.setAttribute('readonly', '');
    campo.style.cssText = 'position:fixed;top:-9999px';
    document.body.appendChild(campo);
    campo.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    campo.remove();
    return ok;
  };

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      avisar('¡Copiado!');
      return;
    } catch (e) { /* seguimos con la reserva */ }

    if (copiarALaAntigua(email)) { avisar('¡Copiado!'); return; }

    // Si tampoco, se deja el correo seleccionado para copiarlo a mano. No se
    // toca el texto del botón a propósito: cambiarlo borraría la selección.
    // Antes de esto, un fallo aquí no producía absolutamente nada.
    const sel = window.getSelection();
    const rango = document.createRange();
    rango.selectNodeContents(label);
    sel.removeAllRanges();
    sel.addRange(rango);
  });
}

// El botón "Hablemos" ya es un enlace mailto: no necesita JavaScript.
