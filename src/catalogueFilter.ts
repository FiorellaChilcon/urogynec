import { ref } from 'vue'
import type { Specialty } from './data/sets'

/**
 * Which specialty the catalogue is showing. Shared because the specialties
 * section links into the catalogue already filtered.
 */
export const specialtyFilter = ref<Specialty | 'all'>('all')

export function showSpecialty(specialty: Specialty | 'all') {
  specialtyFilter.value = specialty
  document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })
}
