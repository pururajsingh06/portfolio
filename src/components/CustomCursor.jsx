import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        // Disable on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            return;
        }

        const dot = dotRef.current;
        const follower = followerRef.current;
        if (!dot || !follower) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        let isVisible = false;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isVisible) {
                dot.style.opacity = '1';
                follower.style.opacity = '1';
                isVisible = true;
            }
            
            // Instantly position the small dot
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        };

        const updateFollower = () => {
            // Smooth linear interpolation (lag effect)
            const speed = 0.15;
            followerX += (mouseX - followerX) * speed;
            followerY += (mouseY - followerY) * speed;
            
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            
            requestAnimationFrame(updateFollower);
        };

        window.addEventListener('mousemove', onMouseMove);
        const animFrame = requestAnimationFrame(updateFollower);

        // Hover triggers for all interactive items
        const onMouseOver = (e) => {
            const target = e.target;
            const isClickable = target.closest('a, button, [role="button"], .poster-card, .project-card, .theme-toggle, .filter-tab');
            if (isClickable) {
                dot.classList.add('hovered');
                follower.classList.add('hovered');
            } else {
                dot.classList.remove('hovered');
                follower.classList.remove('hovered');
            }
        };

        // Window entry/exit behavior
        const onMouseLeave = () => {
            dot.style.opacity = '0';
            follower.style.opacity = '0';
            isVisible = false;
        };

        const onMouseEnter = () => {
            dot.style.opacity = '1';
            follower.style.opacity = '1';
            isVisible = true;
        };

        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animFrame);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="custom-cursor" style={{ opacity: 0 }} />
            <div ref={followerRef} className="custom-cursor-follower" style={{ opacity: 0 }} />
        </>
    );
}
