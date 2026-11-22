<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { InstrumentSet } from '../data/sets'
import { useSetLabel } from '../useSetLabel'

const props = defineProps<{ set: InstrumentSet; feature?: boolean; index?: number }>()
defineEmits<{ open: [InstrumentSet] }>()

const { t } = useI18n()
const { setName } = useSetLabel()

const eager = (props.index ?? 99) < 6
</script>

<template>
  <li
    class="group relative flex flex-col border border-plate-line bg-plate-000 transition duration-300 ease-raking hover:-translate-y-[3px] hover:border-teal-500 hover:shadow-lift focus-within:-translate-y-[3px] focus-within:border-teal-500 focus-within:shadow-lift"
  >
    <!-- The whole plate is the target; the button carries the semantics. -->
    <button type="button" class="absolute inset-0 z-2 cursor-pointer" @click="$emit('open', set)">
      <span class="sr-only">{{ t('catalogue.openPlate') }}: {{ setName(set) }}</span>
    </button>

    <div class="relative overflow-hidden border-b border-plate-line bg-plate-050">
      <img
        :src="set.plate.src"
        :srcset="set.plate.srcset"
        sizes="(min-width: 58rem) 45vw, 92vw"
        alt=""
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        width="1400"
        height="1896"
        class="w-full object-cover transition duration-500 ease-raking group-hover:scale-[1.015] group-hover:brightness-[1.03] group-hover:contrast-[1.04]"
        :class="feature ? 'aspect-[1400/380]' : 'aspect-[1400/420]'"
        :style="{ objectPosition: `50% ${set.focus ?? 15}%` }"
      />
      <!-- Raking light: hovering lifts the set under the lamp. -->
      <span
        class="pointer-events-none absolute inset-0 bg-[linear-gradient(106deg,transparent_30%,rgb(255_255_255/0.55)_50%,transparent_70%)] opacity-0 mix-blend-overlay transition-opacity duration-500 ease-raking group-hover:opacity-100 group-focus-within:opacity-100"
      />
    </div>

    <div class="flex flex-1 flex-col gap-2 px-[1.15rem] pt-[1.1rem] pb-5 text-ink-900">
      <div class="flex items-baseline justify-between gap-4">
        <span class="code text-code font-semibold text-teal-600">{{ set.model }}</span>
        <span class="code text-label text-ink-500 uppercase">
          {{ t('catalogue.page', { page: set.page }) }}
        </span>
      </div>

      <h3
        class="font-semibold leading-tight tracking-[-0.025em] text-ink-900"
        :class="feature ? 'text-2xl' : 'text-[1.08rem]'"
      >
        {{ setName(set) }}
      </h3>

      <ul v-if="set.fr?.length" class="mt-0.5 flex flex-wrap gap-1.5">
        <li
          v-for="g in set.fr.slice(0, 4)"
          :key="g"
          class="code border border-plate-line bg-plate-050 px-1.5 py-0.5 text-[0.62rem] text-ink-700"
        >
          {{ g }} Fr
        </li>
      </ul>

      <div
        class="mt-auto flex flex-wrap gap-x-4 gap-y-1 border-t border-plate-line pt-3.5 text-[0.78rem] text-ink-500"
      >
        <span>{{ t('catalogue.components', set.components.length) }}</span>
        <span v-if="set.compat?.length">
          {{ t('catalogue.compat') }}
          <b class="font-[560] text-ink-700">
            {{ set.compat.map((c) => c[0].toUpperCase() + c.slice(1)).join(' · ') }}
          </b>
        </span>
      </div>
    </div>
  </li>
</template>
