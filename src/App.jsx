import React, { useState, useEffect } from 'react';

// Asset imports
import nescafeImg from './assets/Nescafe.png';
import m5Img from './assets/M5.png';
import pixelImg from './assets/Pixel.png';
import omenfinalImg from './assets/Omenfinal.jpg';
import odysseyPdf from './assets/Odyessy3.0.pdf';
import odysseyCover from './assets/odyssey_cover.jpg';

// Import Atomic UI Components
import CanvasBackground from './components/CanvasBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import Toast from './components/Toast';
import CustomCursor from './components/CustomCursor';

// Import Layout Page Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Artboard from './sections/Artboard';
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
    const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
    const [submitStatus, setSubmitStatus] = useState('idle');

    // Graphic posters data list used for Lightbox indexing
    const posters = [
        {
            type: 'image',
            src: nescafeImg,
            title: 'Nescafé',
            desc: 'A brand poster design exploring rich coffee aesthetics, vibrant color blocking, and bold typography.'
        },
        {
            type: 'image',
            src: m5Img,
            title: 'M5',
            desc: 'A typographic visual layout based on pure asymmetric grid calculations and Helvetic contrast.'
        },
        {
            type: 'image',
            src: pixelImg,
            title: 'Pixel',
            desc: 'A creative pixel-art inspired design piece blending retro aesthetics with modern graphic composition.'
        },
        {
            type: 'image',
            src: omenfinalImg,
            title: 'Omen',
            desc: 'A dark atmospheric poster with dramatic lighting, bold contrasts, and cinematic depth.'
        },
        {
            type: 'pdf',
            src: odysseyPdf,
            cover: odysseyCover,
            title: 'Odyssey 3.0',
            desc: 'A curated design magazine featuring editorial layouts, creative spreads, and visual storytelling.'
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
        setLightbox({ active: true, type: item.type, src: item.src, cover: item.cover, title: item.title, desc: item.desc, index });
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
            return { active: true, type: item.type, src: item.src, cover: item.cover, title: item.title, desc: item.desc, index: newIndex };
        });
    };

    const handleNextPoster = () => {
        setLightbox(prev => {
            const newIndex = (prev.index + 1) % posters.length;
            const item = posters[newIndex];
            return { active: true, type: item.type, src: item.src, cover: item.cover, title: item.title, desc: item.desc, index: newIndex };
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
            setSubmitStatus('sending');

            fetch("https://formspree.io/f/xvzyzelr", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(form)
            })
                .then(response => {
                    if (response.ok) {
                        setToast({ visible: true, type: 'success', message: 'Thank you. I will reply within 12 hours.' });
                        setForm({ name: '', email: '', subject: '', message: '' });
                        setSubmitStatus('idle');
                        setTimeout(() => {
                            setToast(prev => ({ ...prev, visible: false }));
                        }, 4500);
                    } else {
                        response.json().then(data => {
                            setToast({ visible: true, type: 'error', message: data.error || 'Server error. Please try again.' });
                            setSubmitStatus('idle');
                            setTimeout(() => {
                                setToast(prev => ({ ...prev, visible: false }));
                            }, 4500);
                        });
                    }
                })
                .catch(() => {
                    setToast({ visible: true, type: 'error', message: 'Connection error. Please check your network.' });
                    setSubmitStatus('idle');
                    setTimeout(() => {
                        setToast(prev => ({ ...prev, visible: false }));
                    }, 4500);
                });
        }
    };

    const handleCVDownload = () => {
        window.open('/Pururaj_resume_final1.pdf', '_blank');
    };

    return (
        <>
            {/* Custom Interactive Cursor */}
            <CustomCursor />

            {/* Canvas deflection background particles */}
            <CanvasBackground theme={theme} />

            {/* Navigation Header */}
            <Header
                theme={theme}
                handleThemeToggle={handleThemeToggle}
                activeSection={activeSection}
            />

            <main>
                {/* Main Page Layout Sections */}
                <Hero handleCVDownload={handleCVDownload} />
                <About />
                <Projects
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
                <Artboard posters={posters} handleOpenLightbox={handleOpenLightbox} />
                <Contact
                    form={form}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}
                    submitStatus={submitStatus}
                />
            </main>

            {/* Slide-in Feedback success Toast */}
            <Toast visible={toast.visible} message={toast.message} type={toast.type} />

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
