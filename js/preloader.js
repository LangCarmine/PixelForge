/* ═══════════════════════════════════════════════════════════
   PRELOADER
   ═══════════════════════════════════════════════════════════ */

(function preloader() {
  const pre = document.getElementById('preloader');
  const bar = document.getElementById('preBar');
  const status = document.getElementById('preStatus');
  const messages = [
    '> BOOTING SYSTEM...',
    '> LOADING SPRITES...',
    '> RENDERING SHADERS...',
    '> COMPILING PIXELS...',
    '> READY PLAYER ONE.'
  ];
  let progress = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 12 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      status.textContent = messages[messages.length - 1];
      setTimeout(() => {
        pre.classList.add('done');
        checkWelcomeBack();
      }, 500);
    }
    bar.style.width = progress + '%';
    const t = Math.min(Math.floor(progress / 22), messages.length - 1);
    if (t !== msgIdx) {
      msgIdx = t;
      status.textContent = messages[msgIdx];
    }
  }, 160);

  const skip = () => {
    clearInterval(interval);
    bar.style.width = '100%';
    status.textContent = '> READY PLAYER ONE.';
    setTimeout(() => {
      pre.classList.add('done');
      checkWelcomeBack();
    }, 200);
    document.removeEventListener('keydown', skip);
  };
  document.addEventListener('keydown', skip);
})();

function checkWelcomeBack() {
  if (state.visits > 1) {
    setTimeout(() => showToast(`WELCOME BACK · VISITA #${state.visits}`), 800);
    if (state.visits >= 3) {
      unlockAchievement('returning', 'REINCIDENTE', 'Has vuelto 3+ veces');
    }
  }
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 6) {
    setTimeout(() => unlockAchievement('night', 'VISITANTE NOCTURNO', 'Accediste entre 0-6am'), 1500);
  }
  updateAchBadge();
}