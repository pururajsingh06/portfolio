import React, { useState, useEffect } from 'react';

export default function Header({ theme, handleThemeToggle, activeSection }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [headerScrolled, setHeaderScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHeaderScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <header id="header" className={headerScrolled ? 'scrolled' : ''}>
            <div className="nav-container">
                <a href="#home" className="logo" onClick={handleLinkClick}>
                    Pururaj Singh
                </a>

                <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="nav-links">
                    <li>
                        <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={handleLinkClick}>Home</a>
                    </li>
                    <li>
                        <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={handleLinkClick}>About</a>
                    </li>
                    <li>
                        <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={handleLinkClick}>Projects</a>
                    </li>
                    <li>
                        <a href="#artboard" className={activeSection === 'artboard' ? 'active' : ''} onClick={handleLinkClick}>Artboard</a>
                    </li>
                    <li>
                        <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={handleLinkClick}>Contact</a>
                    </li>
                </ul>

                <div className="nav-actions">
                    <button className="theme-toggle" id="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle dark/light theme">
                        <i className="fa-solid fa-moon" style={{ display: theme === 'dark' ? 'block' : 'none' }}></i>
                        <i className="fa-solid fa-sun" style={{ display: theme === 'light' ? 'block' : 'none' }}></i>
                    </button>

                    <button className={`menu-btn ${menuOpen ? 'active' : ''}`} id="menu-btn" onClick={() => setMenuOpen(prev => !prev)} aria-label="Open navigation menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}
