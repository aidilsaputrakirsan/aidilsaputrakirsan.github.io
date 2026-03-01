import { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';

const AnimeHeroGraphic = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Use animejs v4 timeline API
        const tl = createTimeline({
            loop: true,
            duration: 10000,
        });

        // Rotate the outer rings
        tl.add({
            targets: '.hero-ring-1',
            rotateZ: [0, 360],
            easing: 'linear',
            duration: 20000
        }, 0);

        tl.add({
            targets: '.hero-ring-2',
            rotateZ: [360, 0],
            easing: 'linear',
            duration: 15000
        }, 0);

        // Pulse the inner shapes
        tl.add({
            targets: '.hero-diamond',
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.8, 0.3],
            easing: 'easeInOutSine',
            duration: 4000
        }, 0);

    }, []);

    return (
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mx-auto opacity-90">
            <svg
                ref={svgRef}
                viewBox="0 0 400 400"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(255,76,76,0.2)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer Ring 1 (Multicolor dashed) */}
                <circle
                    className="hero-ring-1"
                    cx="200"
                    cy="200"
                    r="180"
                    stroke="#1c1c1c"
                    strokeWidth="4"
                    strokeDasharray="10 5"
                    style={{ transformOrigin: 'center' }}
                />

                {/* Thin colorful arc highlights on outer ring */}
                <circle
                    className="hero-ring-1"
                    cx="200"
                    cy="200"
                    r="180"
                    stroke="#ff4c4c" // animeRed
                    strokeWidth="4"
                    strokeDasharray="200 1000"
                    strokeLinecap="round"
                    style={{ transformOrigin: 'center' }}
                />
                <circle
                    className="hero-ring-1"
                    cx="200"
                    cy="200"
                    r="180"
                    stroke="#18FF92" // animeGreen
                    strokeWidth="4"
                    strokeDasharray="200 1000"
                    strokeDashoffset="-300"
                    strokeLinecap="round"
                    style={{ transformOrigin: 'center' }}
                />
                <circle
                    className="hero-ring-1"
                    cx="200"
                    cy="200"
                    r="180"
                    stroke="#39C0FB" // animeBlue
                    strokeWidth="4"
                    strokeDasharray="200 1000"
                    strokeDashoffset="-600"
                    strokeLinecap="round"
                    style={{ transformOrigin: 'center' }}
                />

                {/* Inner Ring 2 (Dashed tracks) */}
                <circle
                    className="hero-ring-2"
                    cx="200"
                    cy="200"
                    r="140"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeDasharray="2 4"
                    style={{ transformOrigin: 'center' }}
                />

                {/* Inner Central Geometry (Diamond/Wave) */}
                <path
                    className="hero-diamond flex"
                    d="M200 80 L320 200 L200 320 L80 200 Z"
                    fill="url(#red-glow)"
                    style={{ transformOrigin: 'center' }}
                />

                {/* Crosshair Dots */}
                <circle cx="200" cy="80" r="4" fill="#ff4c4c" />
                <circle cx="320" cy="200" r="4" fill="#ff4c4c" />
                <circle cx="200" cy="320" r="4" fill="#ff4c4c" />
                <circle cx="80" cy="200" r="4" fill="#ff4c4c" />

                <defs>
                    <radialGradient id="red-glow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#ff4c4c" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ff4c4c" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};

export default AnimeHeroGraphic;
