<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const facts = [
  { label: 'company.sinceLabel', value: 'company.sinceValue', num: true },
  { label: 'company.reachLabel', value: 'company.reachValue', num: false },
  { label: 'company.compatLabel', value: 'company.compatValue', num: false },
]
</script>

<template>
  <section id="company" aria-labelledby="company-title" class="bg-plate-000 py-section text-ink-900">
    <div class="page grid items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <div>
        <h2 id="company-title" class="text-section text-ink-900">{{ t('company.title') }}</h2>
        <p class="mt-6 max-w-[58ch] text-lead text-ink-700">{{ t('company.body') }}</p>
        <p class="mt-4 max-w-[58ch] text-lead text-ink-500">{{ t('company.body2') }}</p>
      </div>

      <dl class="m-0 border-t border-plate-line">
        <div
          v-for="f in facts"
          :key="f.label"
          class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-plate-line py-4"
        >
          <dt class="text-[0.78rem] tracking-[0.1em] text-ink-500 uppercase">{{ t(f.label) }}</dt>
          <dd
            class="m-0 text-right font-[560] tracking-[-0.015em] text-ink-900"
            :class="f.num ? 'tabular-nums' : ''"
          >
            {{ t(f.value) }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
