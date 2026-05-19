import React, { useEffect, useRef } from 'react';

export default function CustomCursor({ activeCategory }) {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const mouseCoordsRef = useRef({ x: 0, y: 0 });
    const followerCoordsRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let animationFrameId;

        const handleMouseMove = (e) => {
            mouseCoordsRef.current.x = e.clientX;
            mouseCoordsRef.current.y = e.clientY;
            
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animateFollower = () => {
            const lerpFactor = 0.12;
            const targetX = mouseCoordsRef.current.x;
            const targetY = mouseCoordsRef.current.y;
            
            followerCoordsRef.current.x += (targetX - followerCoordsRef.current.x) * lerpFactor;
            followerCoordsRef.current.y += (targetY - followerCoordsRef.current.y) * lerpFactor;
            
            follower.style.left = followerCoordsRef.current.x + 'px';
            follower.style.top = followerCoordsRef.current.y + 'px';
            
            animationFrameId = requestAnimationFrame(animateFollower);
        };
        animateFollower();

        const handleMouseEnter = () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.backgroundColor = 'var(--accent-secondary)';
            follower.style.width = '55px';
            follower.style.height = '55px';
            follower.style.borderColor = 'var(--accent-secondary)';
        };

        const handleMouseLeave = () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--text-primary)';
            follower.style.width = '32px';
            follower.style.height = '32px';
            follower.style.borderColor = 'var(--accent-primary)';
        };

        const attachCursorEffects = () => {
            const interactives = document.querySelectorAll('a, button, .poster-card, .project-card, .form-control');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };
        
        const timer = setTimeout(attachCursorEffects, 100);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timer);
        };
    }, [activeCategory]);

    return (
        <>
            <div className="custom-cursor" ref={cursorRef}></div>
            <div className="custom-cursor-follower" ref={followerRef}></div>
        </>
    );
}
