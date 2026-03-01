import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed bottom-6 right-6 flex items-center gap-4 z-50 pointer-events-none mix-blend-difference">
            {/* The line graph track */}
            <div className="w-32 h-1 bg-[#333333] rounded-full overflow-hidden flex">
                <motion.div
                    className="h-full bg-animeRed"
                    style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                />
            </div>

            {/* Custom vertical tick marks like on animejs.com */}
            <div className="absolute inset-0 flex items-center justify-between px-[2px] w-32 left-0 h-1">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-[1px] h-2 bg-[#111111]" />
                ))}
            </div>
        </div>
    );
};

export default ScrollProgress;
