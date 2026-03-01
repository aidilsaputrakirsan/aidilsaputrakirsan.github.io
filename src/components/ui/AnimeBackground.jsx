import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

const AnimeBackground = () => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0) return;

        const container = containerRef.current;

        // Clear previous blocks
        container.innerHTML = '';

        const blockSize = 50; // Size of each grid block in pixels
        const columns = Math.ceil(dimensions.width / blockSize);
        const rows = Math.ceil(dimensions.height / blockSize);
        const totalBlocks = columns * rows;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < totalBlocks; i++) {
            const block = document.createElement('div');
            block.classList.add('anime-block');

            // Calculate x and y position for grid
            block.dataset.index = i;
            fragment.appendChild(block);
        }

        container.appendChild(fragment);

        // Initial animation
        const blocks = container.querySelectorAll('.anime-block');
        animate(blocks, {
            scale: [
                { value: 0.1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1200 }
            ],
            opacity: [
                { value: 0, duration: 200 },
                { value: 1, duration: 1000 }
            ],
            delay: stagger(80, { grid: [columns, rows], from: 'center' })
        });

        const handleClick = (e) => {
            // Find which block was clicked roughly based on page coordinates
            const rect = container.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / blockSize);
            const y = Math.floor((e.clientY - rect.top) / blockSize);
            let index = y * columns + x;

            // Ensure index is within bounds
            if (index < 0 || index >= totalBlocks) index = 'center';

            animate(blocks, {
                scale: [
                    { value: 0.5, easing: 'easeOutSine', duration: 300 },
                    { value: 1, easing: 'easeInOutQuad', duration: 600 }
                ],
                backgroundColor: [
                    { value: 'rgba(123, 104, 238, 0.4)', duration: 100 }, // accentPrimary with transparency
                    { value: 'rgba(123, 104, 238, 0)', duration: 600 }
                ],
                delay: stagger(50, { grid: [columns, rows], from: index })
            });
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
            // Clean up anime running instances if needed
            // (anime.remove doesn't exist in v4 in the same way, rely on DOM removal)
        };
    }, [dimensions]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex flex-wrap"
            style={{
                alignContent: 'flex-start'
            }}
        >
            <style>{`
        .anime-block {
          width: 50px !important;
          height: 50px !important;
          border: 1px solid rgba(123, 104, 238, 0.2);
          display: block;
          background-color: transparent;
        }
      `}</style>
        </div>
    );
};

export default AnimeBackground;
