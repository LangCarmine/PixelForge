/* ═══════════════════════════════════════════════════════════
   NEWSLETTER
   ═══════════════════════════════════════════════════════════ */

(function newsletter() {
  const nlForm = document.getElementById('newsletterForm');
  if (!nlForm) return;

  const nlEmail = document.getElementById('newsletterEmail');
  const nlBtn = document.getElementById('newsletterBtn');
  const nlMsg = document.getElementById('newsletterMsg');

  nlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = nlEmail.value.trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      nlMsg.className = 'newsletter-msg';
      nlMsg.style.color = '#fca5a5';
      nlMsg.textContent = '> ERROR: EMAIL NO VÁLIDO';
      if (state.soundEnabled) SFX.error();
      return;
    }

    nlBtn.textContent = '...';
    nlMsg.style.color = '';
    nlMsg.textContent = '> INSERTANDO DISK...';
    if (state.soundEnabled) SFX.coin();

    setTimeout(() => {
      nlBtn.textContent = 'SUSCRIBIR';
      nlMsg.className = 'newsletter-msg ok';
      nlMsg.textContent = '> OK · REVISA TU BANDEJA DE ENTRADA';
      nlEmail.value = '';
      if (state.soundEnabled) SFX.success();
      unlockAchievement('newsletter', 'SUSCRIPTOR', 'Te suscribiste al dispatch');
    }, 1200);
  });
})();