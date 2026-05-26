import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function Lightbox({ lightbox, handleCloseLightbox, handlePrevPoster, handleNextPoster }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!lightbox.active) return null;

    return (
        <div 
            className="lightbox active" 
            id="lightbox" 
            onClick={(e) => e.target.id === 'lightbox' && handleCloseLightbox()}
        >
            <button className="lightbox-close" onClick={handleCloseLightbox} aria-label="Close image viewer">
                <X size={24} />
            </button>
            
            <button className="lightbox-nav lightbox-prev" onClick={handlePrevPoster} aria-label="Previous poster">
                <ChevronLeft size={24} />
            </button>
            
            <div className="lightbox-content-wrapper">
                {lightbox.type === 'pdf' ? (
                    isMobile && lightbox.cover ? (
                        <div className="lightbox-mobile-pdf-cover" onClick={() => window.open(lightbox.src, '_blank')} style={{ cursor: 'pointer', position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={lightbox.cover} alt={lightbox.title} className="lightbox-img" id="lightbox-img" />
                            <div className="lightbox-tap-overlay" style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'rgba(0,0,0,0.7)',
                                color: 'white',
                                padding: '1rem 2rem',
                                borderRadius: '8px',
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backdropFilter: 'blur(4px)'
                            }}>
                                <ExternalLink size={20} /> Tap to read PDF
                            </div>
                        </div>
                    ) : (
                        <iframe 
                            src={`${lightbox.src}#toolbar=0&navpanes=0&scrollbar=1`} 
                            title={lightbox.title} 
                            className="lightbox-pdf" 
                        />
                    )
                ) : (
                    <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" id="lightbox-img" />
                )}
                <div className="lightbox-caption">
                    <h3 className="lightbox-title">{lightbox.title}</h3>
                    <p className="lightbox-subtitle">{lightbox.desc}</p>
                </div>
            </div>
            
            <button className="lightbox-nav lightbox-next" onClick={handleNextPoster} aria-label="Next poster">
                <ChevronRight size={24} />
            </button>
        </div>
    );
}
