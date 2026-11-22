/**
 * Catalogue data, transcribed from "Urology Gynecology Catalog 2026.pdf"
 * (pages 2-17). `plate` points at the scanned catalogue page for that set.
 *
 * Specs are deliberately language-neutral (codes, French gauges, angles,
 * millimetres); only `type` and `variant` are translated.
 */

export type Specialty = 'urology' | 'gynecology'

export type Brand = 'olympus' | 'storz' | 'wolf' | 'acmi' | 'stryker' | 'gyrus'

export interface Component {
  /** Manufacturer part code, e.g. "N6004". Several codes = one line per size. */
  code: string
  /** i18n key under `component.*` */
  type: string
  /** i18n key under `variant.*` */
  variant?: string
  /** Untranslated technical spec, e.g. "16.5 Fr" or "Ø4 × 302 mm" */
  spec?: string
}

export interface InstrumentSet {
  id: string
  /** Model code as printed in the catalogue, e.g. "NP-18". */
  model: string
  /** i18n key under `set.*` */
  name: string
  specialty: Specialty
  /** Catalogue page number as printed. */
  page: number
  plate: Plate
  /** i18n key under `family.*`. Groups the catalogue. */
  family: string
  variant?: string
  compat?: Brand[]
  /** Vertical framing of the plate in the card window, in percent (default 15). */
  focus?: number
  /**
   * The French gauges this set is offered in, as printed. Stated explicitly so
   * nothing has to parse it back out of `spec` strings.
   */
  fr?: number[]
  components: Component[]
}

/**
 * Plates are bundled assets, not public files: Vite resolves, hashes and
 * base-paths them at build time, so a missing plate fails the build instead
 * of 404-ing in a client's browser.
 *
 * vite-imagetools renders each plate at three widths so a phone downloads a
 * 480px image instead of the 1400px one the dialog needs.
 */
const plateSrcsets = import.meta.glob<string>('../assets/plates/*.webp', {
  eager: true,
  query: '?w=480;880;1400&format=webp&as=srcset',
  import: 'default',
})

const plateUrls = import.meta.glob<string>('../assets/plates/*.webp', {
  eager: true,
  query: '?w=880&format=webp&url',
  import: 'default',
})

export interface Plate {
  /** Fallback for browsers that ignore srcset. */
  src: string
  srcset: string
}

const plate = (n: number): Plate => {
  const key = `../assets/plates/p${String(n).padStart(2, '0')}.webp`
  const src = plateUrls[key]
  const srcset = plateSrcsets[key]
  if (!src || !srcset) throw new Error(`Catalogue plate missing: ${key}`)
  return { src, srcset }
}

