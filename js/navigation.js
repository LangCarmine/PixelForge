/* ═══════════════════════════════════════════════════════════
   NAVEGACIÓN — HUD, scroll reveal, teclado, FAQ
   ═══════════════════════════════════════════════════════════ */

(function navigation() {
  const sectionIds = ['#hero', '#services', '#showreel', '#projects', '#team', '#pricing', '#contact'];
  const sections = sectionIds.map(s => document.querySelector(s)).filter(Boolean);
  const lvlBtns = document.querySelectorAll('.lvl-btn');
  const progressFill = document.getElementById('progressFill');
  const lvlNum = document.getElementById('lvlNum');

  const ambientFreqs = {
    hero: 110, services: 130, showreel: 146, projects: 164,
    team: 196, pricing: 220, contact: 174
  };

  function updateHUD() {
    const y = window.scrollY + window.innerHeight / 2;
    let active = 0;
    sections.forEach((s, i) => {
      if (s && s.offsetTop <= y) active = i;
    });

    lvlBtns.forEach((b, i) => b.classList.toggle('active', i === active));

    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressFill.style.width = Math.min(pct, 100) + '%';

    const total = lvlBtns.length;
    lvlNum.textContent = Math.min(active + 1, total) + '/' + total;

    const currentSectionId = sections[active]?.id;
    if (currentSectionId && ambientFreqs[currentSectionId]) {
      setAmbientFrequency(ambientFreqs[currentSectionId]);
    }
    if (currentSectionId && state.lastSection !== currentSectionId) {
      state.lastSection = currentSectionId;
      saveState();
    }
    if (active >= sections.length - 1 && !state.achievements.includes('explorer')) {
      unlockAchievement('explorer', 'EXPLORADOR', 'Has visitado todas las secciones');
    }
  }

  window.addEventListener('scroll', updateHUD, { passive: true });
  window.addEventListener('resize', updateHUD);
  updateHUD();

  // Reveal por scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        const val = e.target.querySelector('[data-target]');
        if (val) countUp(val);
      }
    });
  }, { threshold: .15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.tp-in, .scan-reveal, .drop-in, .glitch-in').forEach(el => io.observe(el));

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = +el.dataset.target;
    const dur = 1600;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = String(Math.floor(eased * target)).padStart(3, '0');
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = String(target).padStart(3, '0');
    }
    requestAnimationFrame(tick);
  }

  // Hero reveal
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('.hero .tp-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('on'), i * 140);
      });
    }, 1600);
  });

  // Navegación teclado
  let currentSectionIdx = 0;
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      currentSectionIdx = Math.min(currentSectionIdx + 1, sections.length - 1);
      sections[currentSectionIdx].scrollIntoView({ behavior: 'smooth' });
      if (state.soundEnabled) SFX.hover();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      currentSectionIdx = Math.max(currentSectionIdx - 1, 0);
      sections[currentSectionIdx].scrollIntoView({ behavior: 'smooth' });
      if (state.soundEnabled) SFX.hover();
    } else if (e.key === 'Escape') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentSectionIdx = 0;
    }
  });

  window.addEventListener('scroll', () => {
    const y = window.scrollY + window.innerHeight / 2;
    sections.forEach((s, i) => {
      if (s && s.offsetTop <= y) currentSectionIdx = i;
    });
  }, { passive: true });

  // FAQ acordeón
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
      if (state.soundEnabled) SFX.click();
    });
  });
})();