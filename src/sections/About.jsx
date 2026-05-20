import React from 'react';
import photo from '../assets/photo.png';

const skills = [
    'C++', 'Python', 'JavaScript', 'Java', 'React', 'Tailwind CSS',
    'HTML5', 'CSS3', 'React Router', 'Bootstrap', 'Node.js', 'Socket.IO',
    'JWT', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Pandas',
    'NumPy', 'Matplotlib', 'MongoDB', 'MySQL', 'Git', 'GitHub',
    'Figma', 'Canva', 'Streamlit'
];

export default function About() {
    return (
        <section id="about">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">About Me</span>
                    <h2 className="section-title">Get To Know Me</h2>
                </div>

                <div className="about-content">
                    {/* Top: Photo + Text row */}
                    <div className="about-top-row">
                        {/* Photo */}
                        <div className="about-photo-wrap">
                            <div className="about-photo-glow"></div>
                            <div className="about-photo-ring">
                                <div className="about-photo-frame">
                                    <img src={photo} alt="Pururaj Singh" className="about-photo-img" />
                                </div>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="about-text">
                            <p>
                                Hey, I'm Pururaj — a 3rd year B.Tech student passionate about building modern digital experiences through code and design. I enjoy developing full-stack web applications, experimenting with AI/ML systems, and creating real-time interactive platforms that solve meaningful problems.
                            </p>
                            <p>
                                I love working on projects that combine clean UI/UX with strong backend logic, whether it's an AI-powered traffic simulator, a collaborative coding platform, or intelligent analytics dashboards. Along with development, I also enjoy designing interfaces in Figma and turning ideas into polished, user-friendly products.
                            </p>
                            <p>
                                My interests include web development, real-time systems, AI/ML, and product design. I'm always exploring new technologies, improving my skills, and building projects that challenge me creatively and technically.
                            </p>
                            <p>
                                When I'm not coding, you'll probably find me listening to music, exploring tech trends, or working on new ideas and side projects.
                            </p>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="about-skills-section">
                        <h3 className="about-skills-heading">Skills</h3>
                        <div className="about-skills-tags">
                            {skills.map((skill, idx) => (
                                <span className="skill-tag" key={idx}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
