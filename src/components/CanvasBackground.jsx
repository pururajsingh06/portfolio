import React, { useEffect, useRef } from 'react';

export default function CanvasBackground({ theme }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        let width, height;
        let time = 0;
        let particles = [];
        
        const mouse = { x: null, y: null };

        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('resize', handleResize);
        
        function initParticles() {
            particles = [];
            const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 18000);
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 1.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: (Math.random() - 0.5) * 0.4,
                    opacity: Math.random() * 0.6 + 0.1
                });
            }
        }
        
        handleResize();

        function drawScene() {
            ctx.clearRect(0, 0, width, height);
            time += 0.0015;
            
            // Adjust base color based on theme
            const baseColor = theme === 'light' ? '0, 0, 0' : '255, 255, 255';
            
            // --- 1. Draw Flowing Topography Mesh ---
            const numLines = 35;
            const mouseEffectRadius = 250;
            
            for (let i = 0; i < numLines; i++) {
                ctx.beginPath();
                
                // Smooth opacity gradient for lines (fade at edges, opaque in center)
                const lineOpacity = 0.01 + Math.sin((i / (numLines - 1)) * Math.PI) * 0.045;
                ctx.strokeStyle = `rgba(${baseColor}, ${lineOpacity})`;
                ctx.lineWidth = 1;
                
                for (let x = -50; x <= width + 50; x += 30) {
                    // Spread lines vertically
                    let baseY = (height * 0.15) + (i * (height * 0.7 / numLines));
                    
                    // Complex wave pattern
                    let wave1 = Math.sin(x * 0.0015 + time + i * 0.04) * 80;
                    let wave2 = Math.cos(x * 0.0025 - time * 1.2 + i * 0.02) * 50;
                    let wave3 = Math.sin(x * 0.0008 + time * 0.8) * 120;
                    
                    let y = baseY + wave1 + wave2 + wave3;
                    
                    // Mouse distortion for lines
                    if (mouse.x !== null && mouse.y !== null) {
                        const dx = x - mouse.x;
                        const dy = y - mouse.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < mouseEffectRadius) {
                            const force = Math.pow((mouseEffectRadius - distance) / mouseEffectRadius, 2);
                            const pushDirection = dy > 0 ? 1 : -1;
                            y += pushDirection * force * 45;
                        }
                    }
                    
                    if (x === -50) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }
            
            // --- 2. Draw Floating Stardust Particles ---
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Wrap around edges
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
                
                // Mouse interaction for particles
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        const force = (120 - distance) / 120;
                        p.x += (dx / distance) * force * 1.5;
                        p.y += (dy / distance) * force * 1.5;
                    }
                }
                
                ctx.beginPath();
                ctx.fillStyle = `rgba(${baseColor}, ${p.opacity * 0.4})`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            animationFrameId = requestAnimationFrame(drawScene);
        }

        drawScene();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <>
            <canvas id="bg-canvas" ref={canvasRef}></canvas>
            <div className="glow-orb glow-orb-1"></div>
            <div className="glow-orb glow-orb-2"></div>
        </>
    );
}
