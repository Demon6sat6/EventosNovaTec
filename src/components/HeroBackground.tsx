import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    // En móvil usamos resolución reducida para mejor rendimiento
    const dpr = Math.min(window.devicePixelRatio, W < 768 ? 1 : 1.5);
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    // Menos partículas en móvil para mejor rendimiento
    const COUNT = W < 768 ? 30 : 80;
    // En móvil muy pequeño, skip animación pesada
    if (W < 480) {
      canvas.style.display = 'none';
      return;
    }
    const particles = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      a:  Math.random() * 0.5 + 0.2,
      c:  Math.random() > 0.5 ? '124,58,237' : '236,72,153',
    }));

    let mx = W / 2, my = H / 2;
    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      const d = Math.min(window.devicePixelRatio, W < 768 ? 1 : 1.5);
      canvas.width  = W * d; canvas.height = H * d;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.scale(d, d);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      // Orbe parallax suave
      const ox = (mx / W - 0.5) * 40;
      const oy = (my / H - 0.5) * 30;
      const g1 = ctx.createRadialGradient(W * 0.5 + ox, H * 0.3 + oy, 0, W * 0.5 + ox, H * 0.3 + oy, W * 0.5);
      g1.addColorStop(0,   'rgba(124,58,237,0.12)');
      g1.addColorStop(0.5, 'rgba(124,58,237,0.04)');
      g1.addColorStop(1,   'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * 0.8 - ox, H * 0.7 - oy, 0, W * 0.8 - ox, H * 0.7 - oy, W * 0.4);
      g2.addColorStop(0,   'rgba(236,72,153,0.08)');
      g2.addColorStop(1,   'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Partículas
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }}
    />
  );
}
