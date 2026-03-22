import type { Locale } from './utils';

export interface ProjectsAddedForms {
  one: string;
  few?: string;
  many?: string;
  other: string;
}

export function getProjectsAddedLabel(
  count: number,
  locale: Locale,
  forms: ProjectsAddedForms
): string {
  const category = new Intl.PluralRules(locale).select(count);
  switch (category) {
    case 'one':
      return forms.one;
    case 'few':
      return forms.few ?? forms.other;
    case 'many':
      return forms.many ?? forms.other;
    case 'two':
    case 'zero':
    default:
      return forms.other;
  }
}
