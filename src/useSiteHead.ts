import { computed } from 'vue'
import { useSeoMeta, useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const SITE_URL = 'https://fiorellachilcon.github.io/urogynec/'

/**
 * Head management for the one route this site has. What varies here is
 * language, not page, so every field is a computed on the active locale.
 *
 * Social crawlers do not execute JavaScript, so index.html keeps a static
 * copy of these tags; unhead reconciles them rather than duplicating them.
 */
export function useSiteHead() {
  const { t, locale } = useI18n()

  const title = computed(() => t('meta.title'))
  const description = computed(() => t('meta.description'))

  useHead({
    htmlAttrs: { lang: locale },
    link: [{ rel: 'canonical', href: SITE_URL }],
  })

  useSeoMeta({
    title,
    description,
    ogType: 'website',
    ogSiteName: 'Urogynec Instruments',
    ogUrl: SITE_URL,
    ogTitle: title,
    ogDescription: description,
    ogLocale: computed(() => t('meta.ogLocale')),
    ogLocaleAlternate: computed(() => (locale.value === 'es' ? 'en_US' : 'es_ES')),
    ogImage: {
      url: `${SITE_URL}og.png`,
      width: 1200,
      height: 630,
      alt: 'Urogynec Instruments: a urethro-cystoscopy set laid out on a lit tray',
    },
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${SITE_URL}og.png`,
  })
}
