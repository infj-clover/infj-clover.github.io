// ── CLOCK & BUILD DATE ─────────────────────────────
(function () {
  function tick() {
    const el = document.getElementById('clk');
    if (!el) return;
    const n = new Date();
    el.textContent = [n.getHours(), n.getMinutes(), n.getSeconds()]
      .map(v => String(v).padStart(2, '0')).join(':');
    setTimeout(tick, 1000);
  }
  tick();

  const bd = document.getElementById('bdate');
  if (bd) {
    const d = new Date();
    bd.textContent = d.getFullYear() + '.'
      + String(d.getMonth() + 1).padStart(2, '0') + '.'
      + String(d.getDate()).padStart(2, '0');
  }
})();
