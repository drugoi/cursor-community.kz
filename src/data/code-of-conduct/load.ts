import type { Locale } from '../../i18n/utils';
import en from './en.json';
import kk from './kk.json';
import ru from './ru.json';

const byLocale = { en, kk, ru } as const;

export type CodeOfConductData = typeof en;

/** Localized URL paths for the Code of Conduct page (with trailing slashes). */
export const conductPathsByLocale: Record<Locale, string> = {
  ru: '/conduct/',
  kk: '/kk/conduct/',
  en: '/en/conduct/',
};

export function getCodeOfConduct(locale: Locale): CodeOfConductData {
  return byLocale[locale];
}
