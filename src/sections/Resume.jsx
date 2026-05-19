import React from 'react';

export default function Resume({ handleCVDownload }) {
    return (
        <section id="resume">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Chronology</span>
                    <h2 className="section-title">Education & Career</h2>
                </div>
                
                <div className="resume-wrapper">
                    {/* Experience */}
                    <div>
                        <h3 className="resume-column-title">
                            <i className="fa-solid fa-briefcase"></i> Experience
                        </h3>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-card glass-card">
                                    <span className="timeline-date">2024 - Present</span>
                                    <h4 className="timeline-title">Lead Interactive Developer</h4>
                                    <div className="timeline-org">StellarCraft Interactive Studios</div>
                                    <p className="timeline-desc">
                                        Architecting highly responsive, animation-heavy SaaS application portals. Oversaw the overhaul of design systems and dynamic canvas systems, leading to a 40% uptick in interface engagement metrics.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-card glass-card">
                                    <span className="timeline-date">2022 - 2024</span>
                                    <h4 className="timeline-title">UX Architect & Developer</h4>
                                    <div className="timeline-org">PixelPerfect Agency</div>
                                    <p className="timeline-desc">
                                        Built complex dashboard interfaces for data tracking. Coordinated directly with brand designers to synthesize clean CSS animations, frosted navigation layouts, and robust WebSockets backends.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Education */}
                    <div>
                        <h3 className="resume-column-title">
                            <i className="fa-solid fa-graduation-cap"></i> Education
                        </h3>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-card glass-card">
                                    <span className="timeline-date">2018 - 2022</span>
                                    <h4 className="timeline-title">B.Sc. in Computer Science & Digital Art</h4>
                                    <div className="timeline-org">Apex Technology University</div>
                                    <p className="timeline-desc">
                                        A specialized dual track merging algorithmic software architecture with advanced media typography, 3D computer graphics, layout grids, and interactive web canvases.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-card glass-card">
                                    <span className="timeline-date">2021</span>
                                    <h4 className="timeline-title">Certification in Advanced Visual Systems</h4>
                                    <div className="timeline-org">Zurich School of Typographic Design</div>
                                    <p className="timeline-desc">
                                        Intensive certification coursework focusing on geometric grid alignments, typography hierarchies, corporate branding guidelines, and poster arts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
