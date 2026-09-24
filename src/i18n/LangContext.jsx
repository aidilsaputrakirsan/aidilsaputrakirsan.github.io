/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Two languages: English (default) and Bahasa Indonesia.
// The choice is shared by both pages (/ and /aidil/) via localStorage.
//
// Bilingual text anywhere (components or src/data/*) is written as
//   { en: 'Hello', id: 'Halo' }
// and resolved with t(). Plain strings pass through unchanged, so data can be
// translated gradually.
export const LANGS = ['en', 'id'];
const KEY = 'lang';

const readLang = () => {
  try {
    const v = localStorage.getItem(KEY);
    return LANGS.includes(v) ? v : 'en';
  } catch {
    return 'en';
  }
};

// Resolve a bilingual value for a given language.
export const resolve = (value, lang) => {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('en' in value || 'id' in value)) {
    return value[lang] ?? value.en;
  }
  return value;
};

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (v) => resolve(v, 'en') });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Keep other open tabs/pages in sync
  useEffect(() => {
    const onStorage = (e) => e.key === KEY && LANGS.includes(e.newValue) && setLangState(e.newValue);
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode — still switches for this visit */
    }
  }, []);

  const t = useCallback((value) => resolve(value, lang), [lang]);
  const ctx = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={ctx}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
