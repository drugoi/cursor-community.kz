// src/i18n/utils.ts
import ru from './ru.json';
import kk from './kk.json';
import en from './en.json';

const dictionaries = { ru, kk, en } as const;

export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = 'ru';
export const locales: Locale[] = ['ru', 'kk', 'en'];

export function getDict(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const segment = url.pathname.split('/')[1];
  if (segment && locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
}

export function localizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}
