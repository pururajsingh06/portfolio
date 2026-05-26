import React from 'react';
import { motion } from 'framer-motion';

const skillsData = {
    Frontend: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
    Backend: ['Node.js', 'Python', 'Java', 'C++', 'MySQL', 'MongoDB', 'Socket.IO', 'JWT'],
    'AI & ML': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Pandas', 'NumPy', 'Matplotlib'],
    Tools: ['Git', 'GitHub', 'Figma', 'Canva', 'Streamlit']
};

export default function Skills() {
    return (
        <section id="skills">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <span className="section-subtitle">Expertise</span>
                    <h2 className="section-title">Technical Skills</h2>
                </motion.div>

                <div className="skills-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {Object.entries(skillsData).map(([category, skills], idx) => (
                        <motion.div 
                            key={category} 
                            className="glass-card" 
                            style={{ padding: '2rem' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{category}</h3>
                            <div className="about-skills-tags" style={{ justifyContent: 'flex-start' }}>
                                {skills.map((skill, sIdx) => (
                                    <span className="skill-tag" key={sIdx}>{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
