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
                    <h2 className="section-title">Get To Know Me</h2>
                </div>
                
                <div className="about-grid">
                    <div className="about-text">
                        <p>
                            Hey, I’m Pururaj — a 3rd year B.Tech student passionate about building modern digital experiences through code and design. I enjoy developing full-stack web applications, experimenting with AI/ML systems, and creating real-time interactive platforms that solve meaningful problems.
                        </p>
                        <p>
                            I love working on projects that combine clean UI/UX with strong backend logic, whether it’s an AI-powered traffic simulator, a collaborative coding platform, or intelligent analytics dashboards. Along with development, I also enjoy designing interfaces in Figma and turning ideas into polished, user-friendly products.
                        </p>
                        <p>
                            My interests include web development, real-time systems, AI/ML, and product design. I’m always exploring new technologies, improving my skills, and building projects that challenge me creatively and technically.
                        </p>
                        <p>
                            When I’m not coding, you’ll probably find me listening to music, exploring tech trends, or working on new ideas and side projects.
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
                                <span className="skill-name">Full-Stack Web Development</span>
                            </div>
                            <div className="skill-desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                React, Node.js, Express, WebSockets, RESTful Routing
                            </div>
                            <div className="skill-track">
                                <div className="skill-progress" style={{ width: animateTriggered ? '95%' : '0%' }}></div>
                            </div>
                        </div>
                        
                        <div className="skill-bar-wrapper" style={{ marginTop: '1.5rem' }}>
                            <div className="skill-info">
                                <span className="skill-name">Machine Learning & AI</span>
                            </div>
                            <div className="skill-desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                Python, Data Science, Neural Networks, NLP, AI Modeling
                            </div>
                            <div className="skill-track">
                                <div className="skill-progress" style={{ width: animateTriggered ? '90%' : '0%' }}></div>
                            </div>
                        </div>
                        
                        <div className="skill-bar-wrapper" style={{ marginTop: '1.5rem' }}>
                            <div className="skill-info">
                                <span className="skill-name">UI/UX Design & Prototyping</span>
                            </div>
                            <div className="skill-desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                Figma, Design Systems, Vector Art, Digital Layouts
                            </div>
                            <div className="skill-track">
                                <div className="skill-progress" style={{ width: animateTriggered ? '92%' : '0%' }}></div>
                            </div>
                        </div>
                        
                        <div className="skill-bar-wrapper" style={{ marginTop: '1.5rem' }}>
                            <div className="skill-info">
                                <span className="skill-name">Databases & Cloud Operations</span>
                            </div>
                            <div className="skill-desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                MongoDB, PostgreSQL, SQL, Git & Version Control
                            </div>
                            <div className="skill-track">
                                <div className="skill-progress" style={{ width: animateTriggered ? '85%' : '0%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
