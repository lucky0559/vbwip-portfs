---
name: Vanessa Benipayo Working Portfolio
description: A quiet architectural dossier for project work, process, and practice.
colors:
  paper: "oklch(96.2% 0.012 65)"
  paper-deep: "oklch(90.5% 0.024 57)"
  graphite: "oklch(21% 0.012 72)"
  graphite-soft: "oklch(38% 0.018 63)"
  line: "oklch(80% 0.024 62)"
  oxide: "oklch(56% 0.095 42)"
  oxide-light: "oklch(76% 0.085 55)"
typography:
  display:
    fontFamily: "Bodoni Moda, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(3.75rem, 10vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bodoni Moda, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Albert Sans, Avenir Next, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Albert Sans, Avenir Next, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  label:
    fontFamily: "Albert Sans, Avenir Next, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  sm: "3px"
  md: "6px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.oxide}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "15px 23px"
  project-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "24px 0"
  field:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.sm}"
    padding: "16px"
---

# Design System: Vanessa Benipayo Working Portfolio

## 1. Overview

**Creative North Star: "The Working Drawing"**

The portfolio should feel like a drawing set opened on a large table: quiet at first glance, exact on inspection, and full of evidence that a real person has thought through the work. The page uses generous paper-colored space, disciplined alignments, and a single oxide accent that behaves like a notation mark rather than decoration. Projects lead the story. The interface is a frame for site, scale, material, and decision making.

This is editorial in its pacing, not in its costume. A restrained serif gives the work a considered voice, while a clear sans-serif handles captions, metadata, and contact. The layout may break its grid when a project needs emphasis, but every offset should feel measured, like a plan detail. The system explicitly rejects generic architect templates, SaaS presentation patterns, dark-tech styling, purple gradients, neon accents, glassmorphism, repeated feature cards, auto-rotating hero carousels, and a fashion-editorial mood board.

**Key Characteristics:**

- Paper, graphite, and one oxidized accent
- Project index before card wall
- Context-rich metadata and drawing-set rhythm
- Quiet motion with a reduced-motion equivalent
- Sharp edges, restrained depth, and generous breathing room

## 2. Colors

The palette is warm and mineral, built from paper and graphite with a single terracotta notation color. Color should clarify hierarchy and place, never imitate a sky, a sunset, or a tech brand.

### Primary

- **Oxide notation** (`oklch(56% 0.095 42)`): The single accent for active navigation, key links, section markers, and small moments of emphasis. It should remain scarce enough to feel authored.

### Neutral

- **Drawing paper** (`oklch(96.2% 0.012 65)`): The primary page background and quietest surface.
- **Paper shadow** (`oklch(90.5% 0.024 57)`): Form fields, inset notes, and subtle tonal grouping.
- **Graphite** (`oklch(21% 0.012 72)`): Primary text, dark surfaces, and the main contact action. It is never pure black.
- **Graphite soft** (`oklch(38% 0.018 63)`): Body copy, supporting metadata, and secondary controls.
- **Survey line** (`oklch(80% 0.024 62)`): Rules, dividers, image captions, and grid traces.
- **Oxide wash** (`oklch(76% 0.085 55)`): Hover tint or small annotation surface, never a second accent.

### Named Rules

**The One Notation Rule.** Oxide is the only chromatic voice. Do not introduce a second accent for hover, status, or decoration.

## 3. Typography

**Display Font:** Bodoni Moda with Iowan Old Style and Georgia fallbacks

**Body Font:** Albert Sans with Avenir Next and system sans-serif fallbacks

**Character:** The display face carries the quiet confidence of a title block, while Albert Sans keeps project facts and calls to action practical. The pairing is precise rather than ornamental.

### Hierarchy

- **Display** (400, `clamp(3.75rem, 10vw, 9rem)`, 0.9): The opening name and one dominant statement per major narrative beat.
- **Headline** (400, `clamp(2.5rem, 5vw, 5.5rem)`, 0.98): Section and project titles, with balanced wrapping and no orphaned final words.
- **Title** (600, `1.125rem`, 1.25): Project rows, service names, and contact prompts.
- **Body** (400, `0.9375rem`, 1.65): Explanatory copy capped at 65–72ch for comfortable reading.
- **Label** (600, `0.6875rem`, 0.14em tracking, sentence case preferred): Coordinates, years, roles, and short navigation metadata. All caps are reserved for compact labels only.

