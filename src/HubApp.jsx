// Myst Tech hub — myst-tech.com/
// One gate to every Myst app. Content comes from src/data/products.js.
import NavbarSoft from './components/layout/NavbarSoft';
import FooterSoft from './components/layout/FooterSoft';
import HeroHub from './components/hub/HeroHub';
import ProductsHub from './components/hub/ProductsHub';
import CoreHub from './components/hub/CoreHub';
import FounderHub from './components/hub/FounderHub';
import ContactHub from './components/hub/ContactHub';
import CvModal from './components/cv/CvModal';
import SupportModal from './components/support/SupportModal';
import { liveProducts } from './data/products';

const links = [
  ['Aplikasi', '#produk'],
  ['Myst-Core', '#core'],
  ['Founder', '#founder'],
  ['Kontak', '#kontak'],
];

const brand = (
  <>
    <img src="/myst-mark.svg" alt="" className="h-7 w-7" />
    Myst<span className="-ml-1 text-warmPeach">Tech</span>
  </>
);

const labels = { coffee: 'Traktir kopi', light: 'Mode terang', dark: 'Mode gelap', menu: 'Menu' };

function HubApp() {
  return (
    <div className="bg-warmBg font-body text-warmInk">
      <NavbarSoft links={links} brand={brand} cta={{ label: 'Profil Aidil', href: '/aidil/' }} labels={labels} />
      <main>
        <HeroHub />
        <ProductsHub />
        <CoreHub />
        <FounderHub />
        <ContactHub />
      </main>
      <FooterSoft
        brand={brand}
        tagline="Aplikasi AI untuk pendidikan & komunitas · Balikpapan, Indonesia"
        copyright="Myst Tech · Aidil Saputra Kirsan."
        coffeeLabel={labels.coffee}
      >
        <nav aria-label="Semua aplikasi" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
          {liveProducts().map((p) => (
            <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className="font-body text-sm font-medium text-warmMuted hover:text-warmInk">
              {p.title}
            </a>
          ))}
          <a href="https://myst-tech.com/myst-core/" target="_blank" rel="noreferrer" className="font-body text-sm font-medium text-warmMuted hover:text-warmInk">
            Myst-Core Docs
          </a>
          <a href="/aidil/" className="font-body text-sm font-medium text-warmMuted hover:text-warmInk">
            Profil Founder
          </a>
        </nav>
      </FooterSoft>
      <CvModal />
      <SupportModal />
    </div>
  );
}

export default HubApp;
