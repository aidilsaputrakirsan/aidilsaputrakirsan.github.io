/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useLang, LANGS } from '../../i18n/LangContext';

// Compact EN | ID switch — used in the navbar on both pages.
function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t({ en: 'Language', id: 'Bahasa' })}
      className="relative inline-flex items-center rounded-full border border-warmLine bg-warmCard/70 p-0.5 font-body text-xs font-bold"
    >
      {LANGS.map((l) => {
        const on = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={on}
            lang={l}
            title={l === 'en' ? 'English' : 'Bahasa Indonesia'}
            className={`relative rounded-full px-2.5 py-1 uppercase transition-colors ${on ? 'text-warmBg' : 'text-warmMuted hover:text-warmInk'}`}
          >
            {on && <motion.span layoutId="langPill" className="absolute inset-0 rounded-full bg-warmInk" transition={{ type: 'spring', stiffness: 450, damping: 34 }} />}
            <span className="relative z-10">{l}</span>
          </button>
        );
      })}
    </div>
  );
}

export default LangToggle;
