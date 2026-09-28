/* ═══════════════════════════════════════════════════════════
   CALCULADORA DE PRESUPUESTO
   ═══════════════════════════════════════════════════════════ */

(function calculator() {
  const sliders = {
    pages:   { el: document.getElementById('sliderPages'),   val: document.getElementById('valPages'),   cost: 250 },
    assets:  { el: document.getElementById('sliderAssets'),  val: document.getElementById('valAssets'),  cost: 400 },
    shaders: { el: document.getElementById('sliderShaders'), val: document.getElementById('valShaders'), cost: 600 },
    support: { el: document.getElementById('sliderSupport'), val: document.getElementById('valSupport'), cost: 150 }
  };
  const totalEl = document.getElementById('calcTotal');
  if (!totalEl) return;

  function update() {
    let total = 800;
    Object.values(sliders).forEach(s => {
      const v = +s.el.value;
      s.val.textContent = v;
      total += v * s.cost;
    });
    totalEl.textContent = '$' + total.toLocaleString('en-US');
  }

  Object.values(sliders).forEach(s => {
    s.el.addEventListener('input', update);
    s.el.addEventListener('change', () => {
      unlockAchievement('calc', 'CALCULADORA', 'Usaste el estimador de presupuesto');
    });
  });
  update();
})();