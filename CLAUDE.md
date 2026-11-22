# Project Rules — Portfolio (Nguyễn Minh Tân)

## Identity & Canonical Academic Copy
- **Name**: Nguyễn Minh Tân
- **Education**: 1st-year student at Da Nang University of Science and Technology (DUT), enrolled in the Talent Engineer Program — Information Technology (Data Science & Artificial Intelligence Orientation).
- **Location**: Da Nang, Vietnam (`GMT+7`).

## Tech Stack
- React + Vite + TypeScript + Tailwind CSS + `motion` (`motion/react`) + `lenis` + `lucide-react`

## Visual Identity & Theme System (Strict Priority)
- **Theme Architecture**: Editorial Technical Studio — **Light Mode is the default**, with a persistent, accessible **Dark Mode toggle switch** (saved in `localStorage`, respecting `prefers-color-scheme` on first visit).
- **Color Tokens (CSS Variables)**:
  - **Light Mode (Default)**:
    - Background: `#FAFAFB`
    - Surface / Elevated Card: `#FFFFFF`
    - Subtle Surface / Track: `#F0F1F4`
    - Border: `rgba(15, 23, 42, 0.08)`
    - Primary Text: `#0F172A`
    - Muted / Secondary Text: `#475569`
    - Primary Brand Accent: `#16A34A` (Deep Emerald — accessible contrast on light backgrounds)
  - **Dark Mode (Toggle)**:
    - Background: `#09090B`
    - Surface / Elevated Card: `#121216`
    - Subtle Surface / Track: `#1C1C22`
    - Border: `rgba(255, 255, 255, 0.08)`
    - Primary Text: `#F4F4F6`
    - Muted / Secondary Text: `#94A3B8`
    - Primary Brand Accent: `#22C55E` (Crisp Emerald)
- **Typography**: `Syne` (Display headings), `Inter` (Body copy), `JetBrains Mono` (Section indices, technical tags, metadata labels).
- **Anti-Slop Rules**:
  - NO purple/blue gradients, NO neon drop-shadow glows, NO emojis as icons, NO generic 3-column card grids, NO Unsplash placeholders.
  - NO arbitrary numeric skill bars (`70/100`, `50/100`), NO self-rated percentage scores, and NO `PROFICIENT` / `INTERMEDIATE` tier badges.
  - High contrast, crisp hairlines, generous whitespace, and editorial hierarchy across every section.

## Navigation & Section Numbering (Strict 1:1 Sync)
- Top navbar indices MUST match their corresponding section header indices across the entire site:
  - **Hero**: `[ 00 ]` (accessible via top-left `MT.` wordmark; omitted from nav links)
  - **Tech Stack**: `[ 01 ]` ↔ Navbar `01 STACK`
  - **Selected Work**: `[ 02 ]` ↔ Navbar `02 WORK`
  - **On The Record**: `[ 03 ]` ↔ Navbar `03 RECORD`
  - **Contact**: `[ 04 ]` ↔ Navbar `04 CONTACT`
- **Removed Sections**:
  - Do NOT include any `"LET'S BUILD SOMETHING."` display banner or giant kinetic text marquee.
  - Do NOT include a standalone `AFK Mode` / `Off-Duty Telemetry` section or an `AFK` navbar item. Limit personal/off-duty flavor to a single understated "Off the clock" line in the Contact section or footer.

## Section & Layout Specifications
- **Hero Section (`[ 00 ]`)**:
  - Eyebrow reflects DUT — 1st-Year Talent Engineer / IT (Data Science & AI Orientation).
  - Concise bio positioning as a 1st-year DUT Talent Engineer student in Information Technology (Data Science & AI Orientation), competitive programmer, and builder of production web apps.
  - Name in `Syne`, no trailing accent-colored period, beside the round avatar `public/avatar-img.jpg`. Vietnamese stacked marks (Ễ, Â) must never be clipped: `MaskLine` reserves `0.4em` top padding (offset by a negative margin) for them.
- **Tech Stack Section (`[ 01 ]` — Evidence-Backed Editorial Layout)**:
  - Dedicated, spacious two-column editorial section (left intro/context column, right structured stack column).
  - Organize technologies by engineering domain (`Systems & Algorithms`, `Frontend & Web`, `Backend & Infrastructure`, `Data & AI`).
  - Pair every technology entry directly with concrete proof (shipped product, competition milestone, or technical artifact) rather than scores or progress bars.
- **Selected Work Section (`[ 02 ]`)**:
  - Project action row MUST include a secondary `SOURCE CODE ↗` (GitHub) button alongside the primary `LAUNCH LIVE APP ↗` CTA so technical reviewers can inspect code architecture.
- **On The Record Section (`[ 03 ]`)**:
  - Keep engineering credentials and competitive milestones clean and evidence-led; reflect the exact academic program (`Talent Engineer Program — Information Technology, Data Science & Artificial Intelligence Orientation` at Da Nang University of Science and Technology).
  - Score cards (`IELTS 7.5`, `THPT 28/30`) show the number in red (`red-600` light / `red-500` dark) inside a ring that fills from 0 to `value / max` (IELTS max `9`, THPT max `30`) in sync with the count-up. `max` lives on each `stat` in `src/data/profile.ts`.
  - Bento row 3 on `lg`: GDGOC `6` cols, IELTS `3`, THPT `3`.
- **Contact & Socials Section (`[ 04 ]`)**:
  - Contacts / Social Links column sits cleanly on the right side of the layout.
  - Each social link row includes:
    1. Crisp brand SVG logo icon (`GitHub`, `Codeforces`, `LinkedIn`, `Facebook`)
    2. Platform name only (`GitHub`, `Codeforces`, `LinkedIn`, `Facebook`)
    3. Direct external link (`https://github.com/OriGiri1`, Codeforces, LinkedIn, Facebook) with external arrow icon.
  - **Strict Cleanliness Rule**: Remove all muted/gray handle subtitles inside the rows (NO `ORIGIRI`, NO `MINH-TAN-NGUYEN`, NO `NGUYEN.MINH.TAN` gray text).
  - Include one understated `OFF THE CLOCK //` single-line note in the left column or footer strip.

## Motion & Performance
- Animate ONLY GPU-composited properties (`transform`, `opacity`, `clip-path`). One allowed exception: the score rings animate SVG `pathLength` (a small stroke repaint).
- Always wrap the root app in `<MotionConfig reducedMotion="user">`.
- Disable custom cursor and magnetic hover effects on touch/coarse-pointer devices (`pointer: coarse`).
- Real assets live in `/public/assets/`. Always inspect `/public/assets/` before creating mockups.