import { FiGithub, FiLinkedin, FiArrowUp } from 'react-icons/fi';
import VisitorCounter from '../ui/VisitorCounter';

function FooterSoft() {
  return (
    <footer className="border-t border-warmLine bg-warmBg text-warmInk">
      <div className="container mx-auto px-6 max-w-[1100px] py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <a href="#hero" className="font-display text-xl font-extrabold tracking-tight">
              Aidil<span className="text-warmPeach">.</span>
            </a>
            <p className="mt-1 font-body text-sm text-warmMuted">Full-Stack Developer & Lecturer · Balikpapan, Indonesia</p>
          </div>

          <div className="flex items-center gap-3">
            <VisitorCounter />
            <a href="https://github.com/aidilsaputrakirsan" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warmLine hover:border-warmPeach hover:text-warmPeach"><FiGithub /></a>
            <a href="https://id.linkedin.com/in/aidil-saputra-kirsan-0808911bb" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warmLine hover:border-warmPeach hover:text-warmPeach"><FiLinkedin /></a>
            <a href="#hero" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-warmInk text-warmBg hover:-translate-y-0.5 transition-transform"><FiArrowUp /></a>
          </div>
        </div>

        <div className="mt-8 border-t border-warmLine pt-6 text-center font-body text-sm text-warmMuted">
          © {new Date().getFullYear()} Aidil Saputra Kirsan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default FooterSoft;
