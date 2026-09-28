/* ═══════════════════════════════════════════════════════════
   UI TOGGLES — Sonido, CRT, Speedrun, Presentation
   ═══════════════════════════════════════════════════════════ */

const soundBtn = document.getElementById('soundBtn');
const crtBtn = document.getElementById('crtBtn');
const speedBtn = document.getElementById('speedBtn');

function initSoundToggle() {
  soundBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    soundBtn.classList.toggle('on', state.soundEnabled);
    soundBtn.textContent = state.soundEnabled ? '♫' : '♪';
    if (state.soundEnabled) {
      initAudio();
      SFX.coin();
      state.ambientEnabled = true;
      startAmbient();
      unlockAchievement('sound', 'AUDIÓFILO', 'Activaste el sonido y ambient loop');
    } else {
      stopAmbient();
    }
    saveState();
  });

  // Atajo de teclado: M
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      soundBtn.click();
    }
  });
}

function initCrtToggle() {
  // Restaurar estado guardado
  if (state.crtIntense) {
    crtBtn.classList.add('on');
    createCrtOverlay();
  }

  crtBtn.addEventListener('click', () => {
    state.crtIntense = !state.crtIntense;
    crtBtn.classList.toggle('on', state.crtIntense);

    let overlay = document.getElementById('crtOverlay');
    if (state.crtIntense && !overlay) {
      createCrtOverlay();
      unlockAchievement('crt', 'PURISTA CRT', 'Activaste el filtro CRT intenso');
    } else if (overlay) {
      overlay.remove();
    }
    saveState();
  });
}

function createCrtOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'crtOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;pointer-events:none;z-index:9998;
    background:
      repeating-linear-gradient(0deg, rgba(0,0,0,.15) 0 1px, transparent 1px 3px),
      radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.5) 100%);
    mix-blend-mode:multiply;
  `;
  document.body.appendChild(overlay);
}

function initSpeedToggle() {
  speedBtn.addEventListener('click', () => {
    state.speedrun = !state.speedrun;
    document.body.classList.toggle('speedrun', state.speedrun);
    speedBtn.classList.toggle('on', state.speedrun);
    if (state.soundEnabled) SFX.click();
    if (state.speedrun) {
      unlockAchievement('speed', 'SPEEDRUNNER', 'Activaste el modo speedrun 3x');
    }
    saveState();
  });
}

function initPresentationMode() {
  if (new URLSearchParams(location.search).get('present') === '1') {
    document.body.classList.add('present-mode');
  }
}