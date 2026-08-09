import { forwardRef, useEffect, useRef } from 'react';

const GameCanvas = forwardRef(function GameCanvas({ onScore, onGameOver }, ref) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const stateRef = useRef({ running: true, player: { x: 92, y: 0, vy: 0, grounded: true }, obstacles: [], distance: 0, speed: 5, nextObstacle: 520, last: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 800; let height = 330; let ground = 260;
    const resize = () => { const rect = canvas.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2); width = rect.width; height = rect.height; ground = height * .77; canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); window.addEventListener('resize', resize);

    const jump = () => { const s = stateRef.current; if (s.running && s.player.grounded) { s.player.vy = -13; s.player.grounded = false; } };
    const key = (e) => { if (e.code === 'Space') { e.preventDefault(); jump(); } };
    window.addEventListener('keydown', key, { passive: false });
    canvas.addEventListener('pointerdown', jump);

    const draw = (now) => {
      const s = stateRef.current; const dt = Math.min((now - (s.last || now)) / 16.67, 2); s.last = now;
      ctx.clearRect(0, 0, width, height);
      const bg = ctx.createLinearGradient(0, 0, width, height); bg.addColorStop(0, '#f8fbff'); bg.addColorStop(1, '#edf2ff'); ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(120,103,245,.09)'; ctx.lineWidth = 1;
      for (let x = -((s.distance * .25) % 42); x < width; x += 42) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 150, height); ctx.stroke(); }
      ctx.fillStyle = 'rgba(23,200,212,.08)'; ctx.beginPath(); ctx.arc(width * .72, height * .25, 80, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#cbd6ef'; ctx.beginPath(); ctx.moveTo(0, ground + 15); ctx.lineTo(width, ground + 15); ctx.stroke();
      ctx.strokeStyle = 'rgba(120,103,245,.16)'; ctx.setLineDash([3, 9]); ctx.beginPath(); ctx.moveTo(0, ground + 16); ctx.lineTo(width, ground + 16); ctx.stroke(); ctx.setLineDash([]);
      if (s.running) {
        s.player.vy += .66 * dt; s.player.y += s.player.vy * dt;
        if (s.player.y >= 0) { s.player.y = 0; s.player.vy = 0; s.player.grounded = true; }
        s.speed = Math.min(9, 5 + s.distance / 900); s.distance += .14 * s.speed * dt; s.nextObstacle -= s.speed * dt;
        if (s.nextObstacle < 0) { const h = 25 + Math.random() * 38; s.obstacles.push({ x: width + 20, w: 18 + Math.random() * 15, h }); s.nextObstacle = 330 + Math.random() * 300 - s.speed * 18; }
        s.obstacles.forEach(o => o.x -= s.speed * dt); s.obstacles = s.obstacles.filter(o => o.x > -50);
        const px = 76; const py = ground - 26 + s.player.y;
        for (const o of s.obstacles) { if (px + 26 > o.x && px < o.x + o.w && py + 24 > ground - o.h && py < ground) { s.running = false; onGameOver(Math.floor(s.distance)); } }
        onScore(Math.floor(s.distance));
      }
      s.obstacles.forEach(o => { ctx.fillStyle = '#7867f5'; ctx.shadowColor = 'rgba(120,103,245,.3)'; ctx.shadowBlur = 12; ctx.beginPath(); ctx.roundRect(o.x, ground - o.h, o.w, o.h, 5); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = '#17c8d4'; ctx.fillRect(o.x + 4, ground - o.h + 7, 4, 4); });
      const px = 76; const py = ground - 26 + s.player.y; ctx.save(); ctx.translate(px, py); ctx.fillStyle = '#17233f'; ctx.shadowColor = 'rgba(23,35,63,.18)'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.roundRect(0, 7, 29, 19, 7); ctx.fill(); ctx.fillStyle = '#17c8d4'; ctx.beginPath(); ctx.roundRect(17, 0, 18, 15, 6); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(27, 6, 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#7867f5'; ctx.fillRect(5, 25, 5, 8); ctx.fillRect(21, 25, 5, 8); ctx.restore();
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', resize); window.removeEventListener('keydown', key); canvas.removeEventListener('pointerdown', jump); };
  }, [onGameOver, onScore]);

  return <div className="canvas-wrap"><canvas ref={canvasRef} role="img" aria-label="Jeu de course : sautez par-dessus les obstacles" /></div>;
});

export default GameCanvas;