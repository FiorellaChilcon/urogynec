<script setup lang="ts">
import markUrl from '../assets/logo-mark-reverse.svg?url'
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { locales, setLocale, type Locale } from '../i18n'

const { locale, t } = useI18n()
const scrolled = ref(false)

const onScroll = () => (scrolled.value = window.scrollY > 24)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b bg-drape-900 transition-colors duration-300"
    :class="scrolled ? 'border-drape-line' : 'border-transparent'"
  >
    <div class="page flex min-h-18 items-center gap-4 md:gap-8 lg:gap-12">
      <a class="mr-auto flex items-center gap-3 no-underline" href="#top">
        <img :src="markUrl" alt="" width="1334" height="1025" class="h-9 w-auto sm:h-10" />
        <span class="flex flex-col leading-none">
          <strong class="text-[0.98rem] font-[640] tracking-[0.03em] uppercase">{{ t('brand.name') }}</strong>
          <span class="mt-1 text-[0.58rem] tracking-[0.22em] text-teal-400 uppercase">
            {{ t('brand.nameSecond') }}
          </span>
        </span>
      </a>

      <nav class="hidden gap-4 text-sm md:flex lg:gap-7" :aria-label="t('nav.primary')">
        <a
          v-for="item in ['catalogue', 'specialties', 'company', 'contact']"
          :key="item"
          :href="`#${item}`"
          class="border-b border-transparent py-1.5 text-on-drape-dim no-underline transition-colors hover:border-teal-500 hover:text-on-drape"
        >
          {{ t(`nav.${item}`) }}
        </a>
      </nav>

      <div class="flex border border-drape-line" role="group" :aria-label="t('lang.label')">
        <button
          v-for="code in locales"
          :key="code"
          type="button"
          class="cursor-pointer px-2.5 py-1.5 text-xs font-[560] tracking-[0.09em] transition-colors not-first:border-l not-first:border-drape-line"
          :class="
            locale === code ? 'bg-teal-500 text-[#04161c]' : 'text-on-drape-dim hover:text-on-drape'
          "
          :aria-pressed="locale === code"
          @click="setLocale(code as Locale)"
        >
          {{ t(`lang.${code}`) }}
        </button>
      </div>
    </div>
  </header>
</template>
