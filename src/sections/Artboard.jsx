import React, { useState, useEffect } from 'react';

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
                <div className="section-header">
                    <span className="section-subtitle">Visual Showcase</span>
                    <h2 className="section-title">Poster & Graphic Art</h2>
                </div>

                <div className="posters-container">
                    <div className="posters-grid">
                        {posters.map((poster, idx) => (
                            <div
                                className={`poster-card glass-card${poster.type === 'pdf' ? ' poster-card--pdf' : ''}`}
                                key={idx}
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
                                            <div className="poster-pdf-placeholder">
                                                <div className="pdf-icon-wrapper">
                                                    <i className="fa-solid fa-file-pdf"></i>
                                                </div>
                                                <span className="pdf-placeholder-tag">Odyssey Magazine</span>
                                                <span className="pdf-placeholder-text">Tap to Read PDF</span>
                                            </div>
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
                                        View Large Scale <i className="fa-solid fa-expand"></i>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
