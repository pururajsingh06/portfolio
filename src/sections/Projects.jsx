import React from 'react';

export default function Projects({ activeCategory, setActiveCategory }) {
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
            github: 'https://github.com/pururajsingh06',
            demo: '#'
        }
    ];

    return (
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
    );
}
