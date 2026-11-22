<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { contact, whatsappLink } from '../data/contact'

const { t } = useI18n()
</script>

<template>
  <section
    id="contact" aria-labelledby="contact-title"
    class="border-t border-drape-line bg-[radial-gradient(90%_120%_at_92%_0%,rgb(63_201_201/0.1),transparent_60%),var(--color-drape-800)] py-section"
  >
    <div class="page grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 id="contact-title" class="text-section">{{ t('contact.title') }}</h2>
        <p class="mt-3.5 max-w-[62ch] text-lead text-on-drape-dim">{{ t('contact.lead') }}</p>
        <a
          class="btn mt-8"
          :href="whatsappLink(t('contact.messageGeneric'))"
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
            <path
              d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.17 8.17 0 0 1-1.26-4.36c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.82c0 4.53-3.69 8.21-8.23 8.21Zm4.51-6.15c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.23-.74-.65-1.23-1.46-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42-.14-.01-.3-.01-.47-.01-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.72.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z"
            />
          </svg>
          {{ t('contact.whatsapp') }} · {{ t('contact.whatsappValue') }}
        </a>
      </div>

      <dl class="m-0 border-t border-drape-line">
        <div class="contact-row">
          <dt class="contact-label">{{ t('contact.whatsapp') }}</dt>
          <dd class="contact-value">
            <a
              class="border-b border-teal-600 no-underline transition-colors hover:text-teal-400"
              :href="whatsappLink(t('contact.messageGeneric'))"
              target="_blank"
              rel="noopener"
            >
              {{ t('contact.whatsappValue') }}
            </a>
          </dd>
        </div>

        <div class="contact-row">
          <dt class="contact-label">{{ t('contact.phone') }}</dt>
          <dd class="contact-value">
            <a
              class="border-b border-teal-600 no-underline transition-colors hover:text-teal-400"
              :href="`tel:+${contact.whatsapp.number}`"
            >
              {{ t('contact.whatsappValue') }}
            </a>
          </dd>
        </div>

        <div class="contact-row">
          <dt class="contact-label">{{ t('contact.email') }}</dt>
          <dd class="contact-value">
            <span
              class="inline-block border border-dashed border-drape-line px-2 py-0.5 text-[0.82rem] font-normal text-on-drape-dim"
            >
              {{ t('contact.placeholder') }}
            </span>
            <small class="mt-1.5 block text-[0.7rem] font-normal text-pending">
              {{ t('contact.placeholderNote') }}
            </small>
          </dd>
        </div>

        <div class="contact-row">
          <dt class="contact-label">{{ t('contact.address') }}</dt>
          <dd class="contact-value">
            <address class="not-italic">{{ t('contact.addressValue') }}</address>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
@reference '../styles/base.css';

.contact-row {
  @apply flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-drape-line py-4;
}

.contact-label {
  @apply text-[0.74rem] tracking-[0.12em] text-on-drape-dim uppercase;
}

.contact-value {
  @apply m-0 text-right font-medium;
}
</style>
