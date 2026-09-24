// Single source of truth for time-based, auto-updating values.
import { projectsData } from './projects';
import { productsData } from './products';
import { experienceData } from './experience';
import { publications } from './research';

// The year your professional career started. Bump ONLY if this fact changes.
export const CAREER_START_YEAR = 2020;

// Years of experience — increases automatically every new year.
export const yearsOfExperience = () => new Date().getFullYear() - CAREER_START_YEAR;

// The year currently considered "in build" (defaults to the current year).
export const buildingYear = () => String(new Date().getFullYear());

// Myst products + works tagged with the current year => what you're
// "currently working on". Products come first.
export const currentProjects = () =>
  [...productsData, ...projectsData].filter((p) => p.year === buildingYear());

// Everything ever shipped (products + works) — "Projects shipped" stat.
export const shippedCount = () => productsData.filter((p) => p.status === 'live').length + projectsData.length;

// Publications count — research stats in the heroes.
export const publicationCount = () => publications.length;

// Roles still held today (period ends in "Present") — powers the rotating
// badge on the hero photo. Update experience.js and the badge follows.
export const currentRoles = () => experienceData.filter((e) => /present/i.test(e.period));

// "A, B, and C" / "A and B" / "A"
export const formatList = (arr) => {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
};
