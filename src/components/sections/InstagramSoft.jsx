/* eslint-disable no-unused-vars */
// "Learn on Instagram" highlight — used on both the hub (/) and the profile (/aidil/).
// Content lives in src/data/social.js; course chips follow the PDDikti teaching data.
// No Instagram embed script on purpose (heavy, slow on mobile) — static links only.
import { motion } from 'framer-motion';
import { FiInstagram, FiArrowUpRight, FiCpu, FiBookOpen } from 'react-icons/fi';
import InstagramQr from '../ui/InstagramQr';
import { instagram, instagramCourseTopics } from '../../data/social';
import { useLang } from '../../i18n/LangContext';

// Instagram's own gradient — only on the avatar ring, so the brand is recognisable at a glance.
const IG_GRADIENT = 'linear-gradient(45deg, #F58529, #DD2A7B 55%, #8134AF)';

function InstagramSoft({ id = 'instagram' }) {
  const { t } = useLang();
  const courses = instagramCourseTopics();

  return (
    <section id={id} className="relative overflow-hidden bg-warmBg py-20 text-warmInk md:py-28">
      <div className="container mx-auto max-w-[1100px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-warmLine bg-warmCard p-7 shadow-soft-lg md:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-warmPeachSoft opacity-70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-warmSkySoft opacity-60 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">
                <FiInstagram /> {t({ en: 'Learn on Instagram', id: 'Belajar di Instagram' })}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                {t({ en: 'Information Systems lectures, right in your feed.', id: 'Materi kuliah Sistem Informasi, langsung di feed Anda.' })}
              </h2>
              <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-warmMuted">
                {t({
                  en: 'Short, practical lessons from the courses I teach at Institut Teknologi Kalimantan — plus how to actually use AI to learn and to build apps. Free for everyone.',
                  id: 'Materi singkat dan praktis dari mata kuliah yang saya ajar di Institut Teknologi Kalimantan — plus cara memakai AI untuk belajar dan membangun aplikasi. Gratis untuk semua.',
                })}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label={t({ en: 'Topics', id: 'Topik' })}>
                {instagram.aiTopics.map((topic) => (
                  <li key={t(topic)} className="inline-flex items-center gap-1.5 rounded-full bg-warmPeachSoft px-3 py-1 font-body text-xs font-semibold text-warmPeach">
                    <FiCpu /> {t(topic)}
                  </li>
                ))}
                {courses.map((c, i) => (
                  <li key={c.en} className={`${i >= 5 ? 'hidden sm:inline-flex' : 'inline-flex'} items-center gap-1.5 rounded-full border border-warmLine bg-warmBg px-3 py-1 font-body text-xs font-medium text-warmMuted`}>
                    <FiBookOpen className="text-warmSage" /> {t(c)}
                  </li>
                ))}
              </ul>

              <motion.a
                href={instagram.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-warmPeach px-7 py-3.5 font-body font-semibold text-white shadow-soft hover:shadow-soft-lg"
              >
                <FiInstagram className="text-lg" />
                <span className="sm:hidden">{t({ en: 'Follow on Instagram', id: 'Ikuti di Instagram' })}</span>
                <span className="hidden sm:inline">{t({ en: 'Follow', id: 'Ikuti' })} @{instagram.handle}</span>
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>
            </div>

            {/* Profile card — QR only on larger screens (on a phone, the button is quicker) */}
            <a
              href={instagram.url}
              target="_blank"
              rel="noreferrer"
              className="group mx-auto flex w-full max-w-xs flex-col items-center rounded-3xl border border-warmLine bg-warmBg p-6 text-center transition-colors hover:border-warmPeach md:col-span-5"
            >
              <span className="rounded-full p-[3px]" style={{ background: IG_GRADIENT }}>
                <span className="block rounded-full bg-warmBg p-[3px]">
                  <img src="/FAidil.png" alt="" loading="lazy" className="h-20 w-20 rounded-full object-cover object-top" />
                </span>
              </span>
              <span className="mt-3 font-display text-lg font-bold group-hover:text-warmPeach">@{instagram.handle}</span>
              <span className="font-body text-sm text-warmMuted">
                {instagram.followers
                  ? `${instagram.followers} ${t({ en: 'followers', id: 'pengikut' })}`
                  : t({ en: 'IT education · Information Systems & AI', id: 'Edukasi IT · Sistem Informasi & AI' })}
              </span>

              <span className="mt-5 hidden md:block">
                <InstagramQr className="h-40 w-40 rounded-xl shadow-soft ring-1 ring-warmLine" title={`QR code: instagram.com/${instagram.handle}`} />
                <span className="mt-3 block font-body text-xs font-medium text-warmMuted">
                  {t({ en: 'Scan with your phone camera', id: 'Scan pakai kamera HP' })}
                </span>
              </span>
            </a>
          </div>

          {instagram.posts.length > 0 && (
            <div className="relative mt-10 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
              {instagram.posts.map((post, i) => (
                <motion.a
                  key={post.url}
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-warmLine"
                >
                  <img
                    src={post.image}
                    alt={t(post.caption) || ''}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {post.caption && (
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6 font-body text-[11px] font-semibold leading-tight text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {t(post.caption)}
                    </span>
                  )}
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default InstagramSoft;
