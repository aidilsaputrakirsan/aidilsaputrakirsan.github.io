/* eslint-disable no-unused-vars */
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const AnimeProjectCard = ({ project, index }) => {
    const sectionRef = useRef(null);

    // Track scroll purely within this section's visibility window
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["0 1", "1 0"] // Start tracking when top enters viewport, end when bottom leaves
    });

    // Intense scrub values based on scroll
    // Text container scrubs from a massive offset and fades
    const textY = useTransform(scrollYProgress, [0, 0.5, 1], [300, 0, -300]);
    const textOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

    // Image container intensely scrubs scale and rotation simulating frame depth (3D Parallax)
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
    const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-25, 0, 25]);
    const imageY = useTransform(scrollYProgress, [0, 1], [250, -250]);

    // Animejs inspired accent colors
    const colors = ['#ff4c4c', '#18FF92', '#F9E858', '#39C0FB'];
    const accentColor = colors[index % colors.length];

    // Alternate sides
    const isReversed = index % 2 !== 0;

    return (
        <section
            ref={sectionRef}
            className={`min-h-[100vh] flex items-center border-t border-[#222222] py-32 overflow-hidden ${index % 2 === 0 ? 'bg-[#111111]' : 'bg-[#151515]'}`}
        >
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className={`flex flex-col lg:flex-row items-center gap-24 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Text Column - Intense Parallax */}
                    <div className="flex-1 w-full relative z-10">
                        <motion.div style={{ opacity: textOpacity, y: textY }}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-[2px]" style={{ backgroundColor: accentColor }}></div>
                                <span className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>
                                    {project.category}
                                </span>
                            </div>

                            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-textLight tracking-tight">
                                {project.title}
                            </h3>

                            <p className="text-xl text-textMuted leading-relaxed mb-8 max-w-xl">
                                {project.description}
                            </p>

                            {/* Tech Stack logs */}
                            <div className="flex flex-col gap-3 font-mono text-sm text-[#888888] mb-12 w-full max-w-md bg-[#0a0a0a] p-6 rounded-sm border border-[#222]">
                                {project.technologies.slice(0, 5).map((tech, i) => (
                                    <div key={i} className="flex justify-between gap-8 border-b border-[#222] pb-2">
                                        <span className="opacity-50">sys.req[{i}]</span>
                                        <span style={{ color: accentColor }} className="font-bold">'{tech}'</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-8">
                                <a
                                    href={project.codeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-textLight hover:text-white transition-colors flex items-center gap-3 group"
                                >
                                    <FaGithub className="text-2xl group-hover:scale-110 group-hover:text-[#ff4c4c] transition-all" />
                                    <span className="font-mono text-sm border-b border-transparent group-hover:border-[#ff4c4c] transition-colors uppercase tracking-widest">source.init()</span>
                                </a>
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-textLight hover:text-white transition-colors flex items-center gap-3 group"
                                >
                                    <FaExternalLinkAlt className="text-2xl group-hover:scale-110 group-hover:text-[#18FF92] transition-all" />
                                    <span className="font-mono text-sm border-b border-transparent group-hover:border-[#18FF92] transition-colors uppercase tracking-widest">demo.exec()</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image/Visual Column - Massive Frame Scrubbing */}
                    <div className="flex-1 w-full flex justify-center perspective-[2000px]">
                        <motion.div
                            style={{
                                scale: imageScale,
                                rotateY: imageRotate,
                                y: imageY,
                                opacity: textOpacity
                            }}
                            className="relative w-full aspect-[16/10] max-w-2xl rounded-sm overflow-hidden border border-[#333333] shadow-2xl"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700 hover:scale-110"
                                onError={(e) => {
                                    e.target.src = `https://via.placeholder.com/800x600/222222/ffffff?text=${project.title.replace(/ /g, '+')}`;
                                }}
                            />
                            {/* Color overlay to tie it to the section accent */}
                            <div
                                className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none transition-opacity duration-700 hover:opacity-0"
                                style={{ backgroundColor: accentColor }}
                            ></div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AnimeProjectCard;
