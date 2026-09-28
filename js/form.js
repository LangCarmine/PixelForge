/* ═══════════════════════════════════════════════════════════
   FORMULARIO DE CONTACTO
   ═══════════════════════════════════════════════════════════ */

(function form() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const formMessage = document.getElementById('formMessage');

  function validateField(input) {
    const field = input.closest('.terminal-field');
    const errEl = field.querySelector('.field-error');
    const name = input.name;
    const val = input.value.trim();
    let error = '';

    input.classList.remove('error', 'valid');
    field.classList.remove('valid');

    if (!val && input.required) error = '> ERROR: CAMPO REQUERIDO';
    else if (name === 'email' && val && !/^\S+@\S+\.\S+$/.test(val)) error = '> ERROR: EMAIL NO VÁLIDO';
    else if (name === 'nombre' && val && val.length < 2) error = '> ERROR: NOMBRE MUY CORTO';
    else if (name === 'mensaje' && val && val.length < 10) error = '> ERROR: MENSAJE MUY CORTO';

    if (error) {
      input.classList.add('error');
      errEl.textContent = error;
      return false;
    } else if (val) {
      input.classList.add('valid');
      field.classList.add('valid');
      errEl.textContent = '';
      return true;
    } else {
      errEl.textContent = '';
      return false;
    }
  }

  let debounceTimers = {};
  form.querySelectorAll('input[required], textarea[required]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      clearTimeout(debounceTimers[input.name]);
      debounceTimers[input.name] = setTimeout(() => {
        if (input.value.trim()) validateField(input);
      }, 400);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v1 = validateField(form.nombre);
    const v2 = validateField(form.email);
    const v3 = validateField(form.mensaje);

    formMessage.className = 'form-message';
    formMessage.textContent = '';

    if (!v1 || !v2 || !v3) {
      if (state.soundEnabled) SFX.error();
      formMessage.classList.add('err');
      formMessage.textContent = '> ERROR: REVISA LOS CAMPOS MARCADOS';
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    if (state.soundEnabled) SFX.coin();
    submitBtn.classList.add('loading');
    btnText.textContent = 'INSERTANDO MONEDA...';
    formMessage.textContent = '> PROCESANDO BRIEFING...';

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      btnText.textContent = '✔ BRIEFING RECIBIDO';
      formMessage.classList.add('ok');
      formMessage.textContent = `> OK · ${form.nombre.value.toUpperCase()} · ${form.servicio.value.toUpperCase()} · NOS PONEMOS EN CONTACTO`;

      if (state.soundEnabled) SFX.success();
      unlockAchievement('contact', 'PRIMER CONTACTO', 'Enviaste un briefing');

      setTimeout(() => {
        form.reset();
        submitBtn.classList.remove('success');
        btnText.textContent = 'INSERT COIN · ENVIAR';
        formMessage.textContent = '';
        form.querySelectorAll('.terminal-field').forEach(f => {
          f.classList.remove('valid');
          f.querySelector('.field-error').textContent = '';
        });
        form.querySelectorAll('input, textarea').forEach(i => i.classList.remove('valid', 'error'));
      }, 3500);
    }, 1800);
  });
})();