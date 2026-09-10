---
name: Klinik Nasional SATUSEHAT
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#4648d4'
  on-tertiary: '#ffffff'
  tertiary-container: '#6063ee'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-xs:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  2xs: 0.125rem
  xs: 0.25rem
  sm: 0.5rem
  md: 0.75rem
  base: 1rem
  lg: 1.25rem
  xl: 1.5rem
  2xl: 2rem
  3xl: 2.5rem
  table-cell-x: 0.75rem
  table-cell-y: 0.625rem
  sidebar-width: 16rem
  patient-banner-height: 4.5rem
---

## Brand & Style

The design system embodies an authoritative, modern clinical infrastructure built for national interoperability and rapid clinical workflows (SIMRS / Electronic Medical Records). It serves physicians, clinical coders, triage nurses, and hospital IT administrators who handle high-velocity patient intakes, FHIR resource synchronization, diagnostic recording, and ICD-10/ICD-9-CM validations.

The visual style merges structured clinical minimalism with high-density data legibility:
- **Clinical Dependability:** Visual noise is stripped away in favor of high-contrast, predictable UI scaffolding that reduces cognitive fatigue during 12-hour hospital shifts.
- **Interoperability-First:** Specific badge coding and semantic markers are provided for SATUSEHAT FHIR resources (`Patient`, `Encounter`, `Observation`, `Condition`, `MedicationRequest`).
- **Precision and Cleanliness:** Bright white canvases paired with slate-50 backgrounds create clear spatial boundaries. Elements rely on structural 1px borders rather than heavy atmospheric shadows to maintain absolute clarity on hospital-grade monitors.

## Colors

The palette establishes an unambiguous visual hierarchy tailored for medical contexts, triage urgency, and FHIR resource tagging.

### Core System Palette
- **Primary Clinical Cyan (`#0284C7`):** Primary interactions, active navigation states, primary operational CTAs, and selected patient encounters.
- **Secondary Medical Teal (`#0F766E`):** Validated clinical states, verified SATUSEHAT payloads, and stable baseline vitals.
- **Tertiary Interop Purple (`#6366F1`):** Diagnostic codes, HL7/FHIR mappings, API metadata, and system-level integrations.
- **Neutral Deep Navy (`#0F172A`):** High-legibility clinical typography, primary labels, and high-contrast icon strokes.

### Functional & Semantic Surfaces
- **App Background:** `#F8FAFC` (Slate-50)
- **Card / Surface Background:** `#FFFFFF` (Pure White)
- **Muted Surface / Table Striping:** `#F1F5F9` (Slate-100)
- **Dividers & Grid Lines:** `#E2E8F0` (Slate-200)
- **Subdued Text / Inactive Labels:** `#64748B` (Slate-500)

### SATUSEHAT FHIR Resource Semantic Accents
- **Patient (`Resource/Patient`):** Light Cyan fill `#E0F2FE`, border `#7DD3FC`, text `#0369A1`
- **Encounter (`Resource/Encounter`):** Light Emerald fill `#DCFCE7`, border `#86EFAC`, text `#15803D`
- **Observation (`Resource/Observation`):** Light Amber fill `#FEF3C7`, border `#FCD34D`, text `#B45309`
- **Condition (`Resource/Condition`):** Light Rose fill `#FFE4E6`, border `#FDA4AF`, text `#BE123C`
- **Procedure / Medication:** Light Violet fill `#EDE9FE`, border `#C4B5FD`, text `#6D28D9`

## Typography

Typography balances structural authority with rapid clinical parsing:
- **Headlines & Section Anchors:** Styled in `Plus Jakarta Sans` to grant modern, polished clarity across clinical modules, modal headers, and patient banners.
- **Body & Tabular Data:** Styled in `Inter` with tabular figures enabled (`font-variant-numeric: tabular-nums`). This guarantees alignment across vital sign logs, NIK/IHS numbers, and lab result comparisons.
- **Monospace Alignment:** NIK (Nomor Induk Kependudukan), IHS ID (SATUSEHAT ID), and FHIR payload identifiers use `data-mono` with fixed-width numerals to eliminate misreading digits under pressure.

