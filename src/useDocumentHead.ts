import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.append(el)
  }
  el.content = value
}

/**
 * Keeps the document head in step with the active language.
 *
 * This site is a single route, so there is no per-page meta to define: what
 * varies here is language, not page. Add vue-router and @unhead/vue becomes
 * the right tool, and this composable is what it replaces.
 *
 * Only Google runs JavaScript before indexing. Social crawlers (WhatsApp,
 * Facebook, LinkedIn, X) read the static tags in index.html and never see
 * these, so index.html stays the source of truth for sharing.
 */
export function useDocumentHead() {
  const { t, locale } = useI18n()

  watchEffect(() => {
    document.documentElement.lang = locale.value
    document.title = t('meta.title')
    setMeta('name', 'description', t('meta.description'))
    setMeta('property', 'og:title', t('meta.title'))
    setMeta('property', 'og:description', t('meta.description'))
    setMeta('property', 'og:locale', t('meta.ogLocale'))
  })
}
