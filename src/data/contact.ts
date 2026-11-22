/**
 * Single source of truth for how clients reach the company.
 * Only confirmed values live here. Email and phone are deliberately absent:
 * `ContactSection.vue` renders them as marked "to be confirmed" placeholders
 * until the owner supplies the real ones.
 */
export const contact = {
  whatsapp: { number: '51985250146', display: '+51 985 250 146' },
} as const

export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`
}
