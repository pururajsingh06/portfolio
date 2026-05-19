import React, { useState, useEffect, useRef } from 'react';

export default function App() {
    /* ==========================================================================
       1. REACT STATE BINDINGS
       ========================================================================== */
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [activeCategory, setActiveCategory] = useState('all');
    const [lightbox, setLightbox] = useState({ active: false, src: '', title: '', desc: '', index: 0 });
    const [menuOpen, setMenuOpen] = useState(false);
    const [headerScrolled, setHeaderScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    
    // Form & Toast States
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({ name: false, email: false, subject: false, message: false });
    const [toastVisible, setToastVisible] = useState(false);
    
    // Scroll Animation States
    const [animateTriggered, setAnimateTriggered] = useState(false);
    const [stats, setStats] = useState({ projects: 0, years: 0 });

    // Refs for Interactive DOM nodes
    const canvasRef = useRef(null);
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const typewriterRef = useRef(null);
    const aboutSectionRef = useRef(null);
    
    // Mouse coords state
    const mouseCoordsRef = useRef({ x: 0, y: 0 });
    const followerCoordsRef = useRef({ x: 0, y: 0 });

    /* ==========================================================================
       2. GLOBAL THEME PERSISTENCE EFFECT
       ========================================================================== */
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };


    /* ==========================================================================
       3. CANVAS PARTICLE PHYSICS ENGINE
       ========================================================================== */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particlesArray = [];
        const numberOfParticles = 75;
        
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
                ctx.fillStyle = theme === 'light' ? 'rgba(147, 51, 234, 0.25)' : 'rgba(255, 255, 255, 0.2)';
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
            const lineColor = theme === 'light' ? 'rgba(147, 51, 234, 0.04)' : 'rgba(255, 255, 255, 0.03)';
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 110) {
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


    /* ==========================================================================
       4. ELASTIC MOUSE CURSOR & HOVER INTERPOLATION EFFECT
       ========================================================================== */
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

        // Mouse hover interactions triggers
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

        // Attach event delegator matching selectors
        const attachCursorEffects = () => {
            const interactives = document.querySelectorAll('a, button, .poster-card, .project-card, .form-control');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };
        
        // Timeout ensures dynamic content has fully loaded
        const timer = setTimeout(attachCursorEffects, 100);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timer);
        };
    }, [activeCategory]); // Re-attach when sorting filters re-renders cards


    /* ==========================================================================
       5. HERO SECTION TYPEWRITER CARET LOOP
       ========================================================================== */
    useEffect(() => {
        const typewriterEl = typewriterRef.current;
        if (!typewriterEl) return;

        const occupations = ["Full Stack Developer", "ML Enthusiast", "Creative Developer", "Problem Solver"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 120;
        let timerId;

        const loop = () => {
            const currentWord = occupations[wordIndex];
            
            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 120;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % occupations.length;
                typingSpeed = 500;
            }

            timerId = setTimeout(loop, typingSpeed);
        };

        timerId = setTimeout(loop, 1000);
        return () => clearTimeout(timerId);
    }, []);


    /* ==========================================================================
       6. SCROLL DETECTOR (HEADER AND SECTION HIGHLIGHTS)
       ========================================================================== */
    useEffect(() => {
        const handleScroll = () => {
            setHeaderScrolled(window.scrollY > 50);

            // Highlight Active Section
            const sections = document.querySelectorAll('section');
            let currentSec = 'home';
            
            sections.forEach(sec => {
                const secTop = sec.offsetTop;
                if (window.scrollY >= (secTop - 150)) {
                    currentSec = sec.getAttribute('id');
                }
            });
            setActiveSection(currentSec);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    /* ==========================================================================
       7. INTERSECTION OBSERVER FOR SKILLS & METRIC INCREMENTS
       ========================================================================== */
    useEffect(() => {
        const aboutSec = aboutSectionRef.current;
        if (!aboutSec) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animateTriggered) {
                    setAnimateTriggered(true);
                    
                    // Trigger Stats Increment Loop
                    const duration = 1500;
                    const steps = duration / 16;
                    
                    const targetProjects = 12;
                    const targetYears = 5;
                    
                    let curProjects = 0;
                    let curYears = 0;
                    
                    const projInc = Math.ceil(targetProjects / steps);
                    const yearInc = Math.ceil(targetYears / steps);
                    
                    const interval = setInterval(() => {
                        curProjects += projInc;
                        curYears += yearInc;
                        
                        let done = true;
                        
                        if (curProjects >= targetProjects) {
                            curProjects = targetProjects;
                        } else {
                            done = false;
                        }
                        
                        if (curYears >= targetYears) {
                            curYears = targetYears;
                        } else {
                            done = false;
                        }
                        
                        setStats({ projects: curProjects, years: curYears });
                        
                        if (done) clearInterval(interval);
                    }, 16);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(aboutSec);
        return () => observer.disconnect();
    }, [animateTriggered]);


    /* ==========================================================================
       8. LIGHTBOX KEYBOARD HANDLERS
       ========================================================================== */
    useEffect(() => {
        if (!lightbox.active) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleCloseLightbox();
            if (e.key === 'ArrowLeft') handlePrevPoster();
            if (e.key === 'ArrowRight') handleNextPoster();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightbox]);


    /* ==========================================================================
       9. REACTION EVENT HANDLERS
       ========================================================================== */
    
    // Poster Showcase Data
    const posters = [
        {
            src: 'assets/cyberpunk_poster.png',
            title: 'Cyberpunk Cityscape',
            desc: 'An exploration of glowing vector pathways, neon layouts, and futuristic branding graphics.'
        },
        {
            src: 'assets/swiss_poster.png',
            title: 'Modernist Swiss Grid',
            desc: 'A typographic visual layout based on pure asymmetric grid calculations and Helvetic contrast.'
        },
        {
            src: 'assets/abstract_poster.png',
            title: 'Liquid Chromatics',
            desc: 'A research piece detailing metallic gradient flows, vibrant refraction shaders, and holographic depths.'
        }
    ];

    // Projects Grid Data
    const projects = [
        {
            category: 'web',
            img: 'assets/cyberpunk_poster.png',
            tag: 'Web Dev / Websockets',
            title: 'CoDrift Collaborative IDE',
            desc: 'A production-grade real-time collaborative workspace supporting live cursor sharing, multi-file code executions, WebRTC audio chambers, and JWT authentications.',
            tech: ['NodeJS', 'WebSockets', 'YJS SharedDoc', 'Monaco IDE'],
            github: 'https://github.com/pururajsingh06',
            demo: '#'
        },
        {
            category: 'design',
            img: 'assets/abstract_poster.png',
            tag: 'UI/UX / Data Analysis',
            title: 'VibeScale Analytics UI',
            desc: 'A gorgeous, highly analytical HSL-driven dashboard for multilingual sentiment monitoring. Features interactive telemetry graphing and dark space components.',
            tech: ['React', 'ChartJS', 'Figma Prototyping', 'CSS Glows'],
            figma: 'https://figma.com',
            demo: '#'
        },
        {
            category: 'design',
            img: 'assets/swiss_poster.png',
            tag: 'UI/UX / Design System',
            title: 'Aetheria UI Token Set',
            desc: 'A unified design token catalog and component repository focused on advanced accessibility, micro-interactions, responsive grids, and global themes.',
            tech: ['CSS Variables', 'Storybook', 'A11y W3C', 'Vanilla JS'],
            github: 'https://github.com',
            demo: '#'
        }
    ];

    // Lightbox Controls
    const handleOpenLightbox = (index) => {
        const item = posters[index];
        setLightbox({ active: true, src: item.src, title: item.title, desc: item.desc, index });
        document.body.style.overflow = 'hidden';
    };

    const handleCloseLightbox = () => {
        setLightbox(prev => ({ ...prev, active: false }));
        document.body.style.overflow = 'auto';
    };

    const handlePrevPoster = () => {
        setLightbox(prev => {
            const newIndex = (prev.index - 1 + posters.length) % posters.length;
            const item = posters[newIndex];
            return { active: true, src: item.src, title: item.title, desc: item.desc, index: newIndex };
        });
    };

    const handleNextPoster = () => {
        setLightbox(prev => {
            const newIndex = (prev.index + 1) % posters.length;
            const item = posters[newIndex];
            return { active: true, src: item.src, title: item.title, desc: item.desc, index: newIndex };
        });
    };

    // Form Submissions
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
        // Clean error indicator on typing
        if (value.trim()) {
            setErrors(prev => ({ ...prev, [id]: false }));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        let isValid = true;
        const newErrors = { name: false, email: false, subject: false, message: false };

        if (!form.name.trim()) {
            newErrors.name = true;
            isValid = false;
        }
        
        if (!form.subject.trim()) {
            newErrors.subject = true;
            isValid = false;
        }

        if (!form.message.trim()) {
            newErrors.message = true;
            isValid = false;
        }

        // Email Validator
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim() || !emailPattern.test(form.email.trim())) {
            newErrors.email = true;
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setToastVisible(true);
            setForm({ name: '', email: '', subject: '', message: '' });
            
            setTimeout(() => {
                setToastVisible(false);
            }, 4500);
        }
    };

    // CV Download Trigger
    const handleCVDownload = () => {
        window.print();
    };

    return (
        <>
            {/* CANVAS BACKGROUND */}
            <canvas id="bg-canvas" ref={canvasRef}></canvas>
            <div className="glow-orb glow-orb-1"></div>
            <div className="glow-orb glow-orb-2"></div>

            {/* CUSTOM SCROLL CURSOR */}
            <div className="custom-cursor" ref={cursorRef}></div>
            <div className="custom-cursor-follower" ref={followerRef}></div>

            {/* NAVBAR HEADER */}
            <header id="header" className={headerScrolled ? 'scrolled' : ''}>
                <div className="container nav-container">
                    <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
                        CREATIVE<span className="logo-dot"></span>
                    </a>
                    
                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="nav-links">
                        <li>
                            <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</a>
                        </li>
                        <li>
                            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => setMenuOpen(false)}>About</a>
                        </li>
                        <li>
                            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Projects</a>
                        </li>
                        <li>
                            <a href="#artboard" className={activeSection === 'artboard' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Artboard</a>
                        </li>
                        <li>
                            <a href="#resume" className={activeSection === 'resume' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Resume</a>
                        </li>
                        <li>
                            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Contact</a>
                        </li>
                    </ul>
                    
                    <div className="nav-actions">
                        <button className="theme-toggle" id="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle dark/light theme">
                            <i className="fa-solid fa-moon" style={{ display: theme === 'dark' ? 'block' : 'none' }}></i>
                            <i className="fa-solid fa-sun" style={{ display: theme === 'light' ? 'block' : 'none' }}></i>
                        </button>
                        
                        <button className={`menu-btn ${menuOpen ? 'active' : ''}`} id="menu-btn" onClick={() => setMenuOpen(prev => !prev)} aria-label="Open navigation menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {/* HERO SECTION */}
                <section id="home" className="hero">
                    <div className="container hero-grid">
                        <div className="hero-text">
                            <div className="hero-subtitle">
                                <span className="hero-pulse"></span>
                                Available for Freelance & Contracts
                            </div>
                            <h1 className="hero-title">
                                Crafting <span className="gradient-text">Interfaces</span>,<br />
                                Designing <span className="gradient-text">Experiences</span>
                            </h1>
                            <p className="hero-description">
                                I am a <span ref={typewriterRef} className="gradient-text" style={{ fontWeight: 700 }}></span><span className="typewriter-cursor">|</span> who blends elegant technical code with visually breathtaking graphics. Let's build something exceptional.
                            </p>
                            <div className="hero-ctas">
                                <a href="#projects" className="btn btn-primary">View My Work <i className="fa-solid fa-arrow-right"></i></a>
                                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <div className="hero-blob-wrapper">
                                <div className="hero-blob"></div>
                                <div className="hero-img-card glass-card">
                                    <img src="assets/cyberpunk_poster.png" alt="Creative cyberpunk profile poster visual art" id="hero-interactive-img" />
                                </div>
                                <div className="hero-floating-badge glass-card">
                                    <div className="hero-badge-icon">
                                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                                    </div>
                                    <div className="hero-badge-text">
                                        <h4>100% Custom</h4>
                                        <p>No templates used</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT SECTION */}
                <section id="about" ref={aboutSectionRef}>
                    <div className="container">
                        <div className="section-header">
                            <span className="section-subtitle">About Me</span>
                            <h2 className="section-title">The Hybrid Approach</h2>
                        </div>
                        
                        <div className="about-grid">
                            <div className="about-text">
                                <h3>Fusing Code & Visual Design</h3>
                                <p>
                                    I don't believe in the separation of aesthetics and performance. A gorgeous user interface is only as good as the software driving it under the hood. As a developer with a deep background in visual arts, I construct web architectures that are lightning-fast, structurally accessible, and visually stunning.
                                </p>
                                <p>
                                    Whether building real-time collaborative development boards or styling high-fidelity graphics, Swiss-grid print layouts, and digital poster designs, I approach every project with rigorous attention to detail, polished micro-interactions, and scalable design tokens.
                                </p>
                                
                                <div className="about-stats">
                                    <div className="stat-item glass-card">
                                        <span className="stat-num">{stats.projects}+</span>
                                        <span className="stat-label">Projects Completed</span>
                                    </div>
                                    <div className="stat-item glass-card">
                                        <span className="stat-num">{stats.years}+</span>
                                        <span className="stat-label">Years of Craft</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="skills-container glass-card" style={{ padding: '2.5rem' }}>
                                <h3 style={{ marginBottom: '2rem' }}>Technical Toolkit</h3>
                                
                                <div className="skill-bar-wrapper">
                                    <div className="skill-info">
                                        <span className="skill-name">Frontend Architecture (JS/React/CSS3)</span>
                                        <span className="skill-pct">95%</span>
                                    </div>
                                    <div className="skill-track">
                                        <div className="skill-progress" style={{ width: animateTriggered ? '95%' : '0%' }}></div>
                                    </div>
                                </div>
                                
                                <div className="skill-bar-wrapper" style={{ marginTop: '1.5rem' }}>
                                    <div className="skill-info">
                                        <span className="skill-name">Interface & Graphic Design (UI/UX)</span>
                                        <span className="skill-pct">90%</span>
                                    </div>
                                    <div className="skill-track">
                                        <div className="skill-progress" style={{ width: animateTriggered ? '90%' : '0%' }}></div>
                                    </div>
                                </div>
                                
                                <div className="skill-bar-wrapper" style={{ marginTop: '1.5rem' }}>
                                    <div className="skill-info">
                                        <span className="skill-name">Backend Logic & Real-time WebSockets</span>
                                        <span className="skill-pct">85%</span>
                                    </div>
                                    <div className="skill-track">
                                        <div className="skill-progress" style={{ width: animateTriggered ? '85%' : '0%' }}></div>
                                    </div>
                                </div>
                                
                                <div className="skill-bar-wrapper" style={{ marginTop: '1.5rem' }}>
                                    <div className="skill-info">
                                        <span className="skill-name">Posters & Vector Typography</span>
                                        <span className="skill-pct">92%</span>
                                    </div>
                                    <div className="skill-track">
                                        <div className="skill-progress" style={{ width: animateTriggered ? '92%' : '0%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section id="projects">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-subtitle">Portfolio</span>
                            <h2 className="section-title">Featured Creations</h2>
                        </div>
                        
                        <div className="filter-tabs">
                            <button className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All Work</button>
                            <button className={`filter-btn ${activeCategory === 'web' ? 'active' : ''}`} onClick={() => setActiveCategory('web')}>Web Dev</button>
                            <button className={`filter-btn ${activeCategory === 'design' ? 'active' : ''}`} onClick={() => setActiveCategory('design')}>UI/UX Design</button>
                        </div>
                        
                        <div className="projects-grid" id="projects-grid">
                            {projects
                                .filter(proj => activeCategory === 'all' || proj.category === activeCategory)
                                .map((proj, idx) => (
                                    <div className="project-card glass-card" key={idx}>
                                        <div className="project-img-wrapper">
                                            <img src={proj.img} alt={`${proj.title} Showcase Visual`} />
                                            <div className="project-overlay">
                                                {proj.github && (
                                                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-icon-link" aria-label="GitHub Repository">
                                                        <i className="fa-brands fa-github"></i>
                                                    </a>
                                                )}
                                                {proj.figma && (
                                                    <a href={proj.figma} target="_blank" rel="noopener noreferrer" className="project-icon-link" aria-label="Figma Design File">
                                                        <i className="fa-brands fa-figma"></i>
                                                    </a>
                                                )}
                                                <a href={proj.demo} className="project-icon-link" aria-label="Live Demo Link">
                                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="project-content">
                                            <span className="project-tag">{proj.tag}</span>
                                            <h3 className="project-title">{proj.title}</h3>
                                            <p className="project-desc">{proj.desc}</p>
                                            <div className="project-tech">
                                                {proj.tech.map((t, i) => (
                                                    <span className="tech-badge" key={i}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>

                {/* POSTERS SHOWCASE ARTBOARD */}
                <section id="artboard" style={{ background: 'var(--bg-secondary)', transition: 'background-color 0.5s ease' }}>
                    <div className="container">
                        <div className="section-header">
                            <span className="section-subtitle">Visual Showcase</span>
                            <h2 className="section-title">Poster & Graphic Art</h2>
                        </div>
                        
                        <div className="posters-container">
                            <div className="posters-grid">
                                {posters.map((poster, idx) => (
                                    <div className="poster-card glass-card" key={idx} onClick={() => handleOpenLightbox(idx)}>
                                        <div className="poster-img-wrapper">
                                            <img src={poster.src} alt={`${poster.title} Poster`} />
                                        </div>
                                        <div className="poster-info-overlay">
                                            <span className="poster-tag">Creative Graphic Art</span>
                                            <h3 className="poster-title">{poster.title}</h3>
                                            <span className="poster-view-btn">View Large Scale <i className="fa-solid fa-expand"></i></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* LIGHTBOX MODAL */}
                <div className={`lightbox ${lightbox.active ? 'active' : ''}`} id="lightbox" onClick={(e) => e.target.id === 'lightbox' && handleCloseLightbox()}>
                    <button className="lightbox-close" onClick={handleCloseLightbox} aria-label="Close image viewer">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    
                    <button className="lightbox-nav lightbox-prev" onClick={handlePrevPoster} aria-label="Previous poster">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    
                    <div className="lightbox-content-wrapper">
                        <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" id="lightbox-img" />
                        <div className="lightbox-caption">
                            <h3 className="lightbox-title">{lightbox.title}</h3>
                            <p className="lightbox-subtitle">{lightbox.desc}</p>
                        </div>
                    </div>
                    
                    <button className="lightbox-nav lightbox-next" onClick={handleNextPoster} aria-label="Next poster">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>

                {/* RESUME TIMELINE SECTION */}
                <section id="resume">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-subtitle">Chronology</span>
                            <h2 className="section-title">Education & Career</h2>
                        </div>
                        
                        <div className="resume-wrapper">
                            {/* Experience */}
                            <div>
                                <h3 className="resume-column-title">
                                    <i className="fa-solid fa-briefcase"></i> Experience
                                </h3>
                                <div className="timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-card glass-card">
                                            <span className="timeline-date">2024 - Present</span>
                                            <h4 className="timeline-title">Lead Interactive Developer</h4>
                                            <div className="timeline-org">StellarCraft Interactive Studios</div>
                                            <p className="timeline-desc">
                                                Architecting highly responsive, animation-heavy SaaS application portals. Oversaw the overhaul of design systems and dynamic canvas systems, leading to a 40% uptick in interface engagement metrics.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-card glass-card">
                                            <span className="timeline-date">2022 - 2024</span>
                                            <h4 className="timeline-title">UX Architect & Developer</h4>
                                            <div className="timeline-org">PixelPerfect Agency</div>
                                            <p className="timeline-desc">
                                                Built complex dashboard interfaces for data tracking. Coordinated directly with brand designers to synthesize clean CSS animations, frosted navigation layouts, and robust WebSockets backends.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Education */}
                            <div>
                                <h3 className="resume-column-title">
                                    <i className="fa-solid fa-graduation-cap"></i> Education
                                </h3>
                                <div className="timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-card glass-card">
                                            <span className="timeline-date">2018 - 2022</span>
                                            <h4 className="timeline-title">B.Sc. in Computer Science & Digital Art</h4>
                                            <div className="timeline-org">Apex Technology University</div>
                                            <p className="timeline-desc">
                                                A specialized dual track merging algorithmic software architecture with advanced media typography, 3D computer graphics, layout grids, and interactive web canvases.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-card glass-card">
                                            <span className="timeline-date">2021</span>
                                            <h4 className="timeline-title">Certification in Advanced Visual Systems</h4>
                                            <div className="timeline-org">Zurich School of Typographic Design</div>
                                            <p className="timeline-desc">
                                                Intensive certification coursework focusing on geometric grid alignments, typography hierarchies, corporate branding guidelines, and poster arts.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="resume-cta-container">
                            <button className="btn btn-primary" id="download-cv-btn" onClick={handleCVDownload}>
                                <i className="fa-solid fa-download"></i> View & Save Interactive Resume (PDF)
                            </button>
                        </div>
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section id="contact" style={{ background: 'var(--bg-secondary)', transition: 'background-color 0.5s ease' }}>
                    <div className="container">
                        <div className="section-header">
                            <span className="section-subtitle">Get In Touch</span>
                            <h2 className="section-title">Initiate a Collaboration</h2>
                        </div>
                        
                        <div className="contact-grid">
                            <div className="contact-info">
                                <div className="contact-info-card glass-card">
                                    <h3>Contact Info</h3>
                                    
                                    <div className="contact-item" style={{ marginTop: '1rem' }}>
                                        <div className="contact-icon">
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <div className="contact-details">
                                            <h4>Email Address</h4>
                                            <p>pururajsingh76@gmail.com</p>
                                        </div>
                                    </div>
                                    
                                    <div className="contact-item">
                                        <div className="contact-icon">
                                            <i className="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div className="contact-details">
                                            <h4>Current Base</h4>
                                            <p>San Francisco, CA (Remote Friendly)</p>
                                        </div>
                                    </div>
                                    
                                    <div className="contact-item">
                                        <div className="contact-icon">
                                            <i className="fa-solid fa-phone"></i>
                                        </div>
                                        <div className="contact-details">
                                            <h4>Telegram / Tel</h4>
                                            <p>+1 (555) 728-1090</p>
                                        </div>
                                    </div>
                                    
                                    <div className="social-links">
                                        <a href="https://github.com/pururajsingh06" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub Profile">
                                            <i className="fa-brands fa-github"></i>
                                        </a>
                                        <a href="https://www.linkedin.com/in/pururaj-singh-9b91a22bb/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn Profile">
                                            <i className="fa-brands fa-linkedin-in"></i>
                                        </a>
                                        <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Dribbble Designs">
                                            <i className="fa-brands fa-dribbble"></i>
                                        </a>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter Profile">
                                            <i className="fa-brands fa-twitter"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="contact-form-card glass-card">
                                <h3 className="form-title">Send a Direct Message</h3>
                                <form id="contact-form" onSubmit={handleFormSubmit} noValidate>
                                    
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            id="name" 
                                            value={form.name} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                            placeholder=" " 
                                            style={{ borderBottomColor: errors.name ? 'var(--accent-secondary)' : '' }}
                                            required 
                                        />
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                    </div>
                                    
                                    <div className="form-group">
                                        <input 
                                            type="email" 
                                            id="email" 
                                            value={form.email} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                            placeholder=" " 
                                            style={{ borderBottomColor: errors.email ? 'var(--accent-secondary)' : '' }}
                                            required 
                                        />
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                    </div>
                                    
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            id="subject" 
                                            value={form.subject} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                            placeholder=" " 
                                            style={{ borderBottomColor: errors.subject ? 'var(--accent-secondary)' : '' }}
                                            required 
                                        />
                                        <label htmlFor="subject" className="form-label">Subject</label>
                                    </div>
                                    
                                    <div className="form-group">
                                        <textarea 
                                            id="message" 
                                            value={form.message} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                            placeholder=" " 
                                            style={{ borderBottomColor: errors.message ? 'var(--accent-secondary)' : '' }}
                                            required
                                        ></textarea>
                                        <label htmlFor="message" className="form-label">Tell me about your project...</label>
                                    </div>
                                    
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                        Dispatch Message <i className="fa-solid fa-paper-plane" style={{ marginLeft: '0.5rem' }}></i>
                                    </button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* TOAST SUCCESS CONTAINER */}
            <div className="toast-container" id="toast-container">
                <div className={`toast ${toastVisible ? 'show' : ''}`} id="success-toast">
                    <div className="toast-icon">
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <div className="toast-content">
                        <h4>Message Dispatched!</h4>
                        <p>Thank you. I will reply within 12 hours.</p>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer>
                <div className="container">
                    <div className="logo footer-logo" style={{ justifyContent: 'center' }}>
                        CREATIVE<span className="logo-dot"></span>
                    </div>
                    <p className="footer-text">
                        &copy; 2026 Creative Portfolio. Created using premium glassmorphism aesthetics. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}
