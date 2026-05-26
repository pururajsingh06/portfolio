import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize } from 'lucide-react';

export default function Artboard({ posters, handleOpenLightbox }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="artboard">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <span className="section-subtitle">Visual Showcase</span>
                    <h2 className="section-title">Poster & Graphic Art</h2>
                </motion.div>

                <div className="posters-container">
                    <div className="posters-grid">
                        {posters.map((poster, idx) => (
                            <motion.div
                                className={`poster-card glass-card${poster.type === 'pdf' ? ' poster-card--pdf' : ''}`}
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true, amount: 0.1 }}
                                onClick={(e) => {
                                    if (isMobile && poster.type === 'pdf') {
                                        window.open(poster.src, '_blank');
                                        return;
                                    }
                                    if (poster.type === 'pdf') {
                                        const isOverlayClick = e.target.closest('.poster-info-overlay');
                                        if (!isOverlayClick) return;
                                    }
                                    handleOpenLightbox(idx);
                                }}
                            >
                                <div className="poster-img-wrapper">
                                    {poster.type === 'pdf' ? (
                                        isMobile ? (
                                            <img src={poster.cover} alt={`${poster.title} Cover`} />
                                        ) : (
                                            <iframe
                                                src={`${poster.src}#toolbar=0&navpanes=0&scrollbar=1`}
                                                title={poster.title}
                                                className="poster-pdf-iframe"
                                                scrolling="yes"
                                            />
                                        )
                                    ) : (
                                        <img src={poster.src} alt={`${poster.title} Poster`} />
                                    )}
                                </div>
                                <div className="poster-info-overlay">
                                    <span className="poster-tag">
                                        {poster.type === 'pdf' ? 'College Department Magazine' : 'Creative Graphic Art'}
                                    </span>
                                    <h3 className="poster-title">{poster.title}</h3>
                                    <span className="poster-view-btn">
                                        View Large Scale <Maximize size={16} style={{ marginLeft: '4px' }} />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
