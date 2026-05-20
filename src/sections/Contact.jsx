import React from 'react';

export default function Contact({ form, errors, handleInputChange, handleFormSubmit, submitStatus }) {
    return (
        <section id="contact">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Get In Touch</span>
                    <h2 className="section-title">Initiate a Collaboration</h2>
                </div>

                <div className="contact-grid">
                    <div className="contact-info">
                        <div className="contact-info-card glass-card">
                            <h3>Contact Info</h3>

                            <div className="contact-item" style={{ marginTop: '1rem' }}>
                                <a href="mailto:pururajsingh76@gmail.com" className="contact-icon" aria-label="Email Address">
                                    <i className="fa-solid fa-envelope"></i>
                                </a>
                                <div className="contact-details">
                                    <h4>Email Address</h4>
                                    <a href="mailto:pururajsingh76@gmail.com">pururajsingh76@gmail.com</a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <a href="https://github.com/pururajsingh06" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="GitHub Profile">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                                <div className="contact-details">
                                    <h4>GitHub Profile</h4>
                                    <a href="https://github.com/pururajsingh06" target="_blank" rel="noopener noreferrer">github.com/pururajsingh06</a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <a href="https://www.linkedin.com/in/pururaj-singh-9b91a22bb/" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="LinkedIn Profile">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                                <div className="contact-details">
                                    <h4>LinkedIn Profile</h4>
                                    <a href="https://www.linkedin.com/in/pururaj-singh-9b91a22bb/" target="_blank" rel="noopener noreferrer">linkedin.com/in/pururaj-singh</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-card glass-card">
                        <h3 className="form-title">Send a Direct Message</h3>
                        <form id="contact-form" onSubmit={handleFormSubmit} noValidate>

                            <div className="form-group">
                                <input
                                    type="text"
                                    id="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder=" "
                                    style={{ borderBottomColor: errors.name ? 'var(--accent-secondary)' : '' }}
                                    required
                                />
                                <label htmlFor="name" className="form-label">Full Name</label>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder=" "
                                    style={{ borderBottomColor: errors.email ? 'var(--accent-secondary)' : '' }}
                                    required
                                />
                                <label htmlFor="email" className="form-label">Email Address</label>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    id="subject"
                                    value={form.subject}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder=" "
                                    style={{ borderBottomColor: errors.subject ? 'var(--accent-secondary)' : '' }}
                                    required
                                />
                                <label htmlFor="subject" className="form-label">Subject</label>
                            </div>

                            <div className="form-group">
                                <textarea
                                    id="message"
                                    value={form.message}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder=" "
                                    style={{ borderBottomColor: errors.message ? 'var(--accent-secondary)' : '' }}
                                    required
                                ></textarea>
                                <label htmlFor="message" className="form-label">What would you like to discuss?</label>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={submitStatus === 'sending'}>
                                {submitStatus === 'sending' ? (
                                    <>Sending... <i className="fa-solid fa-spinner fa-spin" style={{ marginLeft: '0.5rem' }}></i></>
                                ) : (
                                    <>Send Message <i className="fa-solid fa-paper-plane" style={{ marginLeft: '0.5rem' }}></i></>
                                )}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
