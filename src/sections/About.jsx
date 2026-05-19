import React, { useState, useEffect, useRef } from 'react';

export default function About() {
    const aboutSectionRef = useRef(null);
    const [animateTriggered, setAnimateTriggered] = useState(false);
    const [stats, setStats] = useState({ projects: 0, years: 0 });

    useEffect(() => {
        const aboutSec = aboutSectionRef.current;
        if (!aboutSec) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animateTriggered) {
                    setAnimateTriggered(true);
                    
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

    return (
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
    );
}
