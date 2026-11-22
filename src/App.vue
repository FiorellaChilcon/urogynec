<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import CatalogueSection from './components/CatalogueSection.vue'
import SpecialtiesSection from './components/SpecialtiesSection.vue'
import CompanySection from './components/CompanySection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const { t } = useI18n()
</script>

<template>
  <a class="skip-link" href="#catalogue">{{ t('nav.skip') }}</a>
  <SiteHeader />
  <main>
    <HeroSection />
    <CatalogueSection />
    <SpecialtiesSection />
    <CompanySection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
