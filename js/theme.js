/* ═══════════════════════════════════════════════════════════
   TEMA — cambio de paleta con glitch
   ═══════════════════════════════════════════════════════════ */

const themes = ['orange', 'cyan', 'gameboy'];
const themeBtn = document.getElementById('themeBtn');
const themeGlitch = document.getElementById('themeGlitch');

function applyTheme(t) {
  document.body.dataset.theme = t;
  state.theme = t;
  saveState();
  themeGlitch.classList.remove('active');
  void themeGlitch.offsetWidth;
  themeGlitch.classList.add('active');
  if (state.soundEnabled) SFX.themeSwitch();
}

function initTheme() {
  document.body.dataset.theme = state.theme;

  themeBtn.addEventListener('click', () => {
    const current = document.body.dataset.theme;
    const idx = themes.indexOf(current);
    const next = themes[(idx + 1) % themes.length];
    applyTheme(next);
  });

  themeBtn.addEventListener('dblclick', () => {
    const hour = new Date().getHours();
    applyTheme((hour >= 7 && hour < 20) ? 'day' : 'orange');
  });
}