export type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end: string;
  highlights: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type EducationItem = {
  institution: string;
  program: string;
  date: string;
  notes: string[];
};

export type ResumeSiteData = {
  headline: string;
  summary: string;
  experience: ExperienceItem[];
  skills: SkillGroup[];
  education: EducationItem[];
};