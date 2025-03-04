// src/components/ui/CursorEffect.jsx
import { useEffect, useState } from 'react';

function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    
    const hideOnMouseOut = () => setHidden(true);
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseleave', hideOnMouseOut);
    window.addEventListener('mouseenter', () => setHidden(false));
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseleave', hideOnMouseOut);
      window.removeEventListener('mouseenter', () => setHidden(false));
    };
  }, []);
  
  if (typeof window === 'undefined' || hidden) return null;
  
  return (
    <>
      <div 
        className="cursor-dot hidden md:block"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          opacity: hidden ? 0 : 1
        }}
      />
      <div 
        className="cursor-outline hidden md:block"
        style={{ 
          left: `${position.x - 16}px`, 
          top: `${position.y - 16}px`,
          opacity: hidden ? 0 : 0.5
        }}
      />
    </>
  );
}

export default CursorEffect;