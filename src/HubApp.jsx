// Myst Tech hub — myst-tech.com/
// One gate to every Myst app. Content comes from src/data/products.js.
// Bilingual (EN default / ID) via src/i18n/LangContext.jsx.
import NavbarSoft from './components/layout/NavbarSoft';
import FooterSoft from './components/layout/FooterSoft';
import HeroHub from './components/hub/HeroHub';
import ProductsHub from './components/hub/ProductsHub';
import CoreHub from './components/hub/CoreHub';
import FounderHub from './components/hub/FounderHub';
import ContactHub from './components/hub/ContactHub';
import CvModal from './components/cv/CvModal';
import MystMark from './components/ui/MystMark';
import SupportModal from './components/support/SupportModal';
import { liveProducts } from './data/products';
import { LangProvider, useLang } from './i18n/LangContext';

const links = [
  [{ en: 'Apps', id: 'Aplikasi' }, '#produk'],
  ['Myst-Core', '#core'],
  ['Founder', '#founder'],
  [{ en: 'Contact', id: 'Kontak' }, '#kontak'],
];

const brand = (
  <>
    <MystMark className="h-7 w-7" />
    Myst<span className="-ml-1 text-warmPeach">Tech</span>
  </>
);

const coffee = { en: 'Buy me a coffee', id: 'Traktir kopi' };

function Hub() {
  const { t } = useLang();
  return (
    <div className="bg-warmBg font-body text-warmInk">
      <NavbarSoft links={links} brand={brand} cta={{ label: { en: "Aidil's profile", id: 'Profil Aidil' }, href: '/aidil/' }} />
      <main>
        <HeroHub />
        <ProductsHub />
        <CoreHub />
        <FounderHub />
        <ContactHub />
      </main>
      <FooterSoft
        brand={brand}
        tagline={{
          en: 'AI apps for education & communities · Balikpapan, Indonesia',
          id: 'Aplikasi AI untuk pendidikan & komunitas · Balikpapan, Indonesia',
        }}
        copyright="Myst Tech · Aidil Saputra Kirsan."
        coffeeLabel={coffee}
      >
        <nav aria-label={t({ en: 'All apps', id: 'Semua aplikasi' })} className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
          {liveProducts().map((p) => (
            <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className="font-body text-sm font-medium text-warmMuted hover:text-warmInk">
              {p.title}
            </a>
          ))}
          <a href="https://myst-tech.com/myst-core/" target="_blank" rel="noreferrer" className="font-body text-sm font-medium text-warmMuted hover:text-warmInk">
            Myst-Core Docs
          </a>
          <a href="/aidil/" className="font-body text-sm font-medium text-warmMuted hover:text-warmInk">
            {t({ en: 'Founder profile', id: 'Profil Founder' })}
          </a>
        </nav>
      </FooterSoft>
      <CvModal />
      <SupportModal />
    </div>
  );
}

function HubApp() {
  return (
    <LangProvider>
      <Hub />
    </LangProvider>
  );
}

export default HubApp;
