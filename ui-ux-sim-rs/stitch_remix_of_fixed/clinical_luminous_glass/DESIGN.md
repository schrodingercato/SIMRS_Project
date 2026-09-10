---
name: Clinical Luminous Glass
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
  on-surface-variant: '#3d4947'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#ba0035'
  on-tertiary: '#ffffff'
  tertiary-container: '#e21e49'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b6'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#920028'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '800'
    lineHeight: 4rem
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '700'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: '0'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: '0'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter-mobile: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 1.5rem
  margin-mobile: 1rem
  margin-tablet: 2rem
  margin-desktop: 2.5rem
  panel-gap: 1.25rem
  card-padding-sm: 1rem
  card-padding-md: 1.5rem
  card-padding-lg: 2rem
---

## Brand & Style

This design system establishes an ultra-modern, luminous clinical workstation tailored for SIMRS (Hospital Information Management System) operations and SATUSEHAT FHIR integration. It blends surgical Swiss precision with an ethereal, lightweight glassmorphic aesthetic. 

The emotional tone balances absolute clinical trust, high-speed ergonomic efficiency, and modern tranquility. Dense medical records, laboratory telemetry, and patient monitoring require crisp readability without the visual fatigue typical of legacy enterprise software. The frosted-glass planes, luminous teal signals, and weightless atmospheric depth make complex patient data feel organized, breathable, and immediate.

## Colors

The palette is engineered around high-transparency luminous glass surfaces layered over a shifting atmospheric canvas.

### Core Roles
- **Canvas Base**: Soft linear and radial transitions between `#F0F9FF` (Sky 50), `#E0F2FE` (Sky 100), and `#FFFFFF`. Ambient soft light blurs in `#99F6E4` (Teal 200) and `#BAE6FD` (Sky 200) sit behind major workspace viewports.
- **Glass Surfaces**: `rgba(255, 255, 255, 0.75)` to `rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(16px)` to `blur(24px)`.
- **Primary / Clinical Action**: Dynamic Teal (`#0D9488` default, hovering to `#14B8A6` and highlighted with `#2DD4BF`). Primary buttons project an active glow using `rgba(20, 184, 166, 0.35)`.
- **Secondary / Telemetry & Data**: Medical Cyan (`#0284C7` and `#06B6D4`) used for informatics, FHIR resource indicators, and synced statuses.
- **Tertiary / Clinical Priority (CITO/Alert)**: Luminous Coral Rose (`#E11D48` base, `#FB7185` highlight) for critical vitals, urgent triage tags, and emergency orders.
- **Warning & Pending**: Soft Solar Amber (`#D97706` base, `#FDE68A` soft pill fill) for sync backlogs and pending laboratory validation.
- **Neutral Typography**: Deep clinical Slate (`#0F172A` headings, `#334155` body, `#64748B` supporting labels, `#94A3B8` disabled/placeholder).
- **Glass Borders & Insets**: Outer borders `rgba(255, 255, 255, 0.70)` or `rgba(224, 242, 254, 0.60)`, reinforced by an internal specular highlight `inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)`.

## Typography

The typographic hierarchy implements Swiss graphic design principles using Plus Jakarta Sans. Strict contrast differentiation ensures text maintains razor-sharp legibility over varying degrees of frosted glass.

- **Primary Headings**: Rendered in weight `700` and `800` with negative letter-spacing, providing solid anchors in translucent viewports.
- **Data & Body**: Set in weights `400` and `500` with neutral slate hues to eliminate glare.
- **System Tags & Status Flags**: Set in `label-sm` or `label-md` with upper or title-case configurations and expanded tracking (`0.02em` to `0.05em`) for immediate clinical categorization (e.g., "SATUSEHAT SYNCED", "CITO", "ICD-10").

## Layout & Spacing

The layout adopts a high-density clinical workstation framework across a fluid 12-column grid.

### Layout Philosophy
- **Navigation Anchor**: A persistent, semi-transparent left rail docked at `width: 5rem` (collapsed) or `16rem` (expanded), styled with frosted backdrop glass, giving uninterrupted visibility to spatial canvas tones behind it.
- **Top Bar**: Fixed header with `backdrop-filter: blur(20px)` housing hospital facility status, active physician profile, and SATUSEHAT live connectivity beacon.
- **Split Workspace**: Main content splits into primary patient feeds (8 columns) and real-time medical context/FHIR inspector panels (4 columns).

### Breakpoints & Adaptive Rhythm
- **Mobile (< 768px)**: Single column fluid view; side navigation collapses into a floating frosted bottom tab bar; gutters reduce to `1rem`.
- **Tablet (768px - 1199px)**: 8-column layout; context sidebars collapse into overlay slide-outs; patient search and triage boards take priority.
- **Desktop (1200px+)**: Full 12-column dual/triple panel layout with fixed 1.5rem gutters, allowing simultaneous viewing of electronic medical records, diagnostic attachments, and integration consoles.

## Elevation & Depth

Hierarchy is established via physical light simulation and variable optical transmission rather than opaque drop shadows.

