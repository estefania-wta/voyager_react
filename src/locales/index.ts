
import { es } from './es';
import { en } from './en';
import { pt } from './pt';

// Objeto con todos los idiomas
export const translations = {
  es,
  en,
  pt,
};


export type Language = 'es' | 'en' | 'pt';


export type Translation = typeof es;
export function getTranslation(lang: Language) {
  return translations[lang];
}