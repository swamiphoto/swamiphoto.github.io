# Gallery Builder — Design Spec

**Date:** 2026-04-08  
**Status:** Approved

---

## Overview

A visual gallery builder accessible from the admin area. Three-panel layout: block builder on the left, toggleable photo library panel in the middle, live preview on the right. Galleries are stored as `galleries-config.json` in GCS, seeded from existing hardcoded `galleryData` on first load. The existing public gallery pages (`/galleries/[slug]`) are updated to read from GCS config instead of the hardcoded file.

---

## Layout

```
[Block Builder ~320px] [Library Panel ~280px, toggleable] [Live Preview flex]
```

### Block Builder (left, always visible)
- Gallery name (editable text input) + description (editable textarea) at top
- Thumbnail URL field (picked from library or typed)
- `+ Add Block` button → inline popover with block type options
- Ordered list of block cards, each with a drag handle (⠿) for reordering
- Each block card shows: type label, summary of content, variant picker, relevant fields
- For `stacked` / `masonry` blocks: list of assigned photos with `× remove` per photo, and `+ Add Photos` button that opens the library panel
- Save button at top right — writes to GCS

### Library Panel (middle, toggleable)
- Toggled by a `📷 Photos` button in the block builder header
- Thumbnail grid (same component as admin photo library)
- Search by filename/path + filter by gallery folder
- Drag photos from here onto a stacked/masonry block card to add them
- Upload button at bottom (same signed URL flow as admin)
- Fetched once on open, held in memory

### Live Preview (right, flex)
- Renders the actual `Gallery` component with current block state
- Updates on every change (debounced 300ms)
- `⤢ Expand` button collapses both left panels to full-width preview
- `⤡ Collapse` restores the panels

---

## Block Types and Fields

Matches exactly what `Gallery.js` already renders:

### `photo`
- `imageUrl` — string (required)
- `caption` — string (optional)
- `variant` — 1 (edge-to-edge full width) | 2 (centered 72%, rounded corners)

### `stacked`
- `imageUrls` — string[] (required, built from library drags/picks)
- No variant (layout is automatic: pairs verticals, alternates with horizontals)

### `masonry`
- `imageUrls` — string[] (required)
- No variant

### `text`
- `content` — string (required)
- `variant` — 1 (sans-serif) | 2 (serif font)

### `video`
- `url` — YouTube URL string (required)
- `caption` — string (optional)
- `variant` — 1 (edge-to-edge) | 2 (85% centered) | 3 (video + caption side by side)

---

## Data Model

A single JSON file stored in GCS at `galleries-config.json`:

```json
{
  "galleries": [
    {
      "name": "Arizona",
      "slug": "arizona",
      "description": "Over Christmas break...",
      "thumbnailUrl": "https://storage.googleapis.com/swamiphoto/photos/...",
      "enableSlideshow": true,
      "showCover": true,
      "slideshowSettings": {
        "youtubeLinks": [],
        "musicCredits": [],
        "layout": "kenburns"
      },
      "blocks": [
        { "type": "photo", "imageUrl": "https://...", "variant": 2 },
        { "type": "text", "content": "Some text", "variant": 1 },
        { "type": "stacked", "imageUrls": ["https://...", "https://..."] }
      ]
    }
  ]
}
```

Key notes:
- `imagesFolderUrl` blocks from the hardcoded data are expanded into `imageUrls[]` at seed time (same pattern as library config seeding)
- `excludeImageUrls` and `start`/`count` pagination fields are resolved at seed time — the builder works with explicit `imageUrls[]` only
- `isHidden` galleries (the admin gallery) are skipped at seed time
- On first load, if `galleries-config.json` doesn't exist in GCS, it is auto-generated from the hardcoded `galleryData`

---

## Routes

| Route | Purpose |
|---|---|
| `/admin/galleries` | List all galleries (cards with name, photo count, edit/delete) |
| `/admin/galleries/new` | Create a new gallery |
| `/admin/galleries/[slug]` | Edit an existing gallery |

### New API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/admin/galleries` | GET | Read `galleries-config.json` from GCS (seeds if missing) |
| `/api/admin/galleries` | PUT | Write full updated `galleries-config.json` to GCS |

### Updated Public Route

`pages/galleries/[gallerySlug].js` — `getStaticProps` currently reads from hardcoded `galleryData`. This needs to change to fetch from GCS at build time (or use ISR). Since this is a GitHub Pages / Vercel deployment, **ISR (revalidate: 60)** is the right approach — the page re-generates in the background when visited, so changes in the builder appear within ~60 seconds without a full redeploy.

---

## Page & Component Structure

```
pages/
  admin/
    galleries.js                     # Gallery list page
    galleries/
      new.js                         # New gallery builder
      [slug].js                      # Edit gallery builder

  api/admin/
    galleries.js                     # GET + PUT galleries-config.json

components/admin/gallery-builder/
  GalleryBuilder.js                  # Root: owns state, three-panel layout
  BlockBuilder.js                    # Left panel: gallery meta + block list
  BlockCard.js                       # Single block card (fields + drag handle)
  BlockTypeMenu.js                   # Inline popover for "+ Add Block"
  GalleryLibraryPanel.js             # Middle panel: photo picker (wraps existing library logic)
  GalleryPreview.js                  # Right panel: renders Gallery component live

common/
  galleriesConfig.js                 # Helpers: seed from hardcoded data, read/write GCS
```

---

## Drag and Drop

Use `@hello-pangea/dnd` (maintained fork of react-beautiful-dnd, already in package.json as `react-beautiful-dnd`). Two drag contexts:

1. **Block reordering** — `DragDropContext` wrapping the block list in BlockBuilder. Drag handle on each BlockCard.
2. **Photo-to-block** — dragging a thumbnail from GalleryLibraryPanel onto a stacked/masonry BlockCard. Implemented as HTML5 drag events (simpler than nested DnD contexts): `draggable` on library thumbnails, `onDrop` on block cards.

---

## Gallery List Page (`/admin/galleries`)

- Cards for each gallery: thumbnail, name, description snippet, block count
- "Edit" button → `/admin/galleries/[slug]`
- "New Gallery" button → `/admin/galleries/new`
- "Delete" button → confirm dialog → removes from config and saves

---

## Seeding from Hardcoded Data

`galleriesConfig.js` exports `seedGalleriesConfig(listGcsFolder)`:
- Iterates `galleryData` from `pages/galleries.js`
- Skips `isHidden: true` galleries
- For blocks with `imagesFolderUrl`: calls `listGcsFolder(folderPath)` to expand to `imageUrls[]`
- For blocks with `start`/`count`: slices the fetched URL array accordingly
- For blocks with `excludeImageUrls`: filters them out
- Preserves all other gallery-level fields (`enableSlideshow`, `slideshowSettings`, `clientSettings`, etc.)

---

## Live Preview Behavior

- `GalleryPreview` receives the current gallery state as props
- Renders `<Gallery>` with `blocks` passed in, after resolving `imagesFolderUrl` → `imageUrls` (not needed since builder always uses explicit `imageUrls[]`)
- Debounced 300ms so it doesn't re-render on every keystroke
- The `Gallery` component already handles all block rendering — no new rendering logic needed

---

## Out of Scope (this phase)

- Slideshow settings editor (music, YouTube links, layout picker)
- Client login settings
- `showCover` toggle
- Reordering photos within a stacked/masonry block (remove + re-add for now)
- Publishing / deploy trigger
