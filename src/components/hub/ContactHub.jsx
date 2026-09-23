/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiMail, FiMessageCircle, FiInstagram } from 'react-icons/fi';
import { useLang } from '../../i18n/LangContext';

// Phone number is the one already printed on every product poster.
const WHATSAPP = 'https://wa.me/6285398952880';
const EMAIL = 'aidil@lecturer.itk.ac.id';

function ContactHub() {
  const { t } = useLang();
  return (
    <section id="kontak" className="bg-warmCard py-20 text-warmInk md:py-28">
      <div className="container mx-auto max-w-[1100px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-warmInk px-7 py-12 text-warmBg shadow-soft-lg md:px-14 md:py-16"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-warmPeach opacity-40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-warmSky opacity-30 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">{t({ en: 'Contact', id: 'Kontak' })}</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                {t({ en: 'Want to try it at your school, campus, or neighborhood?', id: 'Mau coba di sekolah, kampus, atau RT Anda?' })}
              </h2>
              <p className="mt-4 max-w-lg font-body text-lg leading-relaxed opacity-80">
                {t({
                  en: 'Free demo and onboarding help. Reach out directly — usually answered the same day.',
                  id: 'Demo gratis dan pendampingan awal. Hubungi langsung — biasanya dibalas di hari yang sama.',
                })}
              </p>
            </div>
            <div className="flex flex-col gap-3 md:col-span-2">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#22C55E] px-6 py-3.5 font-body font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <FiMessageCircle /> WhatsApp 0853-9895-2880
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-warmBg/25 px-6 py-3.5 font-body font-semibold transition-colors hover:bg-warmBg/10"
              >
                <FiMail /> {EMAIL}
              </a>
              <a
                href="https://instagram.com/aidilsaputrakirsan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 font-body text-sm font-semibold opacity-80 transition-opacity hover:opacity-100"
              >
                <FiInstagram /> @aidilsaputrakirsan
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactHub;