export const sets: InstrumentSet[] = [
  {
    id: 'np-18',
    fr: [16.5, 18.5, 21, 23],
    model: 'NP-18',
    name: 'urethroCystoscopy',
    variant: 'lockable',
    family: 'cystoscopy',
    specialty: 'urology',
    page: 1,
    plate: plate(2),
    components: [
      { code: 'N6001', type: 'endoscope', spec: '0° · Ø4 × 302 mm' },
      { code: 'N6002', type: 'endoscope', spec: '30° · Ø4 × 302 mm' },
      { code: 'N6003', type: 'endoscope', spec: '70° · Ø4 × 302 mm' },
      { code: 'N6004', type: 'sheathObturator', spec: '16.5 Fr' },
      { code: 'N6005', type: 'sheathObturator', spec: '18.5 Fr' },
      { code: 'N6006', type: 'sheathObturator', spec: '21 Fr' },
      { code: 'N6007', type: 'sheathObturator', spec: '23 Fr' },
      { code: 'N6008', type: 'manipulator' },
      { code: 'N6009', type: 'endoBridge' },
      { code: 'N6010', type: 'biopsyForceps', variant: 'flexible', spec: '7 Fr × 410 mm' },
      { code: 'N6011', type: 'foreignBodyForceps', variant: 'flexible', spec: '7 Fr × 410 mm' },
      { code: 'N6012', type: 'serratedForceps', variant: 'flexible', spec: '7 Fr × 410 mm' },
      { code: 'N6013', type: 'scissors', variant: 'flexible', spec: '7 Fr × 410 mm' },
      { code: 'N6014', type: 'cleaningBar' },
      { code: 'N6016', type: 'adaptor' },
      { code: 'N6017', type: 'sealingCap' },
    ],
  },
  {
    id: 'np-6',
    fr: [16.5, 18.5, 21, 23],
    model: 'NP-6',
    name: 'urethroCystoscopy',
    variant: 'click',
    family: 'cystoscopy',
    specialty: 'urology',
    page: 2,
    plate: plate(3),
    compat: ['olympus', 'storz', 'wolf', 'acmi', 'stryker'],
    components: [
      { code: 'A0310', type: 'endoscope', spec: '0° · Ø4 × 302 mm' },
      { code: 'A0312', type: 'endoscope', spec: '30° · Ø4 × 302 mm' },
      { code: 'A0313', type: 'endoscope', spec: '70° · Ø4 × 302 mm' },
      { code: 'A1114', type: 'sheathObturator', spec: '16.5 Fr' },
      { code: 'A1115', type: 'sheathObturator', spec: '18.5 Fr' },
      { code: 'A1116', type: 'sheathObturator', spec: '21 Fr' },
      { code: 'A1117', type: 'sheathObturator', spec: '23 Fr' },
      { code: 'A1118', type: 'manipulator', variant: 'twoChannel' },
      { code: 'A1119', type: 'endoBridge', variant: 'singleChannel' },
      { code: 'A1119.1', type: 'endoBridge', variant: 'doubleChannel' },
      { code: 'A1119.2', type: 'endoBridge', variant: 'noValve' },
      { code: 'A2101', type: 'biopsyForceps', spec: '7 Fr × 395 mm' },
      { code: 'A2102', type: 'foreignBodyForceps', spec: '7 Fr × 395 mm' },
      { code: 'A2103', type: 'serratedForceps', spec: '7 Fr × 395 mm' },
      { code: 'A2104', type: 'scissors', spec: '7 Fr × 395 mm' },
      { code: 'A4010', type: 'cleaningBar', spec: 'Ø3 × 340 mm' },
      { code: 'T5010', type: 'lightGuide', spec: 'Ø4.5 × 2000 mm' },
      { code: 'T1001', type: 'adaptor' },
      { code: 'T1009.1', type: 'luerAdaptor' },
      { code: 'A2145', type: 'sealingCap' },
    ],
  },
  {
    id: 'np-7',
    fr: [16.5, 18.5, 21, 23],
    model: 'NP-7',
    name: 'urethroCystoscopy',
    variant: 'lockable',
    family: 'cystoscopy',
    specialty: 'urology',
    page: 3,
    plate: plate(4),
    compat: ['olympus', 'storz', 'wolf', 'acmi', 'stryker'],
    components: [
      { code: 'A0010', type: 'endoscope', spec: '0° · Ø4 × 302 mm' },
      { code: 'A0012', type: 'endoscope', spec: '30° · Ø4 × 302 mm' },
      { code: 'A0013', type: 'endoscope', spec: '70° · Ø4 × 302 mm' },
      { code: 'A1101.1', type: 'sheathObturator', spec: '16.5 Fr' },
      { code: 'A1102.1', type: 'sheathObturator', spec: '18.5 Fr' },
      { code: 'A1103.1', type: 'sheathObturator', spec: '21 Fr' },
      { code: 'A1104.1', type: 'sheathObturator', spec: '23 Fr' },
      { code: 'A1105.1', type: 'manipulator', variant: 'twoChannel' },
      { code: 'A1106.1', type: 'endoBridge', variant: 'singleChannel' },
      { code: 'A1106.2', type: 'endoBridge', variant: 'doubleChannel' },
      { code: 'A1106.3', type: 'endoBridge', variant: 'noValve' },
      { code: 'A2101', type: 'biopsyForceps', spec: '7 Fr × 395 mm' },
      { code: 'A2102', type: 'foreignBodyForceps', spec: '7 Fr × 395 mm' },
      { code: 'A2103', type: 'serratedForceps', spec: '7 Fr × 395 mm' },
      { code: 'A2104', type: 'scissors', spec: '7 Fr × 395 mm' },
      { code: 'A4010', type: 'cleaningBar', spec: 'Ø3 × 340 mm' },
      { code: 'T5010', type: 'lightGuide', spec: 'Ø4.5 × 2000 mm' },
      { code: 'T1001', type: 'adaptor' },
      { code: 'T1009.1', type: 'luerAdaptor' },
      { code: 'A2145', type: 'sealingCap' },
    ],
  },
  {
    id: 'np-2',
    fr: [11, 13.5],
    model: 'NP-2',
    name: 'cystoscopy',
    variant: 'pediatricLockable',
    family: 'cystoscopy',
    specialty: 'urology',
    page: 4,
    plate: plate(5),
    compat: ['olympus', 'storz', 'wolf', 'acmi', 'stryker'],
    components: [
      { code: 'A0210', type: 'endoscope', spec: '0° · Ø2.7 × 205 mm' },
      { code: 'A0211', type: 'endoscope', spec: '30° · Ø2.7 × 205 mm' },
      { code: 'A1201', type: 'sheathObturator', spec: '11 Fr' },
      { code: 'A1202', type: 'sheathObturator', spec: '13.5 Fr' },
      { code: 'A1203', type: 'manipulator' },
      { code: 'A1204', type: 'endoBridge' },
      { code: 'A2201', type: 'biopsyForceps', spec: '5.5 Fr × 260 mm' },
      { code: 'A2202', type: 'serratedForceps', spec: '5.5 Fr × 260 mm' },
      { code: 'A2203', type: 'foreignBodyForceps', spec: '5.5 Fr × 260 mm' },
      { code: 'T5010', type: 'lightGuide', spec: 'Ø4.5 × 2000 mm' },
      { code: 'T1001', type: 'adaptor' },
      { code: 'T1009.1', type: 'luerAdaptor' },
      { code: 'A2145', type: 'sealingCap' },
    ],
  },
  {
    id: 'nq-3',
    fr: [21],
    model: 'NQ-3',
    name: 'urethrotomy',
    variant: 'lockable',
    family: 'urethrotomy',
    specialty: 'urology',
    page: 5,
    plate: plate(6),
    compat: ['olympus', 'storz', 'wolf', 'acmi', 'stryker'],
    components: [
      { code: 'A0011', type: 'endoscope', spec: '12° · Ø4 × 302 mm' },
      { code: 'A3101', type: 'workingElement', variant: 'passive' },
      { code: 'A3102', type: 'sheathObturator', spec: '21 Fr' },
      { code: 'A3103', type: 'supplementarySheath' },
      { code: 'A3104', type: 'lancet' },
      { code: 'A3105', type: 'halfRoundKnife' },
      { code: 'A3106', type: 'hookKnife' },
      { code: 'A3107', type: 'coldKnife' },
      { code: 'T5010', type: 'lightGuide', spec: 'Ø4.5 × 2000 mm' },
      { code: 'T1001', type: 'adaptor' },
      { code: 'T1009.1', type: 'luerAdaptor' },
      { code: 'A2145', type: 'sealingCap' },
    ],
  },
  {
    id: 'jp-1',
    fr: [15.5, 19],
    model: 'JP-1',
    name: 'percutaneousNephroscopy',
    family: 'nephroscopy',
    specialty: 'urology',
    page: 6,
    plate: plate(7),
    components: [
      { code: 'A0118', type: 'sideViewEndoscope', spec: '15.5 Fr' },
      { code: 'A3170.1', type: 'sheath', spec: '19 Fr' },
      { code: 'A3171', type: 'trocar', spec: '4.5 Fr' },
      { code: 'A3172', type: 'guideBar', spec: '9 Fr' },
      { code: 'A3173', type: 'dilatorCannula', spec: '6 Fr · 7.5 Fr · 9 Fr' },
      { code: 'A3174', type: 'dilator', spec: '9–21 Fr' },
      { code: 'A3175', type: 'openConductor' },
      { code: 'A2001', type: 'metalWire' },
      { code: 'A2152', type: 'serratedForceps', spec: '10.5 Fr × 350 mm' },
      { code: 'A2153', type: 'graspingForceps', spec: '10.5 Fr × 350 mm' },
      { code: 'A2154', type: 'threeClawForceps', spec: '10.5 Fr × 350 mm' },
      { code: 'A2155', type: 'foreignBodyForceps', spec: '10.5 Fr × 350 mm' },
      { code: 'T5010', type: 'lightGuide', spec: 'Ø4.5 × 2000 mm' },
      { code: 'T1001', type: 'adaptor' },
      { code: 'T1009.1', type: 'luerAdaptor' },
      { code: 'A2145', type: 'sealingCap' },
    ],
  },
  {
    id: 'j1003',
    model: 'J1003',
    name: 'lithotriptoscopy',
    family: 'lithotripsy',
    specialty: 'urology',
    page: 7,
    plate: plate(8),
    components: [
      { code: 'N6001', type: 'endoscope', spec: '0° · Ø4 × 302 mm' },
      { code: 'N1001', type: 'endoscope', spec: '12° · Ø4 × 302 mm' },
      { code: 'N6003', type: 'endoscope', spec: '70° · Ø4 × 302 mm' },
      { code: 'J1002', type: 'lithotrite', variant: 'curvedHead' },
      { code: 'J1003', type: 'lithotrite', variant: 'straight' },
      { code: 'J1003.1', type: 'obturator' },
      { code: 'J1003.1S', type: 'obturator', variant: 'visual' },
      { code: 'M4010', type: 'evacuator', variant: 'ellik' },
      { code: 'T4003', type: 'evacuator', variant: 'hoffman' },
      { code: 'J1002.2', type: 'evacuatorAdaptor' },
      { code: 'N6016', type: 'adaptor' },
      { code: 'T5010', type: 'lightGuide', spec: 'Ø4.5 × 2000 mm' },
      { code: 'T1001', type: 'adaptor' },
      { code: 'T1009.1', type: 'luerAdaptor' },
    ],
  },
  {
    id: 'ss-3',
    fr: [4.9, 6.5, 7.5, 12.5],
    model: 'SS-3',
    name: 'ureterorenoscopy',
    family: 'ureteroscopy',
    specialty: 'urology',
    page: 8,
    plate: plate(9),
    components: [
      { code: 'A0116.1', type: 'ureterorenoscope', spec: '7.5/12.5 Fr · 425 mm WL · 5 Fr IC' },
      { code: 'A0116.2', type: 'ureterorenoscope', spec: '4.9/6.5 Fr · 425 mm WL · 3 Fr IC' },
      { code: 'A0116.3', type: 'ureterorenoscope', spec: '7.5/12.5 Fr · 425 mm WL · 5 Fr IC' },
      { code: 'A0116.3E', type: 'ureterorenoscope', spec: '6/7.5 Fr · 425 mm WL · 4 Fr IC' },
      { code: 'A2112.1', type: 'dilator', spec: '13 Fr' },
      { code: 'A2112.2', type: 'dilator', spec: '11 Fr' },
      { code: 'A2112.3', type: 'dilator', spec: '9 Fr' },
      { code: 'A2108.2', type: 'graspingForceps', variant: 'rigid', spec: '4.5 Fr × 600 mm' },
      { code: 'A2109.2', type: 'biopsyForceps', variant: 'rigid', spec: '4.5 Fr × 600 mm' },
      { code: 'A2110.2', type: 'graspingForceps', variant: 'flexible', spec: '4.5 Fr × 600 mm' },
      { code: 'A2111.2', type: 'biopsyForceps', variant: 'flexible', spec: '4.5 Fr × 600 mm' },
      { code: 'A2150.1', type: 'stoneBasket', spec: 'Ø1.5 × 590 mm' },
      { code: 'A2001', type: 'metalWire' },
      { code: 'T5010', type: 'lightGuide', spec: 'Ø4.5 × 2000 mm' },
      { code: 'T1009.1', type: 'luerAdaptor' },
      { code: 'A2145', type: 'sealingCap' },
    ],
  },
  {
    id: 'dq-9',
    fr: [13],
    model: 'DQ-9',
    name: 'resectoscopy',
    variant: 'pediatricLockable',
    family: 'resectoscopy',
    specialty: 'urology',
    page: 11,
    plate: plate(12),
    components: [
      { code: 'A0210', type: 'endoscope', spec: '0° · Ø2.7 × 205 mm' },
      { code: 'A3167', type: 'workingElement', variant: 'passive' },
      { code: 'A3168', type: 'sheathObturator', spec: '13 Fr' },
      { code: 'A3111.2', type: 'electrode', variant: 'loop' },
      { code: 'M1001', type: 'hfCord', variant: 'monopolar' },
      { code: 'M0015', type: 'hfGenerator', variant: 'multifunction' },
      { code: 'T4002', type: 'evacuator' },
      { code: 'T1001.10', type: 'adaptor' },
      { code: 'T5010', type: 'lightGuide', spec: 'Ø4.5 × 2000 mm' },
      { code: 'T1001', type: 'adaptor' },
      { code: 'T1009.1', type: 'luerAdaptor' },
    ],
  },
  {
    id: 'dq-4',
    fr: [24.5, 26.5],
    model: 'DQ-4',
    name: 'resectoscopy',
    variant: 'lockable',
    family: 'resectoscopy',
    specialty: 'urology',
    page: 12,
    plate: plate(13),
    compat: ['olympus', 'storz', 'wolf', 'acmi', 'stryker'],
    components: [
      { code: 'A0012', type: 'endoscope', spec: '30° · Ø4 × 302 mm' },
      { code: 'A3160.4S', type: 'workingElement', variant: 'passive' },
      { code: 'A3163.3S', type: 'innerSheathObturator', spec: '24.5 Fr' },
      { code: 'A3165.3S', type: 'outerSheath', spec: '26.5 Fr' },
      { code: '1.3-DS-24', type: 'electrode', variant: 'loop', spec: '30°' },
      { code: '3.1-DS-24', type: 'electrode', variant: 'spud', spec: '30°' },
      { code: '4-DS-24', type: 'electrode', variant: 'roller' },
      { code: '5-DS-24', type: 'electrode', variant: 'spike' },
      { code: 'M1015', type: 'hfCord', variant: 'monopolar' },
      { code: 'T4002', type: 'evacuator', variant: 'ellik' },
      { code: 'T1001.6', type: 'adaptor' },
    ],
  },
  {
    id: 'dq-10',
    fr: [24.5, 26.5],
    model: 'DQ-10',
    name: 'resectoscopyStorz',
    variant: 'bipolar',
    family: 'resectoscopy',
    specialty: 'urology',
    page: 14,
    plate: plate(15),
    compat: ['storz', 'olympus', 'wolf', 'acmi', 'stryker'],
    components: [
      { code: 'A0011.3', type: 'endoscope', spec: '12° · Ø4 × 299.5 mm' },
      { code: 'A3160.4SS', type: 'workingElement', variant: 'passive' },
      { code: 'A3163.3SS', type: 'innerSheathObturator', spec: '24.5 Fr' },
      { code: 'A3165.3SS', type: 'outerSheath', spec: '26.5 Fr' },
      { code: 'A3131', type: 'electrode', variant: 'doubleShaftBipolar' },
      { code: 'M1026', type: 'hfCord', variant: 'bipolar' },
      { code: 'T4002', type: 'evacuator', variant: 'ellik' },
      { code: 'T1001.6', type: 'adaptor' },
    ],
  },
  {
    id: 'dq-12',
    fr: [24.5, 26, 26.5],
    model: 'DQ-12',
    name: 'resectoscopyOlympus',
    variant: 'bipolar',
    family: 'resectoscopy',
    specialty: 'urology',
    page: 15,
    plate: plate(16),
    compat: ['olympus'],
    components: [
      { code: 'A0121.2', type: 'endoscope', variant: 'autoclavable', spec: '12° · Ø4 × 282 mm' },
      { code: 'A3160.7', type: 'workingElement' },
      { code: 'A3163.7', type: 'innerSheath', spec: '24.5 Fr' },
      { code: 'A3163.7a', type: 'obturator', variant: 'adjustable' },
      { code: 'A3163.7b', type: 'adaptor' },
      { code: 'A3163.8', type: 'innerSheath' },
      { code: 'A3165.7', type: 'outerSheath', spec: '26 Fr' },
      { code: 'A3165.8', type: 'outerSheath', spec: '26.5 Fr' },
      { code: 'A3165.9', type: 'sheathWorkingChannel' },
      { code: 'A3165.11', type: 'outerSheath' },
      { code: 'A3165.12', type: 'outerSheath' },
      { code: 'A3132', type: 'electrode', variant: 'loop', spec: '12°' },
      { code: 'A3133', type: 'electrode', variant: 'loop', spec: '30°' },
      { code: 'M1032', type: 'hfCord', variant: 'bipolar' },
      { code: 'T4002', type: 'evacuator', variant: 'ellik' },
      { code: 'T1001.7', type: 'adaptor' },
      { code: 'T1009.1', type: 'luerAdaptor' },
    ],
  },
  {
    id: 'dq-13',
    fr: [24, 26],
    model: 'DQ-13',
    name: 'resectoscopyGyrus',
    variant: 'bipolar',
    family: 'resectoscopy',
    specialty: 'urology',
    page: 16,
    plate: plate(17),
    compat: ['gyrus'],
    components: [
      { code: 'A0011', type: 'endoscope', spec: '12° · Ø4 × 302 mm' },
      { code: 'A0012', type: 'endoscope', spec: '30° · Ø4 × 302 mm' },
      { code: 'A3162J-2', type: 'workingElement', variant: 'passive' },
      { code: 'A3163.4', type: 'innerSheath', spec: '24 Fr' },
      { code: 'A3163.2J-1', type: 'innerSheathLaser', spec: '24 Fr' },
      { code: 'A3165.3SS', type: 'outerSheath', spec: '26 Fr' },
      { code: 'A3111JL-1', type: 'electrode' },
      { code: 'A3111JL-2', type: 'electrode' },
      { code: 'T4002', type: 'evacuator', variant: 'ellik' },
      { code: 'T1001.13', type: 'adaptor' },
      { code: 'T1001', type: 'adaptor' },
      { code: 'T1009.1', type: 'luerAdaptor' },
    ],
  },
  {
    id: 'opt-optical',
    fr: [8, 18, 30, 42],
    model: 'A21xx',
    name: 'opticalForcepsDilators',
    family: 'options',
    specialty: 'urology',
    page: 9,
    plate: plate(10),
    components: [
      { code: 'A2100', type: 'opticalPunchForceps', variant: 'lockable', spec: '0°' },
      { code: 'A2105', type: 'opticalGraspingForceps', variant: 'lockable', spec: '0°' },
      { code: 'A2106', type: 'opticalBiopsyForceps', variant: 'lockable', spec: '30°' },
      { code: 'A2107', type: 'opticalScissors', variant: 'lockable', spec: '0°' },
      { code: 'A2105.1', type: 'opticalGraspingForceps', variant: 'click', spec: '0°' },
      { code: 'A2106.1', type: 'opticalBiopsyForceps', variant: 'click', spec: '30°' },
      { code: 'A2107.1', type: 'opticalScissors', variant: 'click', spec: '0°' },
      { code: 'A2113 – A2113.22', type: 'maleUrethralDilator', spec: '8–30 Fr' },
      { code: 'A2114.1 – A2114.9', type: 'femaleUrethralDilator', spec: '18–42 Fr' },
      { code: 'A2116.1', type: 'filarSoundDilator', spec: 'Ø18–38 mm' },
    ],
  },
  {
    id: 'opt-access',
    fr: [7, 16, 18, 20, 22],
    model: 'A21xx / T10xx',
    name: 'accessInstruments',
    family: 'options',
    specialty: 'urology',
    page: 10,
    plate: plate(11),
    compat: ['olympus', 'storz', 'wolf'],
    components: [
      { code: 'A2131.1a – .1d', type: 'bladderTrocar', spec: '16 · 18 · 20 · 22 Fr' },
      { code: 'A2131.2 – .5', type: 'fistulaNeedle', spec: '16 · 18 · 20 · 22 Fr' },
      { code: 'A2130', type: 'penisClamp' },
      { code: 'A2148', type: 'dressingForceps', variant: 'straight', spec: '200 mm' },
      { code: 'A2149', type: 'dressingForceps', variant: 'curved', spec: '200 mm' },
      { code: 'A2101.1', type: 'biopsyForceps', variant: 'rigid', spec: '7 Fr × 395 mm' },
      { code: 'A2102.1', type: 'foreignBodyForceps', variant: 'rigid', spec: '7 Fr × 395 mm' },
      { code: 'A2103.1', type: 'serratedForceps', variant: 'rigid', spec: '7 Fr × 395 mm' },
      { code: 'A2104.1', type: 'scissors', variant: 'rigid', spec: '7 Fr × 395 mm' },
      { code: 'A3127', type: 'electrode', variant: 'straightLoop' },
      { code: 'A3128', type: 'electrode', variant: 'loop' },
      { code: 'A3129', type: 'electrode', variant: 'roller' },
      { code: 'A3130', type: 'electrode', variant: 'spud' },
      { code: 'T1001.1 / T1001.5', type: 'adaptor', spec: 'model 6 · 7 · 8' },
      { code: 'T1001.2', type: 'adaptor', spec: 'lithotrite' },
      { code: 'T1001.3', type: 'adaptor', spec: 'veress needle' },
      { code: 'T1001.4', type: 'adaptor', spec: 'Wolf' },
      { code: 'T1001.6', type: 'adaptor', spec: 'Storz' },
      { code: 'T1009.2', type: 'adaptor' },
    ],
  },
  {
    id: 'opt-electrodes',
    fr: [24],
    model: 'DS / DO / DW',
    name: 'electrodesEndoscopes',
    family: 'options',
    specialty: 'urology',
    page: 13,
    plate: plate(14),
    compat: ['storz', 'olympus', 'wolf', 'acmi'],
    components: [
      { code: '1-DS-24 … 6-DS-24', type: 'electrodeFamily', spec: 'Storz · 24 Fr' },
      { code: '1-DO-24 … 6-DO-24', type: 'electrodeFamily', spec: 'Olympus · 24 Fr' },
      { code: '1-DW-24 … 6-DW-24', type: 'electrodeFamily', spec: 'Wolf · 24 Fr' },
      { code: 'A0010', type: 'endoscope', spec: '0° · Ø4 × 302 mm' },
      { code: 'A0020', type: 'endoscope', spec: '0° · Ø2.9 × 302 mm' },
      { code: 'A0210', type: 'endoscope', variant: 'pediatric', spec: '0° · Ø2.7 × 205 mm' },
      { code: 'A0011', type: 'endoscope', spec: '12° · Ø4 × 302 mm' },
      { code: 'A0041', type: 'endoscope', spec: '12° · Ø4 × 302 mm · ACMI' },
      { code: 'A0012', type: 'endoscope', spec: '30° · Ø4 × 302 mm' },
      { code: 'A0022', type: 'endoscope', spec: '30° · Ø2.9 × 302 mm' },
      { code: 'A0022.1', type: 'endoscope', spec: '30° · Ø3 × 302 mm' },
      { code: 'A0022.2', type: 'endoscope', spec: '30° · Ø2.7 × 302 mm' },
      { code: 'A0211', type: 'endoscope', variant: 'pediatric', spec: '30° · Ø2.7 × 205 mm' },
      { code: 'A0042', type: 'endoscope', spec: '30° · Ø4 × 302 mm · ACMI' },
      { code: 'A0013', type: 'endoscope', spec: '70° · Ø4 × 302 mm' },
      { code: 'A0023.1', type: 'endoscope', spec: '70° · Ø3 × 304 mm' },
      { code: 'A3160.3S', type: 'workingElement', variant: 'active', spec: '30° · model 4' },
    ],
  },
]

/** Catalogue families in reading order. */
export const families = [
  'cystoscopy',
  'urethrotomy',
  'nephroscopy',
  'lithotripsy',
  'ureteroscopy',
  'resectoscopy',
  'options',
] as const

/**
 * Every French gauge printed anywhere in the 2026 catalogue, smallest to
 * largest. This is the hero's measured axis: it is data, not decoration.
 */
export const gaugeRange = [
  3, 4.5, 4.9, 5, 5.5, 6, 6.5, 7, 7.5, 9, 10.5, 11, 12.5, 13, 13.5, 15.5, 16.5, 18, 18.5, 19, 20,
  21, 22, 23, 24, 24.5, 26, 26.5, 30, 42,
]

/** The gauges that carry a printed label on the axis. */
export const gaugeLabels = [3, 11, 21, 30, 42]
