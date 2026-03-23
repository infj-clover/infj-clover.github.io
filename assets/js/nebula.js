// ── NEBULA PARTICLE FIELD ──────────────────────────
(function initNebula() {
  const canvas = document.getElementById('meteors');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const PALETTES = [
    { r: 0,  g: 194, b: 204 },
    { r: 0,  g: 140, b: 180 },
    { r: 30, g: 80,  b: 180 },
    { r: 60, g: 0,   b: 140 },
    { r: 0,  g: 160, b: 160 },
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function build() {
    particles = [];
    const count = Math.floor((W * H) / 5800);
    for (let i = 0; i < count; i++) {
      const pal   = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const layer = Math.random();
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 12 + layer * 55 + Math.random() * 30,
        alpha: 0.018 + layer * 0.045 + Math.random() * 0.025,
        vx: (Math.random() - .5) * (0.04 + layer * 0.12),
        vy: (Math.random() - .5) * (0.03 + layer * 0.10),
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: 0.003 + Math.random() * 0.004,
        r_: pal.r, g_: pal.g, b_: pal.b,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.pulse += p.pulseSpeed;
      const a = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0,    `rgba(${p.r_},${p.g_},${p.b_},${a})`);
      g.addColorStop(0.45, `rgba(${p.r_},${p.g_},${p.b_},${a * 0.4})`);
      g.addColorStop(1,    `rgba(${p.r_},${p.g_},${p.b_},0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      const bl = p.r;
      if (p.x < -bl) p.x = W + bl;
      if (p.x > W+bl) p.x = -bl;
      if (p.y < -bl) p.y = H + bl;
      if (p.y > H+bl) p.y = -bl;
    }
    requestAnimationFrame(draw);
  }

  resize(); build(); draw();
  window.addEventListener('resize', () => { resize(); build(); });
})();
