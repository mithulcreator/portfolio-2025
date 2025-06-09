import { useEffect, useRef } from 'react';

export default function AnimatedBlobs() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let blobs = [];
    const colors = [
      'rgba(99,102,241,0.18)', // blue
      'rgba(168,85,247,0.16)', // purple
      'rgba(236,72,153,0.14)', // pink
      'rgba(34,211,238,0.13)', // cyan
      'rgba(251,191,36,0.10)'  // yellow
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Blob {
      constructor(i) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 180 + 120;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = colors[i % colors.length];
        this.alpha = Math.random() * 0.5 + 0.2;
        this.wave = Math.random() * 2 * Math.PI;
      }
      update() {
        this.x += this.speedX + Math.sin(Date.now() / 2000 + this.wave) * 0.1;
        this.y += this.speedY + Math.cos(Date.now() / 2000 + this.wave) * 0.1;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.filter = 'blur(16px)';
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.filter = 'none';
      }
    }

    const init = () => {
      blobs = [];
      for (let i = 0; i < 7; i++) {
        blobs.push(new Blob(i));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach(blob => {
        blob.update();
        blob.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();
    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ opacity: 0.7 }}
    />
  );
} 