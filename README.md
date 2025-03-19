# Aidil Saputra Kirsan - Portfolio Website

A modern, responsive portfolio website showcasing the professional profile, skills, projects, and educational resources of Aidil Saputra Kirsan, an Information System Lecturer & Full Stack Developer.

![Portfolio Preview](https://i.imgur.com/2QcQ3te.png)

## 📋 Project Overview

This portfolio website serves as a comprehensive digital resume and showcase platform, featuring:

- Interactive and responsive design with modern UI elements
- Detailed sections for professional experience, skills, and project showcase
- Educational resources section for students and colleagues
- Contact form for professional inquiries
- Particle animations and UI enhancements for an engaging user experience

## 🚀 Technologies Used

### Core Framework & Build Tools
- **React.js** - Frontend library for building the user interface
- **Vite** - Next-generation frontend build tool offering fast development experience
- **JavaScript (ES6+)** - Modern JavaScript syntax and features

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for rapidly building custom designs
- **Framer Motion** - Animation library for React to create fluid UI animations
- **AOS (Animate On Scroll)** - Library to animate elements as they scroll into view
- **Custom CSS** - Additional styling with custom animations and effects

### Visualization & Interactive Elements
- **Chart.js / react-chartjs-2** - For creating skill radar charts and data visualizations
- **React Particles / tsparticles-slim** - For creating interactive particle backgrounds
- **React Type Animation** - For creating typing animation effects
- **React Icons** - Icon library providing access to popular icon sets

### Additional Libraries
- **React Intersection Observer** - For detecting when elements are in view
- **React DOM** - For manipulating the DOM in React applications

### Deployment
- **GitHub Pages** - For hosting the static website
- **gh-pages** - For automated deployment to GitHub Pages

## 📦 Project Structure

```
src/
├── assets/            # Static assets like images and icons
├── components/
│   ├── layout/        # Layout components (Navbar, Footer)
│   ├── sections/      # Main page sections (Hero, About, Skills, etc.)
│   └── ui/            # Reusable UI components
├── data/              # Data files for content (projects, skills, experience)
├── App.jsx            # Main application component
├── index.css          # Global styles and Tailwind directives
└── main.jsx           # Application entry point
```

## 🔍 Key Features

### Interactive UI Elements
- Custom cursor effects
- Animated skill bars and charts
- Interactive project cards with hover effects
- Smooth scrolling and navigation
- Responsive design for all device sizes

### Content Sections
- **Hero** - Introduction with animated typing effect and particle background
- **About** - Personal information and areas of expertise
- **Skills** - Technical skills with visual representations
- **Experience** - Professional experience, education, and achievements
- **Projects** - Portfolio of development projects with filtering capability
- **Educational Resources** - Teaching materials and resources for students
- **Contact** - Contact form and professional contact information

### Performance Optimizations
- Optimized image loading
- Efficient component rendering with React
- Fast development and production builds with Vite

## 🗄️ Data Management

The site uses a static data approach with structured JavaScript objects for content management:

- `projects.js` - Project showcase information
- `skills.js` - Technical skills data
- `experience.js` - Work experience history
- `education.js` - Educational background
- `achievements.js` - Professional achievements and certifications

No database is currently integrated as the site functions as a static portfolio. All data is stored in JavaScript files and loaded at runtime.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/aidilsaputrakirsan3/portfolio-website.git
cd portfolio-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

5. Deploy to GitHub Pages
```bash
npm run deploy
# or
yarn deploy
```

## 📝 Conclusion

This portfolio website is built with modern web technologies and best practices, showcasing not only the professional profile of Aidil Saputra Kirsan but also demonstrating technical proficiency in React development and UI design. The site features a clean, responsive design with interactive elements that enhance user engagement.

Key strengths of the implementation include:
- Modern React patterns with functional components and hooks
- Clean separation of concerns between data and presentation
- Responsive design that works well on all devices
- Interactive elements that enhance user experience
- Organized code structure that promotes maintainability

Potential future enhancements could include:
- Integration with a CMS for easier content management
- Server-side rendering for improved SEO
- Integration with a backend for the contact form functionality
- Dark/light theme toggle option
- Localization support for multiple languages

## 📄 License

This project is available as open source under the terms of the MIT License.