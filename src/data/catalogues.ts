/**
 * The printed catalogues, offered as downloads. They stay in public/ on
 * purpose: these are links people paste into WhatsApp, so the URLs must be
 * stable and unhashed.
 */
import type { Specialty } from './sets'

export interface Catalogue {
  specialty: Specialty
  url: string
  pages: number
  /** Megabytes, one decimal, as shown to the visitor. */
  mb: string
}

export const catalogues: Catalogue[] = [
  {
    specialty: 'urology',
    url: `${import.meta.env.BASE_URL}techno-standard-urology-catalogue-2026.pdf`,
    pages: 18,
    mb: '2.4',
  },
  {
    specialty: 'gynecology',
    url: `${import.meta.env.BASE_URL}techno-standard-gynecology-catalogue-2026.pdf`,
    pages: 8,
    mb: '6.6',
  },
]
