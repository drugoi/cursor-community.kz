/**
 * Pre-defined tags for #builtwithcursor projects.
 * Used in JSON data, UI, and GitHub issue template.
 */
export const PROJECT_TAGS = [
  'tooling',
  'dx',
  'saas',
  'open-source',
  'ai',
  'productivity',
  'prototype',
  'hackathon',
] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number];

export const TAG_LABELS: Record<ProjectTag, string> = {
  tooling: 'Tooling',
  dx: 'DX',
  saas: 'SaaS',
  'open-source': 'Open Source',
  ai: 'AI',
  productivity: 'Productivity',
  prototype: 'Prototype',
  hackathon: 'Hackathon',
};
