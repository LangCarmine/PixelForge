/* ═══════════════════════════════════════════════════════════
   PARTÍCULAS EN EL HERO
   ═══════════════════════════════════════════════════════════ */

(function particles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const mouse = { x: -1000, y: -1000 };

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function getAccent() {
    const t = document.body.dataset.theme;
    if (t === 'cyan') return { a: '#22d3ee', b: '#f0abfc' };
    if (t === 'gameboy') return { a: '#9bbc0f', b: '#c4d68c' };
    if (t === 'day') return { a: '#ea580c', b: '#a16207' };
    return { a: '#f97316', b: '#fbbf24' };
  }

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - .5) * 0.5,
      vy: (Math.random() - .5) * 0.5,
      size: Math.random() > .7 ? 4 : 2,
      color: Math.random() > .5 ? 'a' : 'b'
    });
  }

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const c = getAccent();
    particles.forEach(p => {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x += (dx / dist) * force * 3;
        p.y += (dy / dist) * force * 3;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      p.x = Math.max(0, Math.min(w, p.x));
      p.y = Math.max(0, Math.min(h, p.y));
      ctx.fillStyle = p.color === 'a' ? c.a : c.b;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();