import ClickSpark from '../reactbits/ClickSpark';

// Page-wide click sparks (React Bits ClickSpark) in the Sumi & Vermilion palette.
// Wraps the whole page on / and /aidil/. Canvas-only, no dependencies; it does
// nothing until a click and respects prefers-reduced-motion by itself.
const COLORS = ['#C43D2B', '#E2583F', '#8FAE6E'];

function MystSparks({ children }) {
  return (
    <ClickSpark sparkColor={COLORS} sparkSize={9} sparkRadius={22} sparkCount={9} duration={480} randomness={0.35}>
      {children}
    </ClickSpark>
  );
}

export default MystSparks;
