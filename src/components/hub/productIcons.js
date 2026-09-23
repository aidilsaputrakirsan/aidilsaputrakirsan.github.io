// Icon keys used by `icon` in src/data/products.js.
// Add a new key here if a new product needs a different icon
// (browse names at https://react-icons.github.io/react-icons/icons/lu/).
import { LuBookOpen, LuFileSearch, LuGraduationCap, LuHouse, LuBot, LuSparkles } from 'react-icons/lu';

const icons = {
  book: LuBookOpen,
  'file-search': LuFileSearch,
  graduation: LuGraduationCap,
  house: LuHouse,
  bot: LuBot,
};

export const productIcon = (key) => icons[key] ?? LuSparkles;
