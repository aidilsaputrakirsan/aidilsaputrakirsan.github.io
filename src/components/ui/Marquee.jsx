// Infinite horizontal marquee. Cheap (single CSS transform), pauses on hover,
// and stops under reduced-motion via the global rule in index.css.
function Marquee({ items, speed = 26, className = '', reverse = false }) {
  const row = [...items, ...items];
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className="flex shrink-0 items-center gap-8 pr-8 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-2xl md:text-3xl font-bold">{item}</span>
            <span className="text-warmPeach">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
