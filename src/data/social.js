// Instagram = where the free IT lessons live (Information Systems courses + AI).
// Highlighted on both pages by InstagramSoft.jsx, plus the footer and the profile hero.
import { teaching } from './research';

export const instagram = {
  handle: 'aidilsaputrakirsan',
  url: 'https://www.instagram.com/aidilsaputrakirsan/',
  // Optional, e.g. '2.4K' — shown next to the handle. Update by hand; leave null to hide.
  followers: null,
  // AI topics shown before the course chips.
  aiTopics: [
    { en: 'AI for students & lecturers', id: 'AI untuk mahasiswa & dosen' },
    'Prompt engineering',
    { en: 'Building AI apps', id: 'Membangun aplikasi AI' },
  ],
  // Optional favourite posts → grid of thumbnails linking to each post.
  // { image: '/images/instagram/<name>.jpg' (square, ≤600px, compressed), url, caption: { en, id } }
  // Empty → the grid is simply hidden.
  posts: [],
};

// Course chips come from the PDDikti teaching history, so new courses appear
// automatically. Current courses first.
export const instagramCourseTopics = (limit = 9) =>
  [...teaching].sort((a, b) => Number(b.current) - Number(a.current)).slice(0, limit).map((c) => c.name);
