// Single source of truth for time-based, auto-updating values.
import { projectsData } from './projects';
import { experienceData } from './experience';

// The year your professional career started. Bump ONLY if this fact changes.
export const CAREER_START_YEAR = 2020;

// Years of experience — increases automatically every new year.
export const yearsOfExperience = () => new Date().getFullYear() - CAREER_START_YEAR;

// The year currently considered "in build" (defaults to the current year).
export const buildingYear = () => String(new Date().getFullYear());

// Projects tagged with the current year => what you're "currently working on".
export const currentProjects = () => projectsData.filter((p) => p.year === buildingYear());

// Roles still held today (period ends in "Present") — powers the rotating
// badge on the hero photo. Update experience.js and the badge follows.
export const currentRoles = () => experienceData.filter((e) => /present/i.test(e.period));

// "A, B, and C" / "A and B" / "A"
export const formatList = (arr) => {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
};
