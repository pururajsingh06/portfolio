import React, { useState, useEffect } from 'react';

// Import Atomic UI Components
import CanvasBackground from './components/CanvasBackground';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import Toast from './components/Toast';

// Import Layout Page Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Artboard from './sections/Artboard';
import Resume from './sections/Resume';
import Contact from './sections/Contact';

export default function App() {
    // Theme state
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });
    
    // Active section state for navbar highlighting
    const [activeSection, setActiveSection] = useState('home');
    
    // Filtering Category for Projects
    const [activeCategory, setActiveCategory] = useState('all');
    
    // Lightbox modal overlay states
    const [lightbox, setLightbox] = useState({
        active: false,
        src: '',
        title: '',
        desc: '',
        index: 0
    });

    // Form inputs and feedback indicators states
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({ name: false, email: false, subject: false, message: false });
    const [toastVisible, setToastVisible] = useState(false);

    // Graphic posters data list used for Lightbox indexing
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

    /* ==========================================================================
       THEME PERSISTENCE EFFECT
       ========================================================================== */
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    /* ==========================================================================
       SCROLL DETECTOR (NAVBAR SECTION HIGHLIGHTS)
       ========================================================================== */
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let currentSec = 'home';
            
            sections.forEach(sec => {
                const secTop = sec.offsetTop;
                if (window.scrollY >= (secTop - 150)) {
                    currentSec = sec.getAttribute('id');
                }
            });
            setActiveSection(currentSec);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* ==========================================================================
       LIGHTBOX CONTROLS & KEYBOARD HANDLERS
       ========================================================================== */
    useEffect(() => {
        if (!lightbox.active) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleCloseLightbox();
            if (e.key === 'ArrowLeft') handlePrevPoster();
            if (e.key === 'ArrowRight') handleNextPoster();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightbox]);

    const handleOpenLightbox = (index) => {
        const item = posters[index];
        setLightbox({ active: true, src: item.src, title: item.title, desc: item.desc, index });
        document.body.style.overflow = 'hidden';
    };

    const handleCloseLightbox = () => {
        setLightbox(prev => ({ ...prev, active: false }));
        document.body.style.overflow = 'auto';
    };

    const handlePrevPoster = () => {
        setLightbox(prev => {
            const newIndex = (prev.index - 1 + posters.length) % posters.length;
            const item = posters[newIndex];
            return { active: true, src: item.src, title: item.title, desc: item.desc, index: newIndex };
        });
    };

    const handleNextPoster = () => {
        setLightbox(prev => {
            const newIndex = (prev.index + 1) % posters.length;
            const item = posters[newIndex];
            return { active: true, src: item.src, title: item.title, desc: item.desc, index: newIndex };
        });
    };

    /* ==========================================================================
       FORM SUBMISSIONS & INPUT HANDLING
       ========================================================================== */
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
        if (value.trim()) {
            setErrors(prev => ({ ...prev, [id]: false }));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        let isValid = true;
        const newErrors = { name: false, email: false, subject: false, message: false };

        if (!form.name.trim()) {
            newErrors.name = true;
            isValid = false;
        }
        
        if (!form.subject.trim()) {
            newErrors.subject = true;
            isValid = false;
        }

        if (!form.message.trim()) {
            newErrors.message = true;
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim() || !emailPattern.test(form.email.trim())) {
            newErrors.email = true;
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setToastVisible(true);
            setForm({ name: '', email: '', subject: '', message: '' });
            
            setTimeout(() => {
                setToastVisible(false);
            }, 4500);
        }
    };

    const handleCVDownload = () => {
        window.print();
    };

    return (
        <>
            {/* Canvas deflection background particles */}
            <CanvasBackground theme={theme} />

            {/* Interpolated Custom Follower Cursor */}
            <CustomCursor activeCategory={activeCategory} />

            {/* Navigation Header */}
            <Header 
                theme={theme} 
                handleThemeToggle={handleThemeToggle} 
                activeSection={activeSection} 
            />

            <main>
                {/* Main Page Layout Sections */}
                <Hero />
                <About />
                <Projects 
                    activeCategory={activeCategory} 
                    setActiveCategory={setActiveCategory} 
                />
                <Artboard handleOpenLightbox={handleOpenLightbox} />
                <Resume handleCVDownload={handleCVDownload} />
                <Contact 
                    form={form} 
                    errors={errors} 
                    handleInputChange={handleInputChange} 
                    handleFormSubmit={handleFormSubmit} 
                />
            </main>

            {/* Slide-in Feedback success Toast */}
            <Toast toastVisible={toastVisible} />

            {/* Slideshow image Lightbox overlay */}
            <Lightbox 
                lightbox={lightbox} 
                handleCloseLightbox={handleCloseLightbox} 
                handlePrevPoster={handlePrevPoster} 
                handleNextPoster={handleNextPoster} 
            />

            {/* Global Footer */}
            <Footer />
        </>
    );
}
