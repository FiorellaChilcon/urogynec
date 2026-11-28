<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { sets, specialties } from '../data/sets'
import { showSpecialty } from '../catalogueFilter'

const { t, tm, rt } = useI18n()
const lines = (key: string) => (tm(key) as unknown as string[]).map((l) => rt(l))

const countFor = (specialty: string) =>
  computed(() => sets.filter((s) => s.specialty === specialty).length)
const counts = Object.fromEntries(specialties.map((s) => [s, countFor(s)]))
</script>

<template>
  <section id="specialties" aria-labelledby="specialties-title" class="bg-drape-900 py-section">
    <div class="page">
      <h2 id="specialties-title" class="text-section">{{ t('specialties.title') }}</h2>

      <div class="mt-8 grid gap-px border border-drape-line bg-drape-line md:grid-cols-2 lg:mt-14">
        <article
          v-for="(sp, i) in specialties"
          :key="sp"
          class="flex flex-col gap-4 p-6 sm:p-10"
          :class="i === 0 ? 'bg-drape-800' : 'bg-drape-900'"
        >
          <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3
              class="text-[clamp(1.4rem,1rem+1.4vw,2rem)] tracking-[-0.03em]"
              :class="i === 0 ? 'text-teal-400' : ''"
            >
              {{ t(`specialties.${sp}Title`) }}
            </h3>
            <span class="code text-label text-on-drape-dim uppercase">
              {{ t('catalogue.results', counts[sp].value) }}
            </span>
          </div>

          <p class="max-w-[42ch] text-on-drape-dim">{{ t(`specialties.${sp}Lead`) }}</p>

          <ul class="mt-1 flex flex-wrap gap-1.5">
            <li
              v-for="l in lines(`specialties.${sp}Lines`)"
              :key="l"
              class="border border-drape-line px-2.5 py-1 text-[0.84rem] text-on-drape"
            >
              {{ l }}
            </li>
          </ul>

          <button
            type="button"
            class="mt-auto cursor-pointer self-start border-b border-transparent pt-5 text-left font-[560] text-teal-400 transition-colors hover:border-teal-400"
            @click="showSpecialty(sp)"
          >
            {{ t(`specialties.${sp}Cta`) }} →
          </button>
        </article>
      </div>
    </div>
  </section>
</template>
