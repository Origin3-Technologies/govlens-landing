---
name: GovLens Web
description: The govlens.ph marketing site on the product brand: white page, dark green ink, one forest-green accent.
colors:
  forest-green: "#0F6E56"
  forest-green-hover: "#0B5A46"
  leaf-green: "#1D9E75"
  mint: "#9FE1CB"
  mint-wash: "#E8F5F0"
  paper: "#FFFFFF"
  mist: "#F7FAF9"
  hairline: "#E0ECE8"
  ink: "#1A2E22"
  moss-gray: "#5A7A6E"
  amber: "#D97706"
  amber-ink: "#9A3412"
  signal-red: "#DC2626"
  review-blue: "#2563EB"
typography:
  hero: {fontFamily: "Sora, sans-serif", fontSize: "64px", fontWeight: 800, lineHeight: "1.05"}
  display: {fontFamily: "Sora, sans-serif", fontSize: "54px", fontWeight: 800, lineHeight: "1.1"}
  h2: {fontFamily: "Sora, sans-serif", fontSize: "42px", fontWeight: 800, lineHeight: "1.15"}
  h3: {fontFamily: "Sora, sans-serif", fontSize: "30px", fontWeight: 700, lineHeight: "1.2"}
  stat: {fontFamily: "Sora, sans-serif", fontSize: "48px", fontWeight: 800, lineHeight: "1"}
  wordmark: {fontFamily: "Sora, sans-serif", fontSize: "20px", fontWeight: 800, lineHeight: "24px"}
  lead: {fontFamily: "DM Sans, sans-serif", fontSize: "17px", fontWeight: 400, lineHeight: "1.55"}
  body: {fontFamily: "DM Sans, sans-serif", fontSize: "16px", fontWeight: 400, lineHeight: "1.55"}
  body-small: {fontFamily: "DM Sans, sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "1.5"}
  title: {fontFamily: "DM Sans, sans-serif", fontSize: "18px", fontWeight: 600, lineHeight: "1.35"}
  label: {fontFamily: "DM Sans, sans-serif", fontSize: "13px", fontWeight: 600, lineHeight: "16px"}
  mono: {fontFamily: "JetBrains Mono, monospace", fontSize: "13px", fontWeight: 400, lineHeight: "20px"}
rounded: {xs: "4px", sm: "6px", field: "8px", card: "12px", lg: "16px", badge: "20px", pill: "999px"}
spacing: {micro: "4px", tight: "8px", grid: "12px", content: "16px", card: "20px", main: "24px", gap: "32px", s40: "40px", s48: "48px", s64: "64px", section-y: "80px"}
components:
  nav: {backgroundColor: "{colors.paper}", textColor: "{colors.ink}"}
  button-primary: {backgroundColor: "{colors.forest-green}", textColor: "{colors.paper}", rounded: "{rounded.pill}", height: "44px"}
  button-outlined: {backgroundColor: "{colors.paper}", textColor: "{colors.forest-green}", rounded: "{rounded.pill}", height: "44px"}
  button-inverse: {backgroundColor: "{colors.paper}", textColor: "{colors.forest-green}", rounded: "{rounded.pill}", height: "44px"}
  feature-card: {backgroundColor: "{colors.paper}", textColor: "{colors.ink}", rounded: "{rounded.card}", padding: "24px"}
  stat-tile: {backgroundColor: "{colors.mint-wash}", textColor: "{colors.ink}", rounded: "{rounded.card}", padding: "20px"}
  cta-band: {backgroundColor: "{colors.forest-green}", textColor: "{colors.paper}", padding: "80px"}
  field: {backgroundColor: "{colors.paper}", textColor: "{colors.ink}", rounded: "{rounded.field}", height: "44px"}
  status-pill: {backgroundColor: "{colors.mint-wash}", textColor: "{colors.forest-green}", rounded: "{rounded.badge}"}
---

# Design System: GovLens Web

## Overview

**Creative North Star: "The Daylight Ledger"**, on the web. A white page, dark green-tinted ink, and one forest green that says "this matters": an action, a figure, the wordmark. The site is calm, official and plain. It talks to LGU officers and administrators who have little time and a low tolerance for decoration.

This guide is derived from the Android system in `govlens-mobile/DESIGN.md` (the rules, the palette, the dark table) and the web app's tokens in `govlens-frontend/src/styles.scss` (the `--read-*` type scale, `--space-*`, `--radius-*`). Android units are converted: 1sp or 1dp = 1px. It replaces the April "rebrand-2026" look of govlens.ph (blue `#2563EB`, navy `#0C1929`, gold `#C9A84C`). Blue survives only as the information colour, Review Blue. Gold is gone.

**Key characteristics**
- White page. Mist may band alternate sections. Exactly one Forest Green band per page: the pilot sign-up.
- Borders, not shadows. A soft shadow appears only on the hero product frame and on dialogs.
- Sora for headings and figures, DM Sans for everything else, JetBrains Mono for technical values only. Nothing under 13px.
- Light only. The tokens in the Design System artifact also carry the product's approved dark values; the site does not ship them.
- Copy: hero "See your government data clearly." Filipino line "Malinaw ang datos. Malinaw ang desisyon." Never "province-wide" (PRO-23). Footer says "by Origin3".

## Colors

### Brand and neutrals
- **Forest Green** `#0F6E56`: the only accent. Primary buttons, links, "Lens" on white, figures, step numbers, icons, the one band. 6.20:1 on white.
- **Forest Green Hover** `#0B5A46`: primary button hover only.
- **Leaf Green** `#1D9E75`: graphic marks and card-hover borders only (3.39:1). Never text.
- **Mint** `#9FE1CB`: "Lens" on the Forest Green band, nothing else. 1.49:1 on white, so never on a light ground.
- **Mint Wash** `#E8F5F0`: stat and KPI tiles only. Never a section background, never an icon chip.
- **Paper** `#FFFFFF`: the page and every card.
- **Mist** `#F7FAF9`: the alternate section band and quiet fills.
- **Hairline** `#E0ECE8`: card and divider borders, the step line. Decorative, so exempt from 3:1.
- **Ink** `#1A2E22`: headings and body.
- **Moss Gray** `#5A7A6E`: secondary text, field and outlined-button outlines. 4.73:1 on white, 4.50:1 on Mist. Not allowed on Mint Wash (4.22:1): use Ink there.

### Status
- **Amber** `#D97706` marks only (3.19:1); **Amber Ink** `#9A3412` for amber text (7.31:1).
- **Signal Red** `#DC2626`: errors only (4.83:1 on white, so it never sits on the green band).
- **Review Blue** `#2563EB`: information and "in review" (5.17:1).

### Named rules
**The One Green Rule.** Green means an action, a figure, a selection, a mark or the wordmark. If a green element is decoration, remove it.
**The One Band Rule.** One Forest Green band per page, the pilot sign-up. White text, no opacity tricks. No navy, no dark hero, no dark footer.
**The Ink Step Rule.** Text uses the darkest step that reaches 4.5:1 (3:1 at 24px and up, and for control borders and focus rings).
**The Pending Is Visible Rule.** Status uses colour and a word, never colour alone.

### Wordmark
Sora 800, never all caps, never punctuated, minimum 16px.
- On white or Mist: "Gov" Ink `#1A2E22`, "Lens" Forest Green `#0F6E56`.
- On the Forest Green band: "Gov" white, "Lens" Mint `#9FE1CB`. Gov is 6.20:1. Lens is **4.17:1**, below 4.5:1, so the band wordmark must be 20px or larger at weight 800 (bold text of 19px+ needs 3:1).
- The mark (`govlens-mark.svg`, a Forest Green disc with a white lens) is the favicon and app icon.

## Typography

**Display:** Sora 700 and 800. **Body:** DM Sans 400 to 600. **Technical:** JetBrains Mono, only for field names, URLs and codes. All three load from Google Fonts through `next/font`.

| Style | Font | Size | Use |
|---|---|---|---|
| Hero | Sora 800 | `clamp(36px, 5.5vw, 64px)` | Hero headline only |
| Display | Sora 800 | `clamp(36px, 4.5vw, 54px)` | Largest section heading |
| H2 | Sora 800 | `clamp(28px, 3.5vw, 42px)` | Section headers (the site also has 26-38 and 26-40 variants; fine to merge) |
| H3 | Sora 700 | `clamp(22px, 2.5vw, 30px)` | Sub-headings |
| Stat | Sora 800 | 48px, 32px | Stat tile figures, tabular numerals |
| Wordmark | Sora 800 | 20px | Nav and footer |
| Lead | DM Sans 400 | `clamp(15px, 1.4vw, 17px)` | Hero and section intro |
| Body | DM Sans 400 | 16px, line 1.55 | Running text, 65 to 75 characters a line |
| Body small | DM Sans 400 | 14px | Card descriptions, helper text |
| Title | DM Sans 600 | 18px | Card titles, FAQ questions |
| Label | DM Sans 600 | 13px | Eyebrows, pills, field labels, footer text |
| Mono | JetBrains Mono 400 | 13px | Technical values |

The site keeps its display sizes. Anything that was 9 to 12px is now 13px. The Tabular Figures Rule: every figure uses `font-variant-numeric: tabular-nums`.

## Layout

One column of centred sections with the site's existing 5% side gutters and 80px vertical padding (`py-20`). Inside a section: 32px between header and content, 24px between cards, 12px inside a group. Page order: Nav, Hero, How it works, Features, Pilot band, Footer. Sections alternate Paper and Mist; the pilot band breaks the rhythm once. Cards in a row use a grid of 3 on desktop and stack under 768px. Touch targets are at least 44px tall.

## Elevation & Depth

Flat. Structure comes from 1px Hairline borders and from Mist banding. **The Border Not Shadow Rule:** a boundary the visitor must see is drawn, never implied by shadow. The only shadows: the hero product mockup frame and dialogs, both `0 16px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)` (`--shadow-lg` in the app). No gradients anywhere. No hover lift or hover shadow on cards: the border turns Forest Green.

## Shapes

Cards and tiles 12px. Fields 8px. Buttons and status pills are full pills. The hero mockup frame 16px. Borders are 1px; focus is a 2px solid outline with a 2px offset (Forest Green on white, white on the band).

## Components

### Buttons
Primary: Forest Green pill, white DM Sans 600 label, 44px tall, hover `#0B5A46`. Outlined: Paper fill, 1.5px Moss Gray outline, Forest Green label. **One primary per section.** On the green band the primary is the inverse: white pill, Forest Green label (6.20:1), and the outlined button there has a white outline and white label.

### Nav
Paper, 1px Hairline below. Wordmark left, one primary pill "Apply for Access" right, no links. The Nav and Hero each own one primary.

### Hero
Paper ground, no grid, no glow, no navy. Eyebrow (Label, Forest Green), the hero headline "See your government data clearly.", the Filipino line "Malinaw ang datos. Malinaw ang desisyon." as Lead in Moss Gray, one primary, one outlined. Inline stats are Stat tiles. The product mockup sits in a 16px frame with a 1px Hairline border and the one allowed shadow.

### Section header
Optional eyebrow (Label, Forest Green), H2 in Ink, Lead in Moss Gray below, left aligned or centred as the section already is. 16px gap, 32px to content.

### Feature card
Paper, 12px radius, 1px Hairline border, 24px padding. A 24px Forest Green line icon (inline SVG, no emoji), Title, Body small in Moss Gray. Hover: border Forest Green. No left-border accent, no ghost numerals, no icon chip fill.

### Stat tile
Mint Wash fill, no border, 12px radius, 20px padding. Figure in Sora 800 Ink (or Forest Green), tabular. Label in DM Sans 13px **Ink**, not Moss Gray.

### How-it-works steps
Three steps in a row. Each: a 40px Paper disc with a 1px Forest Green border and a Forest Green Sora 800 numeral, a Title, Body small. A solid 2px Hairline line joins the discs on desktop; hidden under 768px.

### Pilot CTA band with form fields
The one Forest Green band. White H2 and Lead. Fields: Paper fill, 8px radius, 1px Moss Gray outline, Ink text, Moss Gray placeholder, label above in white 13px 600. Focus: 2px white outline. Errors show as a Paper strip under the field with Signal Red text, because red does not read on green. One inverse primary "Apply for pilot access". The FAQ rows live in or below this band.

### FAQ row
`<details>` row: Title question, chevron in Forest Green, 1px Hairline divider, answer in Body. On the band: white text, white-at-30% divider, white chevron.

### Footer
Paper (not dark), 1px Hairline above. Wordmark, email link in Forest Green, "by Origin3" and copyright in Moss Gray 13px.

### Status pill
Label type, pill shape. Mint Wash fill with Forest Green text (5.54:1) for "In the record" or "Pilot open". Amber Ink on an 8% amber tint `#F7EFEC` (6.44:1), Review Blue on `#EEF3FD` (4.65:1). Signal Red on Paper with a red outline (4.83:1; an 8% tint drops it to 4.28:1). Always carries a word.

## Do's and Don'ts

### Do
- Keep green to actions, figures, marks, icons and the wordmark.
- Draw a 1px Hairline wherever an edge must be seen; Moss Gray on controls.
- Use Mist to band sections; Mint Wash for stat tiles only.
- Use `prefers-reduced-motion: reduce` to switch off fade-up, reveal and the chat dot pulse.
- Write plain, direct copy: clear, not clever; respectful, not corporate; warm, not casual. No emoji.
- Check every new text and background pair for 4.5:1 before shipping.

### Don't
- Don't use navy, gold, gradients, grid or glow backgrounds, or a dark hero or footer.
- Don't use Mint or Leaf Green for text, or Mint on a light ground.
- Don't use Moss Gray on Mint Wash, or Signal Red on the green band.
- Don't add shadows to cards, buttons or tiles. Don't add left-border accent cards.
- Don't put a second green band, or a second primary button, in a section.
- Don't write "province-wide". Don't write text under 13px.

## Migrating govlens-landing

### (a) Variable map (`src/app/globals.css`)

| Variable | Old | New | Role |
|---|---|---|---|
| `--gl` | `#2563EB` | `#0F6E56` | Forest Green: buttons, links, figures, band |
| `--gl2` | `#3B82F6` | `#1D9E75` | Leaf Green: hover borders, dots, marks. Not text |
| `--glm` | `#93C5FD` | `#9FE1CB` | Mint: "Lens" on the band only |
| `--glbg` | `#EFF6FF` | `#E8F5F0` | Mint Wash: stat tiles only; elsewhere use `--surf` |
| `--glbg2` | `#DBEAFE` | `#E0ECE8` | Hairline-weight fill |
| `--navy` | `#0C1929` | retired | Dark sections are gone. Use white or `--surf` |
| `--gold` | `#C9A84C` | retired | Delete the accents. Use `--gl` only if it marks an action |
| `--dark` | `#1E293B` | `#1A2E22` | Ink (same as `--text`) |
| `--text` | `#1E293B` | `#1A2E22` | Ink |
| `--muted` | `#475569` | `#5A7A6E` | Moss Gray secondary text |
| `--sub` | `#64748B` | `#5A7A6E` | Same as muted: nothing lighter passes 4.5:1 |
| `--border` | `#E2E8F0` | `#E0ECE8` | Hairline, decorative only |
| `--surf` | `#F8FAFC` | `#F7FAF9` | Mist |
| `--white` | `#fff` | `#fff` | Paper |
| `--amber`, `--red` | unchanged | unchanged | Amber marks, Signal Red |
| `--outline` | new | `#5A7A6E` | Field and outlined-button borders (3:1) |
| `--amber-ink` | new | `#9A3412` | Amber text |
| `--blue` | new | `#2563EB` | Review Blue, information only |
| `--gl-hover` | new | `#0B5A46` | Primary button hover |

Replaced uses: navy backgrounds become white or `--surf` and text on them becomes `--text`; gold left-borders and rules are deleted; navy text becomes `--text`.

### (b) Paste-ready tokens (keeps every existing name)

```css
@theme {
  --color-gl:      #0F6E56;
  --color-gl2:     #1D9E75;
  --color-glm:     #9FE1CB;
  --color-glbg:    #E8F5F0;
  --color-glbg2:   #E0ECE8;
  --color-dark:    #1A2E22;
  --color-muted:   #5A7A6E;
  --color-sub:     #5A7A6E;
  --color-surf:    #F7FAF9;
  --color-border:  #E0ECE8;
  --color-outline: #5A7A6E;
  --color-amber-ink: #9A3412;
  --color-blue:    #2563EB;
  --font-sora:    var(--font-sora);
  --font-dm:      var(--font-dm-sans);
  --font-mono:    var(--font-jetbrains-mono);
}

:root {
  --gl:     #0F6E56;
  --gl2:    #1D9E75;
  --glm:    #9FE1CB;
  --glbg:   #E8F5F0;
  --glbg2:  #E0ECE8;
  --dark:   #1A2E22;
  --text:   #1A2E22;
  --muted:  #5A7A6E;
  --sub:    #5A7A6E;
  --border: #E0ECE8;
  --surf:   #F7FAF9;
  --white:  #fff;
  --amber:  #D97706;
  --red:    #DC2626;
  --outline:   #5A7A6E;
  --amber-ink: #9A3412;
  --blue:      #2563EB;
  --gl-hover:  #0B5A46;
}
```

`--color-navy`, `--color-gold`, `--navy` and `--gold` are left out on purpose. Anything still using them (`bg-navy`, `var(--gold)`) stops working, which is how you find it: `grep -rnE "navy|gold|C9A84C|0C1929" src`.

Replace these hard-coded blocks in the same file:

```css
/* delete: .hero-bg::before/::after, .hero-grid, .navy-grid, .problem-card::before, .cap-num */
.btn-primary { background: var(--gl); color: #fff; transition: background .2s; }
.btn-primary:hover { background: var(--gl-hover); }
.btn-outline { border: 1.5px solid var(--outline); color: var(--gl); }
.btn-inverse { background: #fff; color: var(--gl); }            /* on the green band only */
.card-hover:hover, .feat-card-hover:hover { border-color: var(--gl) !important; }
.steps-connector::before { background: var(--border); }          /* solid, no gradient */
.footer-link { color: var(--muted); } .footer-link:hover { color: var(--gl); }
input:focus, select:focus, textarea:focus { outline: 2px solid var(--gl); outline-offset: 2px; }
#pilot input:focus, #pilot select:focus, #pilot textarea:focus { outline-color: #fff; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .animate-fade-up, .animate-fade-up-delay, .animate-fade-up-2, .chat-dot { animation: none; }
  .reveal, .reveal-delay { opacity: 1; transform: none; transition: none; }
}
```

### (c) Checklist
- [ ] Replace `src/app/icon.svg` with the GovLens mark (`public/govlens-mark.svg`, from `govlens-frontend` `public/favicon.svg`). The current "GL" blue tile goes. Regenerate `favicon.ico` from the same mark.
- [ ] Raise 9 to 12px text to 13px: `text-[9px]`, `[10px]`, `[11px]`, `[12px]` (about 125 uses in `src`) and inline `fontSize: 9.5` and `10`. Scope the sed to `src/components` and `src/app/page.tsx`, then check wrapping.
- [ ] Footer: change `background: var(--dark)` to white with a 1px `--border` top, and fix its text colours.
- [ ] Pilot section (`PilotCTA.tsx`): keep as the single `--gl` band. Fields white with `--outline` border and `--text` text (today they are `rgba(255,255,255,.1)` with no real edge). Primary becomes `.btn-inverse`. Wordmark "Lens" in `--glm` at 20px or larger.
- [ ] Remove gold accents: `Problem.tsx` (gold left-border cards become Mint Wash stat tiles), `PilotForm.tsx`, `app/page.tsx`.
- [ ] Remove the hero gradients and grid, and the `navy-grid` sections; make those sections white or Mist.
- [ ] Remove shadows from `.card-hover`, `.cap-card`, `.btn-primary:hover`; keep one on the hero mockup frame.
- [ ] `--glbg` uses outside stat tiles (icon chips, hover fills) move to `--surf` or are removed.
- [ ] Fields in `PilotForm.tsx` that use `--border` as their outline move to `--outline`.
- [ ] Copy: `app/page.tsx` line 265 says "province-wide visibility"; reword (PRO-23). Footer reads "by Origin3".
- [ ] `/demo` already uses the green tokens (`--gl #0F6E56`) and its own dark app chrome. Leave it as is; do not apply the page rules to it.
- [ ] Add the reduced-motion block above, then check contrast of anything new with a script.
