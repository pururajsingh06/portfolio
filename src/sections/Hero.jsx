import React, { useEffect, useRef } from 'react';

export default function Hero() {
    const typewriterRef = useRef(null);

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

    return (
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
    );
}