### Named Rules

**The Title Block Rule.** Large type should establish the drawing, not shout over it. Use one dominant display moment per viewport and let metadata stay quiet.

## 4. Elevation

This is a flat-by-default system. Depth comes from tonal paper shifts, image crops, rules, overlaps, and the occasional graphite surface. Avoid soft floating cards and generic drop shadows. When an interactive layer needs separation, use a low, tinted shadow that feels like paper lifting from a table, never a black blur.

### Shadow Vocabulary

- **Paper lift** (`0 12px 30px oklch(21% 0.012 72 / 0.08)`): Hovered project media or a focused contact panel only.
- **No default shadow:** Project rows, navigation, and section containers remain flat at rest.

### Named Rules

**The Tabletop Rule.** Surfaces sit on the same table until hierarchy or interaction gives a clear reason to lift them.

## 5. Components

### Buttons

- **Shape:** Square with a 0px radius. A 3px radius is allowed only for form fields.
- **Primary:** Graphite background, paper text, 16px by 24px padding, and a compact label. On hover, shift to oxide and move upward by 2px using transform only.
- **Hover / Focus:** 200ms ease-out color transition, visible 2px oxide focus ring with 3px offset, and a pressed scale of 0.98.
- **Secondary / Tertiary:** Use an underlined text link or outlined paper button. Do not pair every primary button with a ghost twin by default.

### Cards / Containers

- **Corner Style:** No radius for project frames and major containers; 3px for inputs.
- **Background:** Paper at rest, paper shadow for inset groups, graphite for the final contact contrast.
- **Shadow Strategy:** Flat by default; use paper lift only for an intentional hover state.
- **Border:** One-pixel survey lines only when they explain grouping or index structure.
- **Internal Padding:** 24px for compact rows, 40px to 64px for editorial panels.

### Inputs / Fields

- **Style:** Paper-shadow background, one-pixel survey line, 3px radius, 16px internal padding, and a visible label above each field.
- **Focus:** The survey line shifts to oxide and the focus ring remains visible for keyboard users.
- **Error / Disabled:** Keep errors inline and direct. Never rely on color alone; add a short message and preserve the field label.

### Navigation

- **Style:** A compact fixed title block with a visible index cue. Desktop links use Albert Sans labels and an oxide underline or marker for the current section. Mobile navigation is a full-height paper sheet with an explicit close control and no decorative menu animation when reduced motion is active.

### Project Index Row

Each row acts like a catalog entry, not a card. It contains a project number, title, location, year, role, and a right-aligned media preview that can reveal on hover or focus. On smaller screens, metadata stacks beneath the title and the preview becomes an inline image with a descriptive caption.

## 6. Do's and Don'ts

### Do:

- **Do** keep the drawing-paper background and graphite text as the default surface pair.
- **Do** use oxide only for authored emphasis, active state, and clear calls to action.
- **Do** expose location, year, role, scale, and status beside project titles.
- **Do** use real project imagery with descriptive alt text and captions.
- **Do** preserve a visible grid, then break it deliberately when the work benefits from an offset.
- **Do** provide a static equivalent for every meaningful motion sequence.
- **Do** keep contact paths clear for both hiring conversations and client inquiries.

### Don't:

- **Don't** make the site look like a generic architect portfolio template, a SaaS landing page, or a fashion-editorial mood board.
- **Don't** use dark-tech styling, purple gradients, neon accents, or glassmorphism.
- **Don't** repeat identical feature cards or use a wall of cards as the project index.
- **Don't** use an auto-rotating hero carousel that competes with the work.
- **Don't** use vague architectural clichés such as "elevating spaces" or empty luxury language.
- **Don't** rely on color, hover, or motion alone to communicate meaning.
- **Don't** add decorative UI chrome that does not help a visitor understand a project or take the next step.
