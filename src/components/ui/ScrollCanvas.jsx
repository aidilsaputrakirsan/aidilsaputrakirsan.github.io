import { useEffect, useRef, useState } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';

const ScrollCanvas = ({
    frameCount = 240, // Ezgif output total
    framePrefix = 'ezgif-frame-',
    frameExtension = '.jpg',
    folderPath = '/frames/',
}) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    // 1. Preload all images aggressively
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // Ezgif uses a 3-digit padding (e.g., ezgif-frame-001.jpg)
            const padIndex = i.toString().padStart(3, '0');
            img.src = `${folderPath}${framePrefix}${padIndex}${frameExtension}`;

            img.onload = () => {
                loadedCount++;
                setImagesLoaded(loadedCount);
            };

            // Add to array anyway to keep the absolute index correct even if it errors
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [frameCount, framePrefix, frameExtension, folderPath]);

    // 2. Track Scroll Progress over this massive section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] // Track from when container hits top of screen, until bottom hits bottom of screen
    });

    // Calculate the current frame integer index based on scroll percentage
    const currentFrameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1]
    );

    // 3. Auto-play Logic
    const [autoPlayFrame, setAutoPlayFrame] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const playDirection = useRef(1);

    useEffect(() => {
        // Detect if user has started scrolling to kill autoplay
        const unsubscribeScroll = scrollYProgress.on("change", (latestVal) => {
            if (latestVal > 0.005) {
                setIsScrolling(true);
            } else {
                // If they return to the exact top, let it auto play again if desired, or keep it paused
                setIsScrolling(false);
            }
        });

        return () => unsubscribeScroll();
    }, [scrollYProgress]);

    useEffect(() => {
        let animationFrameId;
        const fps = 12; // Sangat pelan untuk efek ambient
        const fpsInterval = 1000 / fps;
        let then = Date.now();

        const playFrames = () => {
            if (isScrolling) return; // Yield to scroll physics

            animationFrameId = requestAnimationFrame(playFrames);
            let now = Date.now();
            let elapsed = now - then;

            if (elapsed > fpsInterval) {
                then = now - (elapsed % fpsInterval);
                setAutoPlayFrame((prev) => {
                    // Ping-pong antara frame 0 dan 25
                    if (prev >= 25) {
                        playDirection.current = -1;
                    } else if (prev <= 0) {
                        playDirection.current = 1;
                    }
                    return prev + playDirection.current;
                });
            }
        };

        if (!isScrolling && imagesLoaded === frameCount) {
            playFrames();
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isScrolling, imagesLoaded, frameCount]);


    // 4. Render Canvas (Driven by Scroll OR Auto-play)
    useEffect(() => {
        const renderFrame = (index) => {
            if (images[index] && images[index].complete && canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const img = images[index];

                // Ensure canvas draws sharp on high-DPI screens
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                ctx.scale(dpr, dpr);

                // Draw image covering the entire central area like object-fit: cover
                const canvasRatio = window.innerWidth / window.innerHeight;
                const imgRatio = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasRatio > imgRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }

                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // Wipe last frame
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        }

        // Determine which integer to use
        if (isScrolling) {
            const unsubscribe = currentFrameIndex.on("change", (latestFloat) => {
                renderFrame(Math.floor(latestFloat));
            });
            return () => unsubscribe();
        } else {
            renderFrame(autoPlayFrame);
        }

    }, [currentFrameIndex, images, autoPlayFrame, isScrolling]);

    // Draw exactly the first frame initially once loaded
    useEffect(() => {
        if (images[0] && images[0].complete && canvasRef.current) {
            const index = 0;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = images[index];

            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);

            const canvasRatio = window.innerWidth / window.innerHeight;
            const imgRatio = img.width / img.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.width / imgRatio;
            let offsetX = 0;
            let offsetY = (canvas.height - drawHeight) / 2;

            if (canvasRatio <= imgRatio) {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    }, [imagesLoaded]);

    return (
        // The container now acts as an absolute background, pinned to the top of its parent (Hero)
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* The sticky container stays locked to the screen while tracking the parent section's massive height */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

                {/* Loading Indicator */}
                {imagesLoaded < frameCount && (
                    <div className="absolute z-50 text-white font-mono text-sm tracking-widest bg-black/80 px-4 py-2 rounded">
                        LOADING FRAMES... {Math.round((imagesLoaded / frameCount) * 100)}%
                    </div>
                )}

                {/* The Canvas itself */}
                <canvas
                    ref={canvasRef}
                    style={{ width: "100%", height: "100%" }}
                    className="w-full h-full object-cover mix-blend-screen opacity-90"
                />

                {/* Optional dark overlay to ensure Hero text remains readable */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
        </div>
    );
};

export default ScrollCanvas;
