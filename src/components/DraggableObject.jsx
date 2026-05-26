import React, { useRef, useEffect } from 'react';

export default function DraggableObject({ theme }) {
    const widgetRef = useRef(null);
    const canvasRef = useRef(null);
    
    // Physics State
    const pos = useRef({ x: 50, y: 150 }); // Initial position
    const vel = useRef({ x: 2, y: 0 });
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const mouseHistory = useRef([]);
    
    // 3D Cube Rotation State
    const rotation = useRef({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        // Initial positioning (e.g. middle left)
        pos.current.y = window.innerHeight / 2 - 50;
        
        let animationId;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const widget = widgetRef.current;
        if (!canvas || !ctx || !widget) return;

        // Support high-DPI (Retina) displays for crisp edges
        const dpr = window.devicePixelRatio || 1;
        canvas.width = 150 * dpr;
        canvas.height = 150 * dpr;
        ctx.scale(dpr, dpr);

        // Cube vertices
        const nodes = [
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1],
            [1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1]
        ];
        
        const edges = [
            [0, 1], [1, 3], [3, 2], [2, 0], // back face
            [4, 5], [5, 7], [7, 6], [6, 4], // front face
            [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
        ];

        const updatePhysics = () => {
            if (!isDragging.current) {
                // Apply gravity
                vel.current.y += 0.8; 
                
                // Air friction
                vel.current.x *= 0.995; 
                vel.current.y *= 0.995;
                
                pos.current.x += vel.current.x;
                pos.current.y += vel.current.y;
                
                // Bounds collision
                const size = 150; // widget size
                const maxX = window.innerWidth - size;
                const maxY = window.innerHeight - size;
                const bounce = -0.65;
                
                if (pos.current.y >= maxY) { 
                    pos.current.y = maxY; 
                    vel.current.y *= bounce; 
                    vel.current.x *= 0.92; // ground friction
                    
                    // Stop micro-bouncing
                    if (Math.abs(vel.current.y) < 2) vel.current.y = 0;
                }
                if (pos.current.y <= 0) { pos.current.y = 0; vel.current.y *= bounce; }
                
                if (pos.current.x >= maxX) { pos.current.x = maxX; vel.current.x *= bounce; }
                if (pos.current.x <= 0) { pos.current.x = 0; vel.current.x *= bounce; }
                
                // Rotation spins based on velocity
                rotation.current.y += vel.current.x * 0.01 + 0.01;
                rotation.current.x += vel.current.y * 0.01 + 0.01;
            } else {
                // Manual spin while dragging
                rotation.current.y += 0.02;
                rotation.current.x += 0.02;
            }
            
            widget.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        };

        const renderCube = () => {
            ctx.clearRect(0, 0, 150, 150);
            
            const color = theme === 'light' ? '#111' : '#F5F5F5';
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            const cx = 150 / 2;
            const cy = 150 / 2;
            const scale = 45; // size of cube
            
            // Rotation math
            const sinX = Math.sin(rotation.current.x);
            const cosX = Math.cos(rotation.current.x);
            const sinY = Math.sin(rotation.current.y);
            const cosY = Math.cos(rotation.current.y);
            const sinZ = Math.sin(rotation.current.z);
            const cosZ = Math.cos(rotation.current.z);
            
            const projectedNodes = nodes.map(node => {
                let x = node[0];
                let y = node[1];
                let z = node[2];
                
                // Rotate X
                let y1 = y * cosX - z * sinX;
                let z1 = y * sinX + z * cosX;
                y = y1; z = z1;
                
                // Rotate Y
                let x1 = x * cosY + z * sinY;
                let z2 = -x * sinY + z * cosY;
                x = x1; z = z2;
                
                // Projection
                const zOffset = 3; 
                const p = 1 / (z + zOffset);
                return [x * p * scale + cx, y * p * scale + cy];
            });
            
            ctx.beginPath();
            edges.forEach(edge => {
                const p1 = projectedNodes[edge[0]];
                const p2 = projectedNodes[edge[1]];
                ctx.moveTo(p1[0], p1[1]);
                ctx.lineTo(p2[0], p2[1]);
            });
            ctx.stroke();
        };

        const loop = () => {
            updatePhysics();
            renderCube();
            animationId = requestAnimationFrame(loop);
        };
        loop();

        // Smooth scroll inertia logic
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const deltaY = currentScrollY - lastScrollY;
            
            // Ignore huge instantaneous jumps (like page load or programmatic scroll)
            if (!isDragging.current && Math.abs(deltaY) < 200) {
                // Cap the inertia force so fast trackpad swipes don't break physics
                const force = Math.max(-15, Math.min(15, deltaY * 0.08));
                
                // Apply ONLY to velocity, never directly to position to prevent teleportation/jitter
                vel.current.y -= force;
                
                // Add a smooth, subtle spin based on the scroll force
                rotation.current.x -= force * 0.015;
            }
            
            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [theme]);

    const handleDragStart = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        isDragging.current = true;
        dragOffset.current = {
            x: clientX - pos.current.x,
            y: clientY - pos.current.y
        };
        mouseHistory.current = [{ x: clientX, y: clientY, time: Date.now() }];
        vel.current.x = 0;
        vel.current.y = 0;
        
        if (!e.touches) {
            e.preventDefault(); // Prevent default to avoid text selection on desktop
        }
        
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchmove', handleDragMove, { passive: false });
        document.addEventListener('touchend', handleDragEnd);
    };

    const handleDragMove = (e) => {
        if (!isDragging.current) return;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        pos.current.x = clientX - dragOffset.current.x;
        pos.current.y = clientY - dragOffset.current.y;
        
        const now = Date.now();
        mouseHistory.current.push({ x: clientX, y: clientY, time: now });
        
        // Keep only history from the last 100ms for smooth velocity calculation
        mouseHistory.current = mouseHistory.current.filter(p => now - p.time < 100);

        if (e.touches) {
            e.preventDefault(); // Prevent scrolling the page while dragging the cube on mobile
        }
    };

    const handleDragEnd = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleDragMove);
        document.removeEventListener('touchend', handleDragEnd);
        
        // Calculate release velocity based on movement over the last 100ms
        const now = Date.now();
        const validHistory = mouseHistory.current.filter(p => now - p.time < 100);
        
        if (validHistory.length > 1) {
            const oldest = validHistory[0];
            const newest = validHistory[validHistory.length - 1];
            const dt = newest.time - oldest.time;
            
            if (dt > 0) {
                // Tuning factor 16 works well to convert ms time delta to frame velocity
                vel.current.x = ((newest.x - oldest.x) / dt) * 16; 
                vel.current.y = ((newest.y - oldest.y) / dt) * 16;
            }
        }
        
        mouseHistory.current = [];
    };

    return (
        <div 
            ref={widgetRef}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{ 
                position: 'fixed', 
                top: 0, left: 0, 
                width: '150px', height: '150px',
                cursor: isDragging.current ? 'grabbing' : 'grab',
                zIndex: 9999,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                touchAction: 'none' // Ensures browser doesn't intercept touch gestures
            }}
            title="Drag and throw me!"
        >
            <canvas ref={canvasRef} style={{ width: '150px', height: '150px', pointerEvents: 'none' }}></canvas>
        </div>
    );
}
