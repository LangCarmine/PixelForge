/* ═══════════════════════════════════════════════════════════
   PIXELFORGE — Punto de entrada principal
   Inicializa todos los módulos en orden
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar módulos
  initAchievements();
  initTheme();
  initSoundToggle();
  initCrtToggle();
  initSpeedToggle();
  initPresentationMode();

  // Reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const canvas = document.getElementById('heroCanvas');
    if (canvas) canvas.style.display = 'none';
  }

  console.log('%c▓ PIXELFORGE v5.1 ▓', 'color:#f97316;font-family:monospace;font-size:16px;');
  console.log('%c¿Buscas bugs? Pulsa ↑↑↓↓←→←→BA', 'color:#fbbf24;font-family:monospace;');
});