# Pururaj Singh | Creative Developer Portfolio

A premium, modern, glassmorphic portfolio designed for developers and creators. This portfolio blends complex interactive front-end mechanics (like dynamic canvas particles, mouse-tracking follower animations, and dual-state media lightboxes) with sleek modern visual styling.

---

## 🚀 Key Features

* **Glassmorphism Design System:** Harmonized CSS color palette featuring deep dark gradients, thin frosted card borders (`backdrop-filter`), and glowing shadows.
* **Dynamic Canvas Particles:** A self-adjusting HTML5 canvas background (`CanvasBackground.jsx`) that generates floating connection particles aligned with the active theme.
* **Custom Interactive Cursor:** High-performance 60 FPS cursor with a smooth lagging follower ring. The cursor dynamically shrinks, scales up, glows, and expands over clickable elements, and fades out cleanly over scrollable iframes to prevent freezing.
* **Native PDF & Artboard Showcase:** Allows inline scrolling of complex PDF documents (such as department magazines) directly within the Artboard grid. Features a full-screen media Lightbox with arrow and escape key handlers.
* **Live Formspree Integration:** A fully configured AJAX contact form connected to Formspree, featuring active input validation, button loading spinners, and slide-in color-coded Toast feedback (success and error states).
* **Responsive Layouts:** Designed to adapt beautifully to viewports from 4K down to small mobile screens, including centered navigation links and mobile-adapted stacks.
* **Futuristic SVG Favicon:** A custom-designed geometric "P" vector favicon with neon purple/pink gradient glow strokes that adapts to dark browser tabs.

---

## 🛠️ Tech Stack

* **Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
* **Fonts & Icons:** Google Fonts (Outfit, Inter) & FontAwesome 6.4
* **Forms:** Formspree API

---

## 📂 Project Structure

```bash
Portfolio/
├── public/                 # Static assets served at the root
│   ├── favicon.svg         # Hand-crafted geometric 'P' vector favicon
│   └── resume.pdf          # Your interactive professional resume (PDF)
├── src/
│   ├── assets/             # Images, posters, and asset imports
│   ├── components/         # Atomic UI Components
│   │   ├── CanvasBackground.jsx  # Floating particle backdrop
│   │   ├── CustomCursor.jsx      # Mouse tracking & follower ring
│   │   ├── Header.jsx            # Sticky navigation bar with mobile toggle
│   │   ├── Footer.jsx            # Fluid footer with stacked left branding & right socials
│   │   ├── Lightbox.jsx          # Overlay viewer for posters & PDFs
│   │   └── Toast.jsx             # Dynamic feedback toast message alert
│   ├── sections/           # Modular Page Sections
│   │   ├── About.jsx             # Bio section with neon glowing avatar ring
│   │   ├── Artboard.jsx          # Graphic art & interactive scrollable PDFs
│   │   ├── Contact.jsx           # Formspree email contact form
│   │   ├── Hero.jsx              # Welcome lander with dynamic typewriter speed loops
│   │   ├── Projects.jsx          # Filterable software grid
│   │   └── Resume.jsx            # Interactive timeline & download button
│   ├── App.jsx             # Central routing, form dispatchers, and state logic
│   ├── index.css           # Core styling tokens, utility classes, and media queries
│   └── main.jsx            # React application entry point
├── index.html              # Main HTML markup
└── vite.config.js          # Vite build config
```

---

## ⚙️ Setup & Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pururajsingh06/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser to the URL displayed in your terminal (typically `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```
   This compiles your assets and places them into the `dist/` directory, optimized for hosting (Vercel, Netlify, GitHub Pages).

---

## 🔧 Personal Customization

### 1. Connecting the Contact Form
To receive messages in your personal inbox:
1. Register for a free account at [Formspree](https://formspree.io/).
2. Create a new form and copy your Form ID (a short code like `xvzyzelr`).
3. Open `src/App.jsx` and replace the form endpoint URL on line 203:
   ```javascript
   fetch("https://formspree.io/f/YOUR_FORM_ID", { ... })
   ```

### 2. Updating Your Resume PDF
To update the downloadable resume:
* Copy your latest resume PDF.
* Rename it to `resume.pdf` and drop it into the `public/` directory, replacing the existing placeholder. It will automatically route to all download and view buttons.
