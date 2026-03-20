import projectsData from './builtwithcursor.json';
import { PROJECT_TAGS, TAG_LABELS, type ProjectTag } from './project-tags';

export { TAG_LABELS, type ProjectTag };

const FILE_LINK_RE = /^(https?:\/\/|\/)[^\s]+\.(png|jpe?g|gif|webp|svg|avif)([?#].*)?$/i;

export interface ShowcaseProjectInput {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  startingDate: string;
  builtWithTools?: string[];
  tags?: string[];
  image?: string;
}

export interface ShowcaseProject extends ShowcaseProjectInput {
  builtWithTools: string[];
  tags: ProjectTag[];
}

export function getTagLabel(tag: string): string {
  return TAG_LABELS[tag as ProjectTag] ?? tag;
}

export function loadShowcaseProjects(): ShowcaseProject[] {
  return (projectsData as ShowcaseProjectInput[]).map((project) => {
    if (project.image && !FILE_LINK_RE.test(project.image)) {
      throw new Error(
        `Invalid image link for project "${project.id}". "image" must be a file URL/path (e.g. .png, .jpg, .webp).`
      );
    }
    const tags = Array.isArray(project.tags)
      ? project.tags.filter((t): t is ProjectTag => PROJECT_TAGS.includes(t as ProjectTag))
      : [];
    return {
      ...project,
      builtWithTools: Array.isArray(project.builtWithTools) ? project.builtWithTools : [],
      tags,
    };
  });
}

export function getShowcaseProjectsCount(): number {
  return (projectsData as unknown[]).length;
}
