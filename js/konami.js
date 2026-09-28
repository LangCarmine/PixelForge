/* ═══════════════════════════════════════════════════════════
   KONAMI CODE EASTER EGG
   ═══════════════════════════════════════════════════════════ */

(function konami() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIdx = 0;
  const egg = document.getElementById('easterEgg');
  const eggClose = document.getElementById('eggClose');
  if (!egg) return;

  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konamiCode[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konamiCode.length) {
        konamiIdx = 0;
        egg.classList.add('show');
        if (state.soundEnabled) {
          [523, 659, 784, 1046].forEach((f, i) =>
            setTimeout(() => beep(f, 0.2, 'square', 0.07), i * 120)
          );
        }
        unlockAchievement('konami', 'KONAMI MASTER', '↑↑↓↓←→←→BA');
      }
    } else {
      konamiIdx = 0;
    }
  });

  eggClose.addEventListener('click', () => egg.classList.remove('show'));
})();