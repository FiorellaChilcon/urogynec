<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { whatsappLink } from '../data/contact'

const { t, tm, rt } = useI18n()
const lines = (key: string) => (tm(key) as unknown as string[]).map((l) => rt(l))
</script>

<template>
  <section id="specialties" aria-labelledby="specialties-title" class="bg-drape-900 py-section">
    <div class="page">
      <h2 id="specialties-title" class="text-section">{{ t('specialties.title') }}</h2>

      <div class="mt-8 grid gap-px border border-drape-line bg-drape-line md:grid-cols-2 lg:mt-14">
        <article class="flex flex-col gap-4 bg-drape-800 p-6 sm:p-10">
          <h3 class="text-[clamp(1.4rem,1rem+1.4vw,2rem)] tracking-[-0.03em] text-teal-400">
            {{ t('specialties.urologyTitle') }}
          </h3>
          <p class="max-w-[42ch] text-on-drape-dim">{{ t('specialties.urologyLead') }}</p>
          <ul class="mt-1 flex flex-wrap gap-1.5">
            <li
              v-for="l in lines('specialties.urologyLines')"
              :key="l"
              class="border border-drape-line px-2.5 py-1 text-[0.84rem] text-on-drape"
            >
              {{ l }}
            </li>
          </ul>
          <a
            class="mt-auto self-start border-b border-transparent pt-5 font-[560] text-teal-400 no-underline transition-colors hover:border-teal-400"
            href="#catalogue"
          >
            {{ t('hero.ctaCatalogue') }} →
          </a>
        </article>

        <article class="flex flex-col gap-4 bg-drape-900 p-6 sm:p-10">
          <h3 class="text-[clamp(1.4rem,1rem+1.4vw,2rem)] tracking-[-0.03em]">
            {{ t('specialties.gynecologyTitle') }}
          </h3>
          <p class="max-w-[42ch] text-on-drape-dim">{{ t('specialties.gynecologyLead') }}</p>
          <ul class="mt-1 flex flex-wrap gap-1.5">
            <li
              v-for="l in lines('specialties.gynecologyLines')"
              :key="l"
              class="border border-dashed border-drape-line px-2.5 py-1 text-[0.84rem] text-on-drape-dim"
            >
              {{ l }}
            </li>
          </ul>
          <a
            class="mt-auto self-start border-b border-transparent pt-5 font-[560] text-teal-400 no-underline transition-colors hover:border-teal-400"
            :href="whatsappLink(t('contact.messageGyn'))"
            target="_blank"
            rel="noopener"
          >
            {{ t('specialties.gynecologyCta') }} →
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
