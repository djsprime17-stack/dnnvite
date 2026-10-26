import React, { useEffect, useRef } from 'react';

/**
 * PetalsCanvas: Lightweight HTML5 Canvas rendering gentle falling flower petals
 * (pastel dusty pink, ivory, and champagne gold) with realistic natural sway and rotation.
 */
export default function PetalsCanvas({ count = 28 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

        const handleResize = () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        };

        window.addEventListener('resize', handleResize);

        // Petal colors: dusty pink, soft cream, ivory, and subtle champagne gold
        const petalColors = [
            'rgba(255, 230, 235, 0.75)',
            'rgba(250, 218, 221, 0.65)',
            'rgba(247, 233, 222, 0.7)',
            'rgba(255, 240, 245, 0.8)',
            'rgba(245, 215, 185, 0.55)',
        ];

        // Initialize particles
        const petals = [];
        for (let i = 0; i < count; i++) {
            petals.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                size: Math.random() * 9 + 6,
                speedY: Math.random() * 1.2 + 0.8,
                speedX: Math.random() * 0.8 - 0.4,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 1.2 - 0.6,
                sway: Math.random() * 2 * Math.PI,
                swaySpeed: Math.random() * 0.03 + 0.015,
                swayAmp: Math.random() * 1.5 + 0.5,
                color: petalColors[Math.floor(Math.random() * petalColors.length)],
            });
        }

        // Ambient glowing light particles (fireflies / golden dust)
        const sparkles = [];
        for (let i = 0; i < 18; i++) {
            sparkles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.8 + 0.6,
                alpha: Math.random() * 0.7 + 0.3,
                pulse: Math.random() * 0.05 + 0.02,
                speedY: -(Math.random() * 0.6 + 0.2),
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw glowing golden bokeh dust particles
            for (let i = 0; i < sparkles.length; i++) {
                const s = sparkles[i];
                s.alpha += Math.sin(s.pulse) * 0.02;
                s.y += s.speedY;

                if (s.y < 0) {
                    s.y = height + 10;
                    s.x = Math.random() * width;
                }

                ctx.save();
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 215, 140, ${Math.max(0.15, Math.min(0.85, s.alpha))})`;
                ctx.shadowColor = 'rgba(255, 220, 150, 0.8)';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.restore();
            }

            // 2. Draw Falling Petals
            for (let i = 0; i < petals.length; i++) {
                const p = petals[i];
                p.y += p.speedY;
                p.sway += p.swaySpeed;
                p.x += Math.sin(p.sway) * p.swayAmp + p.speedX;
                p.rotation += p.rotationSpeed;

                // Reset when off-screen
                if (p.y > height + 20) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }
                if (p.x > width + 20) p.x = -20;
                if (p.x < -20) p.x = width + 20;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);

                // Draw organic petal curve
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 3, 0, p.size * 1.4);
                ctx.bezierCurveTo(-p.size, p.size / 3, -p.size / 2, -p.size / 2, 0, 0);
                ctx.fillStyle = p.color;
                ctx.shadowColor = 'rgba(255, 200, 210, 0.4)';
                ctx.shadowBlur = 4;
                ctx.fill();

                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10 w-full h-full"
            aria-hidden="true"
        />
    );
}
