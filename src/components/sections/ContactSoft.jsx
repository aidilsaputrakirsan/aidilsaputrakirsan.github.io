/* eslint-disable no-unused-vars */
// Personal contact strip for /aidil/. Every item is a real, working link — there is
// deliberately no form (it had no backend). App / Myst Tech enquiries go to the hub.
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiInstagram, FiGithub, FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLang } from '../../i18n/LangContext';

const channels = [
  { Icon: FiMail, label: 'Email', value: 'aidil@lecturer.itk.ac.id', href: 'mailto:aidil@lecturer.itk.ac.id' },
  { Icon: FaWhatsapp, label: 'WhatsApp', value: '+62 853 9895 2880', href: 'https://wa.me/6285398952880' },
  { Icon: FiLinkedin, label: 'LinkedIn', value: 'Aidil Saputra Kirsan', href: 'https://id.linkedin.com/in/aidil-saputra-kirsan-0808911bb' },
  { Icon: FiInstagram, label: 'Instagram', value: '@aidilsaputrakirsan', href: 'https://instagram.com/aidilsaputrakirsan' },
  { Icon: FiGithub, label: 'GitHub', value: 'aidilsaputrakirsan', href: 'https://github.com/aidilsaputrakirsan' },
];

function ContactSoft() {
  const { t } = useLang();

  return (
    <section id="contact" className="relative overflow-hidden bg-warmCard py-24 md:py-28 text-warmInk">
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full bg-warmPeachSoft opacity-60 blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-[1100px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">{t({ en: 'Contact', id: 'Kontak' })}</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{t({ en: "Let's build something together.", id: 'Mari membangun sesuatu bersama.' })}</h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-warmMuted">
            {t({
              en: 'Open for research collaboration, consulting, and speaking. Reach me directly on any of these.',
              id: 'Terbuka untuk kolaborasi riset, konsultasi, dan menjadi pembicara. Hubungi saya langsung lewat salah satu di bawah ini.',
            })}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {channels.map(({ Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-3 rounded-2xl border border-warmLine bg-warmBg p-4 transition-colors hover:border-warmPeach lg:flex-col lg:items-start"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-warmPeachSoft text-lg text-warmPeach">
                <Icon />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-wider text-warmMuted">
                  {label}
                  <FiArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="block truncate font-body text-sm font-semibold text-warmInk group-hover:text-warmPeach">{value}</span>
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 font-body text-sm text-warmMuted sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2">
            <FiMapPin className="text-warmPeach" /> Balikpapan, Indonesia
          </span>
          <a href="/#kontak" className="inline-flex items-center gap-1 font-semibold text-warmInk hover:text-warmPeach">
            {t({ en: 'About a Myst Tech app? Contact Myst Tech', id: 'Soal aplikasi Myst Tech? Hubungi Myst Tech' })} <FiArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSoft;
