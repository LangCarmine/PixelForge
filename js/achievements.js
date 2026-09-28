/* ═══════════════════════════════════════════════════════════
   CATÁLOGO DE LOGROS + LÓGICA DE DESBLOQUEO
   ═══════════════════════════════════════════════════════════ */

const ACHIEVEMENTS = [
  { id: 'sound',      icon: '🎵', name: 'AUDIÓFILO',          desc: 'Activaste el sonido y ambient loop' },
  { id: 'crt',        icon: '📺', name: 'PURISTA CRT',        desc: 'Activaste el filtro CRT intenso' },
  { id: 'speed',      icon: '⚡', name: 'SPEEDRUNNER',        desc: 'Activaste el modo speedrun 3x' },
  { id: 'explorer',   icon: '🗺️', name: 'EXPLORADOR',         desc: 'Has visitado todas las secciones' },
  { id: 'calc',       icon: '🧮', name: 'CALCULADORA',        desc: 'Usaste el estimador de presupuesto' },
  { id: 'contact',    icon: '✉️', name: 'PRIMER CONTACTO',    desc: 'Enviaste un briefing desde el form' },
  { id: 'newsletter', icon: '💾', name: 'SUSCRIPTOR',         desc: 'Te suscribiste al PixelForge Dispatch' },
  { id: 'konami',     icon: '🕹️', name: 'KONAMI MASTER',      desc: '↑↑↓↓←→←→BA desbloqueado' },
  { id: 'night',      icon: '🌙', name: 'VISITANTE NOCTURNO', desc: 'Accediste entre 0-6am' },
  { id: 'returning',  icon: '🔄', name: 'REINCIDENTE',        desc: 'Has vuelto 3+ veces' },
  { id: 'master',     icon: '👑', name: 'MAESTRO PIXELFORGE', desc: 'Desbloquea todos los demás logros' }
];

const toastContainer = document.getElementById('toastContainer');
const achPopup = document.getElementById('achPopup');
const achBadge = document.getElementById('achBadge');
const achPanel = document.getElementById('achPanel');
const achBtn = document.getElementById('achBtn');
const achClose = document.getElementById('achClose');
const achGrid = document.getElementById('achGrid');
const achCount = document.getElementById('achCount');
const achProgressFill = document.getElementById('achProgressFill');
const achFooter = document.getElementById('achFooter');

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function updateAchBadge() {
  const count = state.achievements.length;
  achBadge.textContent = count;
  achBadge.style.display = count > 0 ? 'grid' : 'none';
}

function unlockAchievement(id, name, desc) {
  if (state.achievements.includes(id)) return;
  state.achievements.push(id);
  saveState();

  document.getElementById('achName').textContent = name;
  document.getElementById('achDesc').textContent = desc;
  achPopup.classList.remove('show');
  void achPopup.offsetWidth;
  achPopup.classList.add('show');

  if (state.soundEnabled) SFX.achievement();
  setTimeout(() => showToast(`LOGRO: ${name}`), 200);
  updateAchBadge();

  // ¿Todos desbloqueados? -> MAESTRO
  const all = ACHIEVEMENTS.filter(a => a.id !== 'master').every(a => state.achievements.includes(a.id));
  if (all && !state.achievements.includes('master')) {
    setTimeout(() => {
      unlockAchievement('master', 'MAESTRO PIXELFORGE', 'Has desbloqueado todos los logros');
    }, 1200);
  }
}

function renderAchievements() {
  achGrid.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = state.achievements.includes(a.id);
    const item = document.createElement('div');
    item.className = 'ach-item ' + (unlocked ? 'unlocked' : 'locked');
    item.innerHTML = `
      <div class="ach-icon">${unlocked ? a.icon : '🔒'}</div>
      <div class="ach-info">
        <div class="ach-item-name">${unlocked ? a.name : '???'}</div>
        <div class="ach-item-desc">${unlocked ? a.desc : 'Sigue explorando para desbloquear'}</div>
      </div>
      <div class="ach-item-status">${unlocked ? '✓' : '—'}</div>
    `;
    achGrid.appendChild(item);
  });

  const count = state.achievements.length;
  const total = ACHIEVEMENTS.length;
  achCount.textContent = `${count} / ${total}`;
  achProgressFill.style.width = (count / total * 100) + '%';

  if (count === total) {
    achFooter.textContent = '★ FELICIDADES · HAS COMPLETADO EL JUEGO ★';
    achFooter.style.color = 'var(--accent)';
  } else {
    achFooter.textContent = '▸ Completa todos los logros para desbloquear el secreto final';
    achFooter.style.color = 'var(--accent-2)';
  }
}

function initAchievements() {
  achBtn.addEventListener('click', () => {
    renderAchievements();
    achPanel.classList.add('show');
    if (state.soundEnabled) SFX.click();
  });

  achClose.addEventListener('click', () => {
    achPanel.classList.remove('show');
    if (state.soundEnabled) SFX.click();
  });

  achPanel.addEventListener('click', (e) => {
    if (e.target === achPanel) achPanel.classList.remove('show');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && achPanel.classList.contains('show')) {
      achPanel.classList.remove('show');
    }
  });

  updateAchBadge();
}