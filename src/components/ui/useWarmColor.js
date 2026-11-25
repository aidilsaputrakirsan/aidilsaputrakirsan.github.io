import { useEffect, useState } from 'react';

// Reads a Sumi & Vermilion palette token (e.g. 'warm-muted' → --warm-muted) as a
// concrete `rgb(r, g, b)` string, and updates when <html class="dark"> toggles.
// Needed by React Bits components that parse colours on a canvas (ShinyText),
// where `rgb(var(--…))` can't be resolved.
const read = (token) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim();
  return raw ? `rgb(${raw.split(/\s+/).join(', ')})` : '';
};

export default function useWarmColor(token) {
  const [color, setColor] = useState(() => (typeof document === 'undefined' ? '' : read(token)));

  useEffect(() => {
    const update = () => setColor(read(token));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [token]);

  return color;
}