## Layout & Spacing

The layout is built for high information density while preserving structural breathing room:
- **Grid Structure:** Fluid multi-pane dashboard layout. Standard 12-column dynamic grid with 16px gutters on clinical workstations (min-width: 1280px).
- **Desktop Clinical Cockpit:**
  - Left navigation (collapsible 256px sidebar).
  - Central diagnostic/work list pane (fills remaining space).
  - Right context drawer (optional 384px slide-in for SATUSEHAT JSON payload inspect, patient historical timeline, or FHIR dispatch logs).
- **Responsive Adaptations:**
  - On screens below 1024px, the right inspector folds into an overlay modal.
  - On mobile tablets (emergency ward handoffs), tables gracefully shift into card-based stacked summaries, preserving primary status badges and patient identifiers.

## Elevation & Depth

To prevent visual clutter across complex clinical workspaces, this design system minimizes heavy drop shadows in favor of crisp 1px borders (`#E2E8F0`) and subtle elevation steps:
- **Base Level (Canvas):** `#F8FAFC` flat surface. No elevation.
- **Level 1 (Clinical Cards & Tables):** `#FFFFFF` background with `border: 1px solid #E2E8F0` and an ambient tint: `box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.04)`.
- **Level 2 (Hover States, Popovers & Dropdowns):** `#FFFFFF` with `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)` and border `#CBD5E1`.
- **Level 3 (Modals, Triage Alerts & SATUSEHAT Inspector Drawers):** `#FFFFFF` with `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`. Backdrops use a semi-transparent slate wash (`rgba(15, 23, 42, 0.45)`).

## Shapes

The shape system employs `roundedness: 2` to create a friendly yet disciplined institutional presence:
- **Default Elements:** 0.5rem (`8px`) for text inputs, standard buttons, select controls, and resource badges.
- **Card Containers (`rounded-lg`):** 1rem (`16px`) for patient header banners, diagnostic panels, and EMR tab canvases.
- **Pills / Full Radius:** Used exclusively for user status toggles (e.g., Online/Duty Doctor) and numeric counter badges (e.g., unread lab alerts).

## Components

### Buttons
- **Primary:** Solid `#0284C7` background, white text, semi-bold weight. Hover: `#0369A1`. Focus: 2px ring offset with `#38BDF8`.
- **Secondary / Outline:** Pure white surface, 1px `#CBD5E1` border, `#0F172A` text. Hover: `#F1F5F9`.
- **Destructive:** Solid `#E11D48` background, white text for critical actions (Discharge Override, Void Encounter).

### FHIR Resource & Triage Badges
- Strict uppercase or title case font (`label-xs`).
- 0.25rem border-radius with 1px solid borders matching resource tinting.
- Includes a leading 6px circular dot indicator: green for successful dispatch to SATUSEHAT (`201 Created`), amber for pending queue, red for FHIR validation errors (`422 Unprocessable Entity`).

### Tables (Data-Dense SIMRS EMR)
- **Header:** `#F8FAFC` surface, uppercase `label-xs` in `#64748B`, 1px bottom border `#E2E8F0`.
- **Row:** Height `44px`, 1px bottom border `#F1F5F9`. Hover state shifts to `#F8FAFC`. Alternating rows can employ zebra striping with `#FAFBFD`.
- **Patient Identifier Column:** Combines Patient Name (`Plus Jakarta Sans`, 600 weight) with an inline mono subtitle for Medical Record Number (RM) and NIK/IHS ID.

### Input Fields & Search Bars
- Standard input height of `38px` for high-efficiency data entry.
- 1px border `#CBD5E1`, background `#FFFFFF`. Active focus border `#0284C7` with a light cyan ring (`rgba(2, 132, 199, 0.15)`).
- Quick search inputs feature a keyboard shortcut indicator pill (e.g., `Ctrl + K` or `/`) on the trailing edge.

### Patient Header Banner
- Persistent sticky banner at the top of active consultations.
- Displays patient photo, triage urgency color tag, full name, age/gender, NIK, IHS ID, allergies pill in bright red-50/border red-200, and current encounter status.