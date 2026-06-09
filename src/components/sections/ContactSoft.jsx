/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiInstagram, FiSend } from 'react-icons/fi';

const info = [
  { icon: FiMail, label: 'Email', value: 'aidil@lecturer.itk.ac.id', href: 'mailto:aidil@lecturer.itk.ac.id' },
  { icon: FiPhone, label: 'Phone', value: '+62 853 9895 xxxx', href: 'tel:+6285398950000' },
  { icon: FiMapPin, label: 'Location', value: 'Balikpapan, Indonesia', href: null },
  { icon: FiInstagram, label: 'Instagram', value: '@aidilsaputrakirsan', href: 'https://instagram.com/aidilsaputrakirsan' },
];

function ContactSoft() {
  const [sent, setSent] = useState(false);
  const handle = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-warmCard py-24 md:py-32 text-warmInk">
      {/* soft drifting blob */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-warmPeachSoft blur-3xl opacity-60"
      />

      <div className="relative z-10 container mx-auto px-6 max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">Contact</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Let's build something together.</h2>
            <p className="mt-5 max-w-md font-body text-lg text-warmMuted leading-relaxed">
              Open for collaborations, consulting, and speaking. Drop a message and I'll get back to you soon.
            </p>

            <div className="mt-10 space-y-4">
              {info.map((it) => (
                <div key={it.label} className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warmPeachSoft text-warmPeach"><it.icon className="text-lg" /></span>
                  <div>
                    <div className="font-body text-xs font-semibold uppercase tracking-wider text-warmMuted">{it.label}</div>
                    {it.href ? (
                      <a href={it.href} className="font-body font-semibold text-warmInk hover:text-warmPeach">{it.value}</a>
                    ) : (
                      <div className="font-body font-semibold text-warmInk">{it.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              {[
                [FiGithub, 'https://github.com/aidilsaputrakirsan'],
                [FiLinkedin, 'https://id.linkedin.com/in/aidil-saputra-kirsan-0808911bb'],
                [FiInstagram, 'https://instagram.com/aidilsaputrakirsan'],
              ].map(([Icon, href], i) => (
                <motion.a key={i} href={href} target="_blank" rel="noreferrer" whileHover={{ y: -4 }} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-warmLine bg-warmBg text-warmInk hover:border-warmPeach hover:text-warmPeach">
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handle}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-warmLine bg-warmBg p-7 md:p-8 shadow-soft"
          >
            {sent && <div className="mb-5 rounded-2xl bg-warmSageSoft px-4 py-3 font-body text-sm font-semibold text-warmSage">Message sent! I'll reply soon. ✦</div>}
            {['name', 'email', 'subject'].map((f) => (
              <div key={f} className="mb-4">
                <label className="mb-1.5 block font-body text-sm font-semibold capitalize text-warmInk">{f}</label>
                <input
                  type={f === 'email' ? 'email' : 'text'}
                  required
                  placeholder={`Your ${f}`}
                  className="w-full rounded-2xl border border-warmLine bg-warmCard px-4 py-3 font-body text-warmInk outline-none transition-colors placeholder:text-warmMuted/60 focus:border-warmPeach"
                />
              </div>
            ))}
            <div className="mb-5">
              <label className="mb-1.5 block font-body text-sm font-semibold text-warmInk">Message</label>
              <textarea required rows="4" placeholder="Your message" className="w-full resize-none rounded-2xl border border-warmLine bg-warmCard px-4 py-3 font-body text-warmInk outline-none transition-colors placeholder:text-warmMuted/60 focus:border-warmPeach" />
            </div>
            <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-warmInk px-7 py-3.5 font-body font-semibold text-warmBg shadow-soft hover:shadow-soft-lg">
              Send message <FiSend />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default ContactSoft;
