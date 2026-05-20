import React from 'react';

export default function Resume({ handleCVDownload }) {
    return (
        <section id="resume">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Overview</span>
                    <h2 className="section-title">My Resume</h2>
                </div>
                
                <div className="resume-cta-container">
                    <button className="btn btn-primary" id="download-cv-btn" onClick={handleCVDownload}>
                        <i className="fa-solid fa-download"></i> View & Save Interactive Resume (PDF)
                    </button>
                </div>
            </div>
        </section>
    );
}
