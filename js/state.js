/* ═══════════════════════════════════════════════════════════
   ESTADO GLOBAL + PERSISTENCIA
   ═══════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'pixelforge_state_v51';

const defaultState = {
  theme: 'orange',
  soundEnabled: false,
  ambientEnabled: false,
  crtIntense: false,
  speedrun: false,
  lastSection: 'hero',
  achievements: [],
  visits: 1,
  lastVisit: Date.now()
};

// Cargar estado guardado o usar el por defecto
let state = { ...defaultState };

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  if (saved) {
    state = {
      ...defaultState,
      ...saved,
      visits: (saved.visits || 0) + 1,
      lastVisit: Date.now()
    };
  }
} catch (e) {
  console.warn('No se pudo cargar el estado:', e);
}

// Guardar estado en localStorage
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('No se pudo guardar el estado:', e);
  }
}

// Guardar al salir
window.addEventListener('beforeunload', saveState);