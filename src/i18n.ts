import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]

const STORAGE_KEY = 'urogynec.locale'

const isLocale = (v: string | null): v is Locale => !!v && (locales as readonly string[]).includes(v)

const stored = localStorage.getItem(STORAGE_KEY)
const preferred: Locale = isLocale(stored)
  ? stored
  : navigator.language.toLowerCase().startsWith('es')
    ? 'es'
    : 'en'

export const i18n = createI18n({
  legacy: false,
  locale: preferred,
  fallbackLocale: 'en',
  messages: { en, es },
})

/** Keep the document itself translated, not just the rendered app. */
function applyDocumentLocale(locale: Locale) {
  const messages = { en, es }[locale]
  document.documentElement.lang = locale
  document.title = messages.meta.title
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', messages.meta.description)
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', messages.meta.ogLocale)
}

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  applyDocumentLocale(locale)
}

applyDocumentLocale(preferred)
