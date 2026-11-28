<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { families, sets, specialties, type InstrumentSet } from '../data/sets'
import { catalogues } from '../data/catalogues'
import { specialtyFilter } from '../catalogueFilter'
import { useSetLabel } from '../useSetLabel'
import SetCard from './SetCard.vue'
import PlateDialog from './PlateDialog.vue'

const { t } = useI18n()
const { setName, componentName } = useSetLabel()

const query = ref('')
const family = ref<string>('all')
const open = ref<InstrumentSet | null>(null)

/**
 * Fold accents and separators so "histeroscopia", "F1116.3" and "21 Fr" all
 * match what the client actually types. The one regex in the app: the
 * combining-mark range has no non-regex equivalent in the standard library.
 */
const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ\s.,·×/()-]+/g, '')

/** Every searchable string for a set, in the active language. */
const haystack = (s: InstrumentSet) =>
  normalise(
    [
      s.model,
      setName(s),
      t(`family.${s.family}`),
      t(`specialties.${s.specialty}Title`),
      ...(s.fr ?? []).map((g) => `${g}Fr`),
      ...(s.compat ?? []),
      ...s.components.flatMap((c) => [c.code, componentName(c), c.spec ?? '']),
    ].join(' '),
  )

/** Printed catalogue order, urology first. */
const ordered = [...sets].sort(
  (a, b) => a.specialty.localeCompare(b.specialty) * -1 || a.page - b.page,
)

const inSpecialty = computed(() =>
  ordered.filter((s) => specialtyFilter.value === 'all' || s.specialty === specialtyFilter.value),
)

/** Only offer families that exist in the chosen specialty. */
const availableFamilies = computed(() =>
  families.filter((f) => inSpecialty.value.some((s) => s.family === f)),
)

watch(availableFamilies, (list) => {
  if (family.value !== 'all' && !list.includes(family.value as (typeof families)[number])) {
    family.value = 'all'
  }
})

const visible = computed(() => {
  const q = normalise(query.value.trim())
  return inSpecialty.value.filter(
    (s) => (family.value === 'all' || s.family === family.value) && (!q || haystack(s).includes(q)),
  )
})

const downloads = computed(() =>
  catalogues.filter(
    (c) => specialtyFilter.value === 'all' || c.specialty === specialtyFilter.value,
  ),
)
</script>

<template>
  <section id="catalogue" aria-labelledby="catalogue-title" class="bg-plate-050 py-section text-ink-900">
    <div class="page">
      <header class="flex flex-wrap items-end justify-between gap-7 border-b border-plate-line pb-8">
        <div>
          <h2 id="catalogue-title" class="text-section text-ink-900">{{ t('catalogue.title') }}</h2>
          <p class="mt-3.5 max-w-[62ch] text-lead text-ink-500">
            {{ t('catalogue.lead', { sets: sets.length }) }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2.5">
          <a v-for="c in downloads" :key="c.specialty" class="btn btn-light flex-wrap" :href="c.url" download>
            {{ t(`catalogue.download.${c.specialty}`) }}
            <span class="code text-label tracking-[0.06em] text-ink-500">
              {{ t('catalogue.pdfMeta', { pages: c.pages, mb: c.mb }) }}
            </span>
          </a>
        </div>
      </header>

      <div
        class="sticky top-18 z-20 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-plate-line bg-plate-050 py-4.5"
      >
        <div class="flex border border-plate-line" role="group" :aria-label="t('catalogue.specialtyLabel')">
          <button
            type="button"
            class="seg"
            :class="specialtyFilter === 'all' ? 'seg-on' : ''"
            :aria-pressed="specialtyFilter === 'all'"
            @click="specialtyFilter = 'all'"
          >
            {{ t('catalogue.all') }}
          </button>
          <button
            v-for="sp in specialties"
            :key="sp"
            type="button"
            class="seg not-first:border-l not-first:border-plate-line"
            :class="specialtyFilter === sp ? 'seg-on' : ''"
            :aria-pressed="specialtyFilter === sp"
            @click="specialtyFilter = sp"
          >
            {{ t(`specialties.${sp}Title`) }}
          </button>
        </div>

        <div
          class="-mx-page flex gap-1.5 overflow-x-auto px-page [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          role="group"
          :aria-label="t('catalogue.familyLabel')"
        >
          <button
            type="button"
            class="chip"
            :class="family === 'all' ? 'chip-on' : ''"
            :aria-pressed="family === 'all'"
            @click="family = 'all'"
          >
            {{ t('catalogue.allFamilies') }}
          </button>
          <button
            v-for="f in availableFamilies"
            :key="f"
            type="button"
            class="chip"
            :class="family === f ? 'chip-on' : ''"
            :aria-pressed="family === f"
            @click="family = f"
          >
            {{ t(`family.${f}`) }}
          </button>
        </div>

        <div
          class="relative flex max-w-96 flex-1 basis-60 items-center border border-plate-line bg-plate-000 transition-colors focus-within:border-teal-500"
        >
          <label class="sr-only" for="catalogue-search">{{ t('catalogue.searchLabel') }}</label>
          <svg class="ml-2.5 shrink-0 text-ink-500" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <circle cx="11" cy="11" r="6.4" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M15.8 15.8L21 21" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <input
            id="catalogue-search"
            v-model="query"
            type="search"
            autocomplete="off"
            :placeholder="t('catalogue.searchPlaceholder')"
            class="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-sm text-ink-900 outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            v-if="query"
            type="button"
            class="mr-1 cursor-pointer px-2.5 py-1 text-[0.76rem] text-ink-500 hover:text-ink-900"
            @click="query = ''"
          >
            {{ t('catalogue.clear') }}
          </button>
        </div>

        <p class="ml-auto text-sm tabular-nums text-ink-500" aria-live="polite">
          {{ t('catalogue.results', visible.length) }}
        </p>
      </div>

      <ul
        v-if="visible.length"
        class="mt-8 grid items-stretch gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,27rem),1fr))]"
      >
        <SetCard
          v-for="(s, i) in visible"
          :key="s.id"
          :set="s"
          :index="i"
          :feature="i === 0 && family === 'all' && !query"
          :class="i === 0 && family === 'all' && !query ? 'lg:col-span-2' : ''"
          @open="open = $event"
        />
      </ul>

      <p
        v-else
        class="mt-12 flex flex-col gap-1.5 border border-dashed border-plate-line bg-plate-000 p-10 text-center text-ink-500"
      >
        <strong class="font-semibold text-ink-900">{{ t('catalogue.empty', { query }) }}</strong>
        <span>{{ t('catalogue.emptyHint') }}</span>
      </p>
    </div>

    <PlateDialog :set="open" @close="open = null" />
  </section>
</template>

<style scoped>
@reference '../styles/base.css';

.chip {
  @apply cursor-pointer border border-plate-line bg-transparent px-3 py-1.5 text-sm whitespace-nowrap text-ink-700 transition-colors hover:border-ink-500;
}

.chip-on {
  @apply border-drape-800 bg-drape-800 text-on-drape;
}

.seg {
  @apply cursor-pointer bg-transparent px-3.5 py-1.5 text-sm whitespace-nowrap text-ink-700 transition-colors hover:text-ink-900;
}

.seg-on {
  @apply bg-teal-500 text-[#04161c];
}
</style>
