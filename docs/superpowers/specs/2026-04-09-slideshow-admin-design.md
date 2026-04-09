# Slideshow Admin Design

## Goal

Add a slideshow admin interface to the gallery builder so users can configure the slideshow (cover, images, music, theme) for any gallery, preview it live, and publish changes through the existing draft/publish flow.

## Architecture

The slideshow admin is a separate page at `/admin/galleries/[slug]/slideshow` that mirrors the two-panel layout of the gallery builder: a left sidebar with collapsible block cards, and a right panel showing the live Slideshow component. Changes autosave as part of the gallery's existing draft mechanism and are promoted via the same Publish button.

## Data Model

`slideshowSettings` inside each gallery object gains the following fields alongside the existing `layout`, `duration`, `customDurations`:

```js
slideshowSettings: {
  // existing — unchanged
  layout: "kenburns",       // "kenburns" | "film-stack" | "film-single"
  duration: 10000,
  customDurations: {},

  // single track (replaces youtubeLinks[])
  youtubeLink: "",          // one YouTube URL
  musicCredit: "",          // one human-readable credit string

  // slideshow identity
  coverImageUrl: "",        // explicit photo URL (replaces coverImageIndex)
  title: "",                // defaults to gallery.name, editable
  description: "",          // defaults to gallery.description, editable

  // exclusions
  excludedImageUrls: [],    // stable URL list — excluded from slideshow
}
```

**Backward compat:** if `youtubeLink` is absent but `youtubeLinks[]` exists, use `youtubeLinks[0]`. The slideshow render page already handles this gracefully.

## Entry Point — Gallery Info Toggle

In `BlockBuilder` Gallery Info card, add two items:

1. **"Include slideshow and music" toggle** — maps to `gallery.enableSlideshow` (boolean). Same toggle style as the existing Unlisted toggle.
2. **"Customize slideshow →" link** — visible only when `enableSlideshow` is true. A small text link that navigates to `/admin/galleries/[slug]/slideshow`. Disabled (greyed) if gallery has no slug yet.

## New Page: `/admin/galleries/[slug]/slideshow`

### File: `pages/admin/galleries/[slug]/slideshow.js`

Loads the full galleries config (same fetch as `[slug].js`), finds the gallery by slug, renders `SlideshowBuilder`. Handles loading/error states identically to the gallery edit page.

### Component: `components/admin/slideshow-builder/SlideshowBuilder.js`

Two-panel layout matching GalleryBuilder:

- **Left:** `SlideshowSidebar` (fixed 288px, same style as BlockBuilder)
- **Right:** Live `Slideshow` component fed by derived `slides` and current `slideshowSettings`

Same autosave logic as GalleryBuilder: 1.5s debounce writing `slideshowSettings` into the gallery draft. Same Publish button promoting draft → published.

## Sidebar Blocks

Three collapsible white cards, same style as BlockCard.

### 1. Cover Card

- **Theme** — three pill buttons: "Ken Burns" / "Film Stack" / "Film Single" → `slideshowSettings.layout`
- **Cover photo** — thumbnail picker (reuses existing PhotoPickerModal, single select) → `slideshowSettings.coverImageUrl`
- **Title** — text input, pre-populated from `gallery.name` → `slideshowSettings.title`
- **Description** — textarea, pre-populated from `gallery.description` → `slideshowSettings.description`

### 2. Images Card

- Collects all image URLs from gallery blocks in order: `photo.imageUrl`, then all URLs from `stacked`/`masonry` blocks
- Renders as a 3-col grid (same thumbnail style as BlockCard photos grid)
- **Right-click** on a thumbnail → small context menu with "Exclude from slideshow" / "Include in slideshow"
- Excluded photos: 0.3 opacity + small `✕` badge overlay
- Exclusion state stored in `slideshowSettings.excludedImageUrls[]` — adding a URL excludes it, removing re-includes it

### 3. Music Card

- **Preset dropdown** — 20 tracks from existing YouTube library, each with a human-readable label:

  | Label | YouTube ID |
  |---|---|
  | Eléana — Richard Clayderman | IvoAT-5HKwM |
  | Piano Relaxing | PYujyluMxMU |
  | Soft Piano | qj4RiKoARPk |
  | Calm Instrumental | BciS5krYL80 |
  | Gentle Piano | _iktURk0X-A |
  | Peaceful Music | BeUSuSXBqMQ |
  | Ambient Piano | JkfSV51U-64 |
  | Relaxing Piano | puOnVzlkrQM |
  | Soft Instrumental | hzGHrQBq_i4 |
  | Tranquil Music | 6P5zx_rxlhI |
  | Calm Piano | Kpjo3Cxc_90 |
  | Peaceful Instrumental | OBUauvQLrQQ |
  | Soft Ambient | OhswLOVzXNc |
  | Gentle Instrumental | S61L1fpqFXE |
  | Relaxing Ambient | ZTmF2v59CtI |
  | Calm Instrumental 2 | LD5W8W7-0II |
  | Piano Meditation | U1FZVpcKhGg |
  | Soft Piano 2 | qmBW9-fUvag |
  | Ambient 2 | g4M0hH1R2eU |
  | Gentle Ambient | mVsmFCgxc1o |
  | **Custom URL…** | — |

- Selecting a preset fills `slideshowSettings.youtubeLink` and auto-fills `slideshowSettings.musicCredit` with the label (editable)
- Selecting "Custom URL…" shows: YouTube URL input + music credit label input, both free-form

## Right Panel — Live Preview

Renders the existing `Slideshow` component with:

```js
slides = allGalleryImages
  .filter(url => !excludedImageUrls.includes(url))
  .map(url => ({ type: "image", url }))

// prepend cover slide if coverImageUrl is set
if (coverImageUrl) slides = [{ type: "image", url: coverImageUrl }, ...slides]
```

Props passed: `slides`, `layout`, `title`, `subtitle` (description), `youtubeUrl` (youtubeLink), `thumbnailUrl` (coverImageUrl), `musicCredits` ([musicCredit])

The preview is live — changing any setting in the sidebar (theme, exclusions, music) immediately updates the preview.

## Navigation

- Slideshow admin header: "← Gallery" back link to `/admin/galleries/[slug]`
- Gallery builder Gallery Info: "Customize slideshow →" navigates forward to slideshow admin

## Files to Create

- `pages/admin/galleries/[slug]/slideshow.js`
- `components/admin/slideshow-builder/SlideshowBuilder.js`
- `components/admin/slideshow-builder/SlideshowSidebar.js`

## Files to Modify

- `components/admin/gallery-builder/BlockBuilder.js` — add enableSlideshow toggle + Customize link
- `pages/galleries/[gallerySlug]/slideshow.js` — add backward compat for `youtubeLink` (single) vs `youtubeLinks[]`
