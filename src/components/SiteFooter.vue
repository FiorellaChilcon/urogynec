<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
const pdfUrl = `${import.meta.env.BASE_URL}techno-standard-urology-catalogue-2026.pdf`
</script>

<template>
  <footer class="border-t border-drape-line bg-drape-900 py-10">
    <nav class="page mb-6 border-b border-drape-line pb-6 md:hidden" :aria-label="t('nav.primary')">
      <ul class="flex flex-wrap gap-x-6 gap-y-3 text-[0.88rem]">
        <li v-for="item in ['catalogue', 'specialties', 'company', 'contact']" :key="item">
          <a
            :href="`#${item}`"
            class="border-b border-transparent no-underline transition-colors hover:border-teal-400"
          >
            {{ t(`nav.${item}`) }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="page flex flex-wrap items-baseline gap-x-8 gap-y-2 text-[0.82rem] text-on-drape-dim">
      <p><span class="tabular-nums">© {{ year }}</span> {{ t('footer.rights') }}</p>
      <a
        class="ml-auto border-b border-transparent text-teal-400 no-underline transition-colors hover:border-teal-400"
        :href="pdfUrl"
        download
      >
        {{ t('footer.pdf') }} ↓
      </a>
    </div>
  </footer>
</template>
