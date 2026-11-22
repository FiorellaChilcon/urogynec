import { useI18n } from 'vue-i18n'
import type { Component, InstrumentSet } from './data/sets'

/** Labels shared by the card, the plate dialog and the search index. */
export function useSetLabel() {
  const { t } = useI18n()

  const setName = (s: InstrumentSet) =>
    s.variant ? `${t(`set.${s.name}`)} (${t(`variant.${s.variant}`)})` : t(`set.${s.name}`)

  const componentName = (c: Component) =>
    c.variant ? `${t(`component.${c.type}`)}, ${t(`variant.${c.variant}`)}` : t(`component.${c.type}`)

  return { setName, componentName }
}
