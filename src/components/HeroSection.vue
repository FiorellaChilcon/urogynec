<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { gaugeLabels, gaugeRange, sets } from '../data/sets'
import { whatsappLink } from '../data/contact'

const { t } = useI18n()

const hero = sets[0]
const min = gaugeRange[0]
const max = gaugeRange[gaugeRange.length - 1]
const pos = (g: number) => ((g - min) / (max - min)) * 100

/** Labels that survive on a narrow screen without colliding. */
const sparse = new Set([min, 21, max])
</script>

<template>
  <section
    id="top"
    class="relative overflow-clip bg-[radial-gradient(120%_90%_at_8%_-10%,rgb(63_201_201/0.12),transparent_58%),linear-gradient(168deg,var(--color-drape-800)_0%,var(--color-drape-900)_62%)] pt-10 pb-6 sm:pt-16 lg:pt-24 lg:pb-12"
  >
    <div class="page grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div>
        <h1 class="max-w-[15ch] text-display">
          {{ t('hero.headline') }}<br />
          <em class="text-teal-400 not-italic">{{ t('hero.headlineAccent') }}</em>
        </h1>

        <p class="mt-6 max-w-[46ch] text-lead text-on-drape-dim">{{ t('hero.lead') }}</p>

        <div class="mt-9 flex flex-wrap gap-3">
          <a class="btn" href="#catalogue">{{ t('hero.ctaCatalogue') }}</a>
          <a
            class="btn btn-ghost"
            :href="whatsappLink(t('contact.messageGeneric'))"
            target="_blank"
            rel="noopener"
          >
            {{ t('hero.ctaWhatsapp') }}
          </a>
        </div>
      </div>

      <!-- The instrument rides a light tray plate, lit from the left. -->
      <figure
        class="relative m-0 border border-plate-line bg-[linear-gradient(104deg,var(--color-plate-000)_0%,var(--color-plate-050)_55%,var(--color-plate-100)_100%)] px-4 pt-4 pb-2.5 shadow-plate lg:-mr-page"
      >
        <img
          :src="hero.plate.src"
          :srcset="hero.plate.srcset"
          sizes="(min-width: 60rem) 48vw, 92vw"
          :alt="t('hero.plateAlt')"
          width="1400"
          height="1896"
          fetchpriority="high"
          class="aspect-[1400/470] w-full object-cover object-[50%_19%] lg:aspect-auto lg:h-[clamp(18rem,30vw,27rem)] lg:object-[50%_27%]"
        />
        <figcaption class="code mt-2.5 text-code tracking-[0.06em] text-ink-500">
          {{ hero.model }} · {{ hero.fr?.[0] }}–{{ hero.fr?.[hero.fr.length - 1] }} Fr
        </figcaption>
        <span
          class="pointer-events-none absolute inset-0 animate-rake bg-[linear-gradient(102deg,transparent_36%,rgb(255_255_255/0.82)_50%,transparent_64%)] mix-blend-overlay motion-reduce:hidden"
        />
      </figure>
    </div>

    <div class="page">
      <div
        class="mt-10 flex items-center gap-5 border-t border-drape-line pt-6 lg:mt-16"
        role="img"
        :aria-label="`${t('hero.gaugeLabel')}: ${min}–${max} French`"
      >
        <span class="code shrink-0 text-label text-on-drape-dim uppercase">
          {{ t('hero.gaugeLabel') }}
        </span>
        <div class="relative h-8 flex-1">
          <span
            v-for="g in gaugeRange"
            :key="g"
            class="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1.5 first:translate-x-0 last:-translate-x-full"
            :class="[
              g === min ? '!translate-x-0 items-start' : '',
              g === max ? '!-translate-x-full items-end' : '',
            ]"
            :style="{ left: `${pos(g)}%` }"
          >
            <i
              class="block w-px"
              :class="
                g === min || g === max
                  ? 'h-3 bg-teal-500'
                  : gaugeLabels.includes(g)
                    ? 'h-2 bg-drape-line'
                    : 'h-1.5 bg-drape-line/75'
              "
            />
            <b
              v-if="gaugeLabels.includes(g)"
              class="code text-[0.6rem] font-medium"
              :class="[
                g === min || g === max ? 'text-teal-400' : 'text-on-drape-dim',
                sparse.has(g) ? '' : 'hidden sm:block',
              ]"
            >
              {{ g }}
            </b>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
