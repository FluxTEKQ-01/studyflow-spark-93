
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    function initParticles() {
      particles.current = [];
      const particleCount = Math.min(50, Math.floor(window.innerWidth * window.innerHeight / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }

    const drawGrid = () => {
      const time = Date.now() * 0.001;
      const gridSize = 40;
      const amplitude = 2;
      const frequency = 0.05;
      
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const waveY = y + Math.sin(x * frequency + time) * amplitude;
          ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 5) {
          const waveX = x + Math.sin(y * frequency + time) * amplitude;
          ctx.lineTo(waveX, y);
        }
        ctx.stroke();
      }
    };

    const drawGlowCircles = () => {
      const time = Date.now() * 0.001;
      const circleCount = 3;
      
      for (let i = 0; i < circleCount; i++) {
        const x = canvas.width * (0.2 + (i * 0.3));
        const y = canvas.height * (0.3 + Math.sin(time * 0.5 + i) * 0.1);
        const radius = 100 + Math.sin(time + i * Math.PI/2) * 30;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.05)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'hsla(220, 33%, 6%, 1)');
      gradient.addColorStop(1, 'hsla(220, 33%, 4%, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      drawGrid();
      
      // Draw glow effect
      drawGlowCircles();
      
      // Update and draw particles
      particles.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap particles around the screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;
