/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiFileText, FiAward, FiHeart, FiBookOpen, FiExternalLink } from 'react-icons/fi';
import Counter from '../ui/Counter';
import {
  academicProfiles,
  researchInterests,
  publications,
  researchGrants,
  communityService,
  teaching,
} from '../../data/research';
import { productsData } from '../../data/products';

const typeLabel = { journal: 'Journal', conference: 'Conference', community: 'Community service' };
const typeTint = {
  journal: 'bg-warmSkySoft text-warmSky',
  conference: 'bg-warmPeachSoft text-warmPeach',
  community: 'bg-warmSageSoft text-warmSage',
};

const tabs = [
  { id: 'pubs', label: 'Publications', Icon: FiFileText, count: publications.length },
  { id: 'grants', label: 'Research grants', Icon: FiAward, count: researchGrants.length },
  { id: 'service', label: 'Community service', Icon: FiHeart, count: communityService.length },
  { id: 'teaching', label: 'Teaching', Icon: FiBookOpen, count: teaching.length },
];

const aiProducts = productsData.filter((p) => p.ai && p.status === 'live');

function Row({ year, title, sub, tag, tint, url, extra }) {
  const Wrapper = url ? 'a' : 'div';
  return (
    <Wrapper
      {...(url ? { href: url, target: '_blank', rel: 'noreferrer' } : {})}
      className={`group flex flex-col gap-2 rounded-2xl border border-warmLine bg-warmCard px-5 py-4 shadow-soft transition-all duration-300 md:flex-row md:items-center md:gap-5 md:px-6 ${
        url ? 'hover:-translate-y-0.5 hover:shadow-soft-lg' : ''
      }`}
    >
      <span className="shrink-0 font-body text-xs font-bold text-warmMuted md:w-12">{year ?? '—'}</span>
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-[15px] font-bold leading-snug">{title}</h4>
        {sub && <p className="mt-1 font-body text-sm text-warmMuted">{sub}</p>}
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {extra}
        {tag && <span className={`rounded-full px-2.5 py-0.5 font-body text-[11px] font-semibold ${tint}`}>{tag}</span>}
        {url && <FiArrowUpRight className="text-warmMuted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warmPeach" />}
      </div>
    </Wrapper>
  );
}

function ResearchSoft() {
  const [active, setActive] = useState('pubs');

  return (
    <section id="research" className="relative overflow-hidden bg-warmBg py-24 text-warmInk md:py-32">
      <div className="container mx-auto max-w-[1100px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">Research</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">From sensor networks to AI in the classroom.</h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-warmMuted">
              Research that started in wireless sensor networks and IoT — and now continues in applied AI,
              tested in real classrooms through the products I build.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {researchInterests.map((r) => (
                <span key={r} className="rounded-full border border-warmLine bg-warmCard px-3.5 py-1.5 font-body text-sm font-medium">
                  {r}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Academic profiles */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-warmLine bg-warmCard p-6 shadow-soft lg:col-span-5"
          >
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-warmMuted">Academic profiles</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {academicProfiles.map((a) => (
                <a
                  key={a.label}
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-2 rounded-2xl border border-warmLine bg-warmBg px-4 py-3 font-body text-sm font-semibold transition-colors hover:border-warmPeach hover:text-warmPeach"
                >
                  {a.label}
                  <FiExternalLink className="text-warmMuted group-hover:text-warmPeach" />
                </a>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-warmLine pt-5 text-center">
              {[
                [publications.length, 'publications'],
                [researchGrants.length, 'grants'],
                [communityService.length, 'service'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-bold">
                    <Counter to={n} />
                  </div>
                  <div className="font-body text-xs text-warmMuted">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Research → product bridge */}
        {aiProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col gap-3 rounded-3xl bg-warmInk px-6 py-5 text-warmBg sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="font-body text-sm leading-relaxed">
              <span className="font-semibold text-warmPeach">Now applying:</span> AI-assisted assessment & feedback in real classrooms —{' '}
              {aiProducts.map((p) => p.title).join(', ')}.
            </p>
            <a href="/#produk" className="inline-flex shrink-0 items-center gap-1 font-body text-sm font-semibold text-warmPeach hover:underline">
              See the products <FiArrowUpRight />
            </a>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Research categories">
          {tabs.map(({ id, label, Icon, count }) => {
            const on = active === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors ${on ? 'text-warmBg' : 'text-warmMuted hover:text-warmInk'}`}
              >
                {on && <motion.span layoutId="researchPill" className="absolute inset-0 rounded-full bg-warmInk" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <Icon className="relative z-10" />
                <span className="relative z-10">{label}</span>
                <span className={`relative z-10 rounded-full px-1.5 text-[11px] ${on ? 'bg-warmBg/20' : 'bg-warmCard'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-6 flex flex-col gap-3"
          >
            {active === 'pubs' &&
              publications.map((p) => (
                <Row
                  key={p.title}
                  year={p.year}
                  title={p.title}
                  sub={p.venue}
                  tag={typeLabel[p.type]}
                  tint={typeTint[p.type]}
                  url={p.url}
                  extra={
                    p.indexing && (
                      <span className="rounded-full bg-warmBg px-2.5 py-0.5 font-body text-[11px] font-semibold text-warmMuted ring-1 ring-warmLine">
                        {p.indexing}
                      </span>
                    )
                  }
                />
              ))}
            {active === 'grants' &&
              researchGrants.map((g) => <Row key={g.title} year={g.year} title={g.title} sub={g.funder} tag="Research" tint={typeTint.journal} url={g.url} />)}
            {active === 'service' &&
              communityService.map((c) => (
                <Row key={c.title} year={c.year} title={c.title} sub={c.partner} tag="Pengabdian" tint={typeTint.community} url={c.url} />
              ))}
            {active === 'teaching' && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {teaching.map((t) => (
                  <div key={t} className="flex items-center gap-3 rounded-2xl border border-warmLine bg-warmCard px-5 py-4 shadow-soft">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-warmPeachSoft text-warmPeach">
                      <FiBookOpen />
                    </span>
                    <span className="font-display text-[15px] font-bold">{t}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ResearchSoft;
