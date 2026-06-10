import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiInstagram, FiGlobe } from 'react-icons/fi';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { achievementsData } from '../../data/achievements';
import { projectsData } from '../../data/projects';
import { yearsOfExperience } from '../../data/site';

const profile =
  `Full-Stack Developer and Information System Lecturer based in Balikpapan, Indonesia, with ${yearsOfExperience()}+ years of experience building dynamic, scalable digital products while teaching the next generation of IT professionals and leading FSTI's Digital Innovation Laboratory at Institut Teknologi Kalimantan. Specialized in web development, IoT, and educational technology.`;

const skillGroups = [
  { label: 'Frontend', items: 'React, Vue.js, Next.js, Tailwind CSS, Three.js' },
  { label: 'Backend', items: 'Laravel, Node.js, Express, PHP, Python, REST API' },
  { label: 'Database', items: 'PostgreSQL, MySQL, MongoDB, Redis' },
  { label: 'IoT & Networking', items: 'ESP32, Arduino, MQTT, WSN, Network Security' },
  { label: 'Architecture & Cloud', items: 'Monolith & Microservices, REST APIs, Docker, CI/CD, AWS, Cloud Deployment' },
  { label: 'Tools', items: 'Git, Linux, Figma, Agile/Scrum' },
];

const contacts = [
  { Icon: FiMail, text: 'aidil@lecturer.itk.ac.id' },
  { Icon: FiMapPin, text: 'Balikpapan, Indonesia' },
  { Icon: FiGlobe, text: 'myst-tech.com' },
  { Icon: FiGithub, text: 'github.com/aidilsaputrakirsan' },
  { Icon: FiLinkedin, text: 'linkedin.com/in/aidil-saputra-kirsan' },
  { Icon: FiInstagram, text: '@aidilsaputrakirsan' },
];

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h2 className="mb-2.5 border-b-2 border-[#E8835A] pb-1 text-[13px] font-bold uppercase tracking-widest text-[#2B2520]">
        {title}
      </h2>
      {children}
    </section>
  );
}

// A4-styled CV built entirely from the site's data files.
function CvDocument() {
  const featured = projectsData.slice(0, 10);

  return (
    <div id="cv-print" className="mx-auto bg-white text-[#2B2520]" style={{ width: '210mm', minHeight: '297mm', padding: '16mm 16mm' }}>
      {/* Header */}
      <header className="mb-6 flex items-center justify-between gap-6 border-b-2 border-[#2B2520] pb-5">
        <div className="flex items-center gap-4">
          <img
            src="/FAidil.png"
            alt="Aidil Saputra Kirsan"
            className="h-[28mm] w-[24mm] shrink-0 rounded-lg object-cover ring-1 ring-[#E8835A]"
          />
          <div>
            <h1 className="text-[28px] font-extrabold leading-none tracking-tight">Aidil Saputra Kirsan</h1>
            <p className="mt-1 text-[13px] font-semibold text-[#E8835A]">Full-Stack Developer & Information System Lecturer</p>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-y-0.5 text-[10.5px]">
          {contacts.map((c, i) => (
            <li key={i} className="flex items-center justify-end gap-1.5 text-[#444]">
              <c.Icon className="text-[#E8835A]" size={11} /> {c.text}
            </li>
          ))}
        </ul>
      </header>

      <Section title="Profile">
        <p className="text-[11.5px] leading-relaxed text-[#444]">{profile}</p>
      </Section>

      <Section title="Experience">
        <div className="flex flex-col gap-3">
          {experienceData.map((e, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[12px] font-bold">{e.title}</h3>
                <span className="text-[10px] font-semibold text-[#888]">{e.period}</span>
              </div>
              <p className="text-[11px] font-medium text-[#E8835A]">{e.company}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#555]">{e.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="flex flex-col gap-3">
          {educationData.map((e, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[12px] font-bold">{e.degree}</h3>
                <span className="text-[10px] font-semibold text-[#888]">{e.period}</span>
              </div>
              <p className="text-[11px] font-medium text-[#E8835A]">{e.institution}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#555]">{e.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Selected Projects">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {featured.map((p) => (
            <div key={p.id}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[11px] font-bold">{p.title}</h3>
                <span className="text-[9.5px] font-semibold text-[#888]">{p.year}</span>
              </div>
              <p className="text-[10px] leading-snug text-[#555]">{p.technologies.slice(0, 4).join(' · ')}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Achievements & Certifications">
        <div className="flex flex-col gap-3">
          {achievementsData.map((a, i) => (
            <div key={i} className="flex items-baseline justify-between gap-3">
              <p className="text-[10.5px]">
                <span className="font-bold">{a.title}</span>
                <span className="text-[#777]"> — {a.organization}</span>
              </p>
              <span className="shrink-0 text-[10px] font-semibold text-[#888]">{a.year}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <div className="flex flex-col gap-1">
          {skillGroups.map((g) => (
            <div key={g.label} className="flex gap-2 text-[10.5px]">
              <span className="w-28 shrink-0 font-bold">{g.label}</span>
              <span className="text-[#555]">{g.items}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default CvDocument;
