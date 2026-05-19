import React from 'react';

export default function Lightbox({ lightbox, handleCloseLightbox, handlePrevPoster, handleNextPoster }) {
    if (!lightbox.active) return null;

    return (
        <div 
            className="lightbox active" 
            id="lightbox" 
            onClick={(e) => e.target.id === 'lightbox' && handleCloseLightbox()}
        >
            <button className="lightbox-close" onClick={handleCloseLightbox} aria-label="Close image viewer">
                <i className="fa-solid fa-xmark"></i>
            </button>
            
            <button className="lightbox-nav lightbox-prev" onClick={handlePrevPoster} aria-label="Previous poster">
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            
            <div className="lightbox-content-wrapper">
                <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" id="lightbox-img" />
                <div className="lightbox-caption">
                    <h3 className="lightbox-title">{lightbox.title}</h3>
                    <p className="lightbox-subtitle">{lightbox.desc}</p>
                </div>
            </div>
            
            <button className="lightbox-nav lightbox-next" onClick={handleNextPoster} aria-label="Next poster">
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}
