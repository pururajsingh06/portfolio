import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Projects({ activeCategory, setActiveCategory }) {
    const projects = [
        {
            category: 'web',
            img: 'assets/repoiq.png',
            tag: '',
            title: 'RepoIQ',
            desc: 'RepoIQ is an AI-powered GitHub repository analyzer that evaluates code quality, project structure, and documentation while providing intelligent insights and improvement suggestions.',
            tech: ['React', 'Node.js', 'Axios', 'Github REST API', 'Gemini API'],
            github: 'https://github.com/pururajsingh06/RepoIQ',
            demo: 'https://repoiq.onrender.com/'
        },
        {
            category: ['web', 'collaborative'],
            img: 'assets/codrift.png',
            tag: '',
            title: 'CoDrift',
            desc: 'CoDrift is a real-time collaborative coding platform where teams can work together on projects with live editing, synchronized cursors, multi-file workspaces, and integrated voice communication channels.',
            tech: ['React', 'Node.js', 'Monaco Editor', 'Socket.io', 'WebRTC', 'MongoDB', 'Nodemailer'],
            github: 'https://github.com/pururajsingh06/CoDrift',
            demo: 'https://co-drift.vercel.app/'
        },
        {
            category: 'ml',
            img: 'assets/sentiment.png',
            tag: '',
            title: 'Sentiment Analysis System',
            desc: 'Multilingual sentiment analysis app that classifies tweets and comments using NLP techniques, TF-IDF vectorization, and machine learning models for sentiment prediction.',
            tech: ['Python', 'NLTK', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
            github: 'https://github.com/pururajsingh06/SentimentAnalysis',
            demo: 'https://sentimentanalysis06.streamlit.app/'
        },
        {
            category: 'web',
            img: 'assets/careconnect.png',
            tag: '',
            title: 'CareConnect',
            desc: 'CareConnect is a web-based healthcare platform designed to streamline hospital operations through patient management, staff workflows, appointment scheduling, and secure data handling using a modern and scalable interface.',
            tech: ['React', 'Tailwind CSS', 'Node.js', 'MySQL'],
            github: 'https://github.com/pururajsingh06/Care-Connect',
            demo: 'https://careconnect-1v6s.vercel.app/'
        },
        {
            category: 'web',
            img: 'assets/agrovisor.png',
            tag: '',
            title: 'Agrovisor',
            desc: 'AgroAdvisor is a smart farming platform that provides weather insights, crop recommendations, soil analysis, and real-time agricultural guidance through a modern responsive web application.',
            tech: ['HTML', 'CSS', 'PHP', 'Weather API', 'Market prices API'],
            github: 'https://github.com/pururajsingh06/farmer-advisory-website',
            demo: 'https://farmeradvisor.netlify.app/'
        }
    ];

    return (
        <section id="projects">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <span className="section-subtitle">Portfolio</span>
                    <h2 className="section-title">Featured Creations</h2>
                </motion.div>

                <motion.div 
                    className="filter-tabs"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <button className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All Work</button>
                    <button className={`filter-btn ${activeCategory === 'web' ? 'active' : ''}`} onClick={() => setActiveCategory('web')}>Web Dev</button>
                    <button className={`filter-btn ${activeCategory === 'collaborative' ? 'active' : ''}`} onClick={() => setActiveCategory('collaborative')}>Collaborative</button>
                    <button className={`filter-btn ${activeCategory === 'ml' ? 'active' : ''}`} onClick={() => setActiveCategory('ml')}>Machine Learning</button>
                </motion.div>

                <div className="projects-grid" id="projects-grid">
                    {projects
                        .filter(proj => {
                            if (activeCategory === 'all') return true;
                            if (Array.isArray(proj.category)) {
                                return proj.category.includes(activeCategory);
                            }
                            return proj.category === activeCategory;
                        })
                        .map((proj, idx) => (
                            <motion.div 
                                className="project-card glass-card" 
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true, amount: 0.1 }}
                            >
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
                                        {proj.demo && (
                                            <a href={proj.demo} target={proj.demo === '#' ? '_self' : '_blank'} rel="noopener noreferrer" className="project-icon-link" aria-label="Live Demo Link">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="project-content">
                                    {proj.tag && <span className="project-tag">{proj.tag}</span>}
                                    <h3 className="project-title">{proj.title}</h3>
                                    <p className="project-desc">{proj.desc}</p>
                                    <div className="project-tech">
                                        {proj.tech.map((t, i) => (
                                            <span className="tech-badge" key={i}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </div>
        </section>
    );
}