- **Ground Level (Canvas)**: Dynamic dual-tone ambient base (`#F0F9FF` to `#FFFFFF`) scattered with faint 400px radial light spheres of soft cyan/teal (`opacity: 0.25`).
- **Level 1 (Data Grids, Tables, Base Cards)**:
  - Background: `rgba(255, 255, 255, 0.75)`
  - Backdrop Filter: `blur(16px)`
  - Border: `1px solid rgba(255, 255, 255, 0.65)`
  - Shadow: `0 8px 30px rgba(15, 23, 42, 0.03)`
- **Level 2 (Active Cards, Hover States, Floating Panels)**:
  - Background: `rgba(255, 255, 255, 0.85)`
  - Backdrop Filter: `blur(20px)`
  - Border: `1px solid rgba(224, 242, 254, 0.80)`
  - Inset: `inset 0 1px 0 0 rgba(255, 255, 255, 0.95)`
  - Shadow: `0 14px 40px rgba(15, 23, 42, 0.06), 0 0 1px rgba(15, 23, 42, 0.08)`
- **Level 3 (Modals, Clinical Alerts, Floating Drawers)**:
  - Background: `rgba(255, 255, 255, 0.92)`
  - Backdrop Filter: `blur(28px)`
  - Border: `1px solid rgba(255, 255, 255, 0.90)`
  - Inset: `inset 0 1px 2px 0 rgba(255, 255, 255, 1)`
  - Shadow: `0 24px 60px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(14, 165, 233, 0.15)`
- **Luminous Glow Layer (Focus & Primary Triggers)**:
  - Box Shadow: `0 0 24px rgba(20, 184, 166, 0.40)` on active controls and positive validation badges.

## Shapes

The geometric framework uses continuous curves to soften clinical rigidity while preserving clear architectural alignment.

- **Standard Containers & Modules**: Base value is `rounded-xl` (1rem / 16px). Major operational modules, modal dialogs, and parent viewports scale to `rounded-2xl` (1.5rem / 24px).
- **Interactive Triggers (Buttons, Selectors, Inputs)**: `rounded-xl` (0.75rem to 1rem) offering tactile landing targets for rapid mouse-click and stylus workflows.
- **Pills, Badges & Micro-tags**: Full continuous rounding (`rounded-full`) for status indicators, triage flags, and SATUSEHAT status identifiers.

## Components

### Buttons
- **Primary Action**: 
  - Background: Linear gradient from `#0D9488` to `#14B8A6`.
  - Typography: `label-lg`, white, font-weight 600.
  - Border: `1px solid rgba(255, 255, 255, 0.3)`.
  - Shadow: `0 4px 14px rgba(20, 184, 166, 0.35)`.
  - Hover: Translates -1px vertically with an expanded teal radiance (`0 6px 20px rgba(45, 212, 191, 0.50)`).
- **Glass / Secondary**:
  - Background: `rgba(255, 255, 255, 0.70)`.
  - Backdrop Blur: `12px`.
  - Border: `1px solid rgba(224, 242, 254, 0.80)`.
  - Typography: Deep Slate `#0F172A`.
  - Hover: `rgba(255, 255, 255, 0.90)`, `border-teal-300/60`.
- **CITO / Critical Button**:
  - Background: Linear gradient from `#E11D48` to `#FB7185`.
  - Shadow: `0 4px 14px rgba(225, 29, 72, 0.35)`.
  - Hover: Expanded coral halo.

### Input Fields & Controls
- **Text Inputs**: 
  - Background: `rgba(255, 255, 255, 0.60)` with `backdrop-blur-md`.
  - Border: `1px solid rgba(203, 213, 225, 0.60)`.
  - Inset: `inset 0 1px 2px rgba(15, 23, 42, 0.03)`.
  - Focus: `rgba(255, 255, 255, 0.95)`, border `#14B8A6`, and outer glow `0 0 0 3px rgba(20, 184, 166, 0.15)`.
- **Checkboxes & Radios**:
  - Unchecked: Frosted pill/square with `border-slate-300` on `bg-white/50`.
  - Checked: `#0D9488` fill with crisp white vector marks and subtle cyan diffusion.

### Chips & Status Indicators
- **SATUSEHAT Connected Badge**:
  - Background: `rgba(204, 251, 241, 0.70)` with `backdrop-blur-sm`.
  - Border: `1px solid rgba(45, 212, 191, 0.60)`.
  - Content: Animated emerald/teal pulse dot paired with `#0F766E` label.
- **CITO Triage Chip**:
  - Background: `rgba(255, 228, 230, 0.80)`.
  - Border: `1px solid rgba(251, 113, 133, 0.70)`.
  - Typography: `#BE123C`, uppercase `label-sm`.

### Data Grids & Lists
- **SIMRS Clinical Tables**:
  - Header Row: Transparent with `border-b border-sky-100/80`, uppercase `label-sm` in `#64748B`.
  - Data Rows: Translucent zebra striping alternated with `bg-transparent` and `bg-white/40`.
  - Hover Row: `bg-white/80` with `backdrop-blur-md` and an outer shadow `0 4px 16px rgba(15, 23, 42, 0.04)`.
  - Dividers: Ultra-fine `rgba(226, 232, 240, 0.50)`.

### Cards & EHR Panels
- **Patient Context Card**:
  - Rounded-2xl translucent shell with high-clarity white backing (`bg-white/80`).
  - Specular top border: `border-t-white/90`.
  - Contains patient demographics, SATUSEHAT ID (IHS), and clinical alert badges with distinct spatial grouping.