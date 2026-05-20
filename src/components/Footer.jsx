import React from 'react';

export default function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-left">
                    <div className="logo footer-logo">
                        Pururaj Singh
                    </div>
                    <p className="footer-text">
                        &copy; 2026 Pururaj Singh. All rights reserved.
                    </p>
                </div>
                <div className="footer-right">
                    <a href="mailto:pururajsingh76@gmail.com" className="footer-social-link" aria-label="Email Address">
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                    <a href="https://github.com/pururajsingh06" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub Profile">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/pururaj-singh-9b91a22bb/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn Profile">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
