<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { InstrumentSet } from '../data/sets'
import { whatsappLink } from '../data/contact'
import { useSetLabel } from '../useSetLabel'

const props = defineProps<{ set: InstrumentSet | null }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()
const { setName, componentName } = useSetLabel()
const el = ref<HTMLDialogElement | null>(null)

watch(
  () => props.set,
  (set) => {
    const dialog = el.value
    if (!dialog) return
    if (set && !dialog.open) dialog.showModal()
    if (!set && dialog.open) dialog.close()
  },
)
</script>

<template>
  <dialog
    ref="el"
    aria-labelledby="plate-dialog-title"
    class="m-auto max-h-[92dvh] w-full max-w-6xl animate-rise border border-plate-line bg-plate-000 p-0 text-ink-900 shadow-sheet backdrop:bg-[rgb(4_18_24/0.78)]"
    @close="emit('close')"
    @click.self="emit('close')"
  >
    <div v-if="set" class="flex max-h-[92dvh] flex-col">
      <header
        class="flex items-start justify-between gap-6 border-b border-plate-line px-4 py-5 sm:px-8"
      >
        <div>
          <p class="code mb-1.5 text-code tracking-[0.06em] text-teal-600">
            {{ set.model }} · {{ t('catalogue.page', { page: set.page }) }}
          </p>
          <h2
            id="plate-dialog-title"
            class="text-[clamp(1.25rem,1rem+1.2vw,1.9rem)] tracking-[-0.03em] text-ink-900"
          >
            {{ setName(set) }}
          </h2>
        </div>
        <button
          type="button"
          class="grid size-10 shrink-0 cursor-pointer place-items-center border border-plate-line text-ink-700 transition-colors hover:bg-plate-100 hover:text-ink-900"
          @click="emit('close')"
        >
          <span class="sr-only">{{ t('catalogue.closePlate') }}</span>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="1.6" />
          </svg>
        </button>
      </header>

      <div class="grid overflow-auto overscroll-contain lg:grid-cols-[1.25fr_1fr]">
        <figure
          class="m-0 border-b border-plate-line bg-plate-050 p-3 sm:p-6 lg:border-r lg:border-b-0"
        >
          <img
            :src="set.plate"
            :alt="t('catalogue.plateOf', { page: set.page, name: setName(set) })"
            width="1400"
            height="1896"
            class="h-auto w-full bg-plate-000"
          />
        </figure>

        <div class="flex flex-col p-4 sm:p-7 lg:overflow-auto">
          <table class="w-full border-collapse text-[0.9rem]">
            <caption class="sr-only">
              {{
                t('catalogue.components', set.components.length)
              }}
            </caption>
            <thead class="sr-only">
              <tr>
                <th scope="col">{{ t('catalogue.colCode') }}</th>
                <th scope="col">{{ t('catalogue.colItem') }}</th>
                <th scope="col">{{ t('catalogue.colSpec') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(c, i) in set.components"
                :key="`${c.code}-${i}`"
                class="border-b border-plate-line last:border-b-0"
              >
                <td
                  class="code w-px py-2 pr-4 align-baseline text-[0.78rem] font-semibold whitespace-nowrap text-teal-600"
                >
                  {{ c.code }}
                </td>
                <td class="py-2 pr-2 align-baseline text-ink-900">{{ componentName(c) }}</td>
                <td
                  class="code w-px py-2 text-right align-baseline text-[0.76rem] whitespace-nowrap text-ink-700"
                >
                  {{ c.spec ?? '' }}
                </td>
              </tr>
            </tbody>
          </table>

          <a
            class="btn mt-6 self-start"
            :href="whatsappLink(t('contact.messagePrefill', { set: setName(set), model: set.model }))"
            target="_blank"
            rel="noopener"
          >
            {{ t('catalogue.enquire') }}
          </a>
        </div>
      </div>
    </div>
  </dialog>
</template>
