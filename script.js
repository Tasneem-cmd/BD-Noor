const scenes = [...document.querySelectorAll('.scene')];
const dots = [...document.querySelectorAll('.dot')];
const confettiLayer = document.getElementById('confetti');
const colors = ['#f36e91','#f5c96b','#ffb99d','#ccebdc','#d6c4ff','#ffffff'];
let currentScene = 0;
function showScene(id) {
  const nextIndex = scenes.findIndex(scene => scene.id === id);
  if (nextIndex < 0 || nextIndex === currentScene) return;
  const oldScene = scenes[currentScene];
  oldScene.classList.remove('active');
  window.setTimeout(() => {
    oldScene.hidden = true;
    scenes[nextIndex].hidden = false;
    requestAnimationFrame(() => scenes[nextIndex].classList.add('active'));
    currentScene = nextIndex;
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentScene));
  }, 180);
}
function burst(count = 95) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('i');
    piece.className = 'confetti-piece';
    piece.style.setProperty('--left', `${Math.random() * 100}%`);
    piece.style.setProperty('--piece-color', colors[Math.floor(Math.random() * colors.length)]);
    piece.style.setProperty('--duration', `${2 + Math.random() * 2.1}s`);
    piece.style.setProperty('--drift', `${Math.random() * 240 - 120}px`);
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 4400);
  }
}
document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => {
  const target = button.dataset.next;
  showScene(target);
  if (target === 'scene-2') burst(65);
  if (target === 'scene-6') burst(45);
}));
const candles = [...document.querySelectorAll('.candle')];
const candleHint = document.getElementById('candle-hint');
candles.forEach((candle, index) => candle.addEventListener('click', () => {
  if (candle.classList.contains('blown')) return;
  candle.classList.add('blown');
  candle.setAttribute('aria-label', `Candle ${index + 1} blown out`);
  const remaining = candles.filter(item => !item.classList.contains('blown')).length;
  if (remaining) {
    candleHint.textContent = `${remaining} candle${remaining === 1 ? '' : 's'} left… don’t forget your wish. 🤫`;
  } else {
    candleHint.textContent = 'Wish made! May Allah make it beautiful. Ameen. 💗';
    document.getElementById('cake-next').hidden = false;
    burst(90);
  }
}));
document.getElementById('celebrate').addEventListener('click', () => {
  burst(190);
  document.getElementById('celebrate').textContent = 'HAPPY BIRTHDAY, NOOR! 🎂💗';
});
