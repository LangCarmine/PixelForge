/* ═══════════════════════════════════════════════════════════
   AUDIO — SFX + AMBIENT LOOP
   ═══════════════════════════════════════════════════════════ */

let audioCtx = null;
let ambientNode = null;
let ambientGain = null;

function initAudio() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return null;
    }
  }
  return audioCtx;
}

function beep(freq, duration, type = 'square', volume = 0.05) {
  if (!state.soundEnabled) return;
  const ctx = initAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

const SFX = {
  hover: () => beep(880, 0.05, 'square', 0.02),
  click: () => beep(1200, 0.08, 'square', 0.04),
  coin: () => {
    beep(1046, 0.08, 'square', 0.06);
    setTimeout(() => beep(1568, 0.15, 'square', 0.06), 80);
  },
  error: () => {
    beep(200, 0.1, 'sawtooth', 0.05);
    setTimeout(() => beep(150, 0.2, 'sawtooth', 0.05), 100);
  },
  success: () => {
    beep(523, 0.1, 'square', 0.05);
    setTimeout(() => beep(659, 0.1, 'square', 0.05), 100);
    setTimeout(() => beep(784, 0.2, 'square', 0.05), 200);
  },
  achievement: () => {
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 0.15, 'square', 0.07), i * 100));
  },
  themeSwitch: () => {
    beep(440, 0.05, 'square', 0.04);
    setTimeout(() => beep(660, 0.05, 'square', 0.04), 50);
    setTimeout(() => beep(880, 0.1, 'square', 0.05), 100);
  }
};

function startAmbient() {
  if (!state.soundEnabled || ambientNode) return;
  const ctx = initAudio();
  if (!ctx) return;
  ambientGain = ctx.createGain();
  ambientGain.gain.value = 0.015;
  ambientGain.connect(ctx.destination);
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = 110;
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.3;
  lfoGain.gain.value = 15;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  osc.connect(ambientGain);
  osc.start();
  lfo.start();
  ambientNode = { osc, lfo };
}

function stopAmbient() {
  if (ambientNode) {
    try {
      ambientNode.osc.stop();
      ambientNode.lfo.stop();
    } catch (e) {}
    ambientNode = null;
  }
  if (ambientGain) {
    try { ambientGain.disconnect(); } catch (e) {}
    ambientGain = null;
  }
}

function setAmbientFrequency(freq) {
  if (ambientNode && audioCtx) {
    ambientNode.osc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.5);
  }
}