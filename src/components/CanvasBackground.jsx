import React, { useEffect, useRef } from 'react';

export default function CanvasBackground({ theme }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particlesArray = [];
        const numberOfParticles = 90;
        
        const mouse = {
            x: null,
            y: null,
            radius: 120
        };

        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('resize', handleResize);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.density = (Math.random() * 30) + 1;
            }
            
            draw() {
                ctx.fillStyle = theme === 'light' ? 'rgba(147, 51, 234, 0.6)' : 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            
            update() {
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        let forceDirectionX = dx / distance;
                        let forceDirectionY = dy / distance;
                        let maxDistance = mouse.radius;
                        let force = (maxDistance - distance) / maxDistance;
                        let directionX = forceDirectionX * force * this.density * 0.6;
                        let directionY = forceDirectionY * force * this.density * 0.6;
                        
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        this.x += this.speedX;
                        this.y += this.speedY;
                    }
                } else {
                    this.x += this.speedX;
                    this.y += this.speedY;
                }
                
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function connectParticles() {
            const lineColor = theme === 'light' ? 'rgba(147, 51, 234, 0.15)' : 'rgba(255, 255, 255, 0.1)';
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 130) {
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connectParticles();
            animationFrameId = requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

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
