// ── THEME TOGGLE ───────────────────────────────────
(function () {
  // 저장된 테마 불러오기 (없으면 light 기본)
  const saved = localStorage.getItem('void-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  const btn = document.getElementById('tbtn');
  if (btn) btn.textContent = saved === 'dark' ? 'LIGHT' : 'DARK';

  window.toggleTheme = function () {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('void-theme', next);
    document.getElementById('tbtn').textContent = next === 'dark' ? 'LIGHT' : 'DARK';
  };
})();
