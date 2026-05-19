import React from 'react';

export default function Artboard({ handleOpenLightbox }) {
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

    return (
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
    );
}
