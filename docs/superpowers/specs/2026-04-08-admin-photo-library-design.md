# Admin Photo Library — Design Spec

**Date:** 2026-04-08  
**Status:** Approved

---

## Overview

A two-panel admin page at `/admin` that serves as a central photo library. The left panel lists all albums (portfolios and galleries). The right panel shows images in the selected album as a grid. From here the user can upload new images, add existing library images to an album, remove images from an album, or permanently delete images from GCS.

---

## Layout

Light two-panel layout (Option C from brainstorm):

- **Left panel** (220px, `#fafafa` background): sticky sidebar with "All Photos" at top, then sections "Portfolios" and "Galleries", each listing albums with photo counts. "Upload Photos" button pinned to the bottom.
- **Right panel** (flex, white): header with album name + count, "+ Add from Library" and "↑ Upload" buttons, then a 4-column image grid. Each image tile shows a filename label and a `⋯` menu button.

---

## Image Grid — Per-Image Actions

Clicking `⋯` on an image opens a small context menu with:

1. **Copy URL** — copies the full GCS URL to clipboard
2. **Add to another album** — opens a modal to pick one or more albums to assign this image to
3. **Remove from [Album]** — removes the image from the current album only (not from GCS). Disabled on "All Photos" view.
4. **Delete permanently** — confirms, then deletes the GCS object and removes the image from all albums in the config

---

## Upload Flow

- "↑ Upload" button (or drag-and-drop onto the grid) opens an upload modal
- User can drag and drop multiple images (JPG, PNG)
- Optional GCS folder picker — defaults to the current album's folder, or blank (falls back to `photos/library/`)
- On submit: client calls `/api/admin/upload` to get a signed URL per file, then uploads each file directly from browser to GCS
- After upload: config is updated to add the new image to the current album (if one is selected), and the grid refreshes

---

## "Add from Library" Flow

- Opens a modal showing all images currently in GCS (full library, no filter)
- User clicks to select one or more images
- On confirm: selected images are added to the current album in the config JSON

---

## Data Model

A single JSON file stored in GCS at `photos/library-config.json`:

```json
{
  "portfolios": {
    "landscapes": ["photos/landscapes/fog.jpg", "photos/landscapes/astro.jpg"],
    "portraits": ["photos/portraits/amrita.jpeg"],
    "bollywood": ["photos/bollywood/alia.jpg"],
    "tennis": ["photos/tennis/novak.jpeg"],
    "headshots": ["photos/headshots/naga.jpg"]
  },
  "galleries": {
    "arizona": ["photos/landscapes/arizona/antelepe-canyon/AR503758.jpg"],
    "naga-sunol": ["photos/portraits/sunol/AR501526.jpg"]
  }
}
```

- All images in GCS are "in the library" — discovered by listing the bucket
- The config only tracks album membership
- "All Photos" view = everything in the bucket (config not needed)
- On first load, if the config doesn't exist, it is auto-generated from the existing hardcoded data in `common/images.js` and `pages/galleries.js`. Note: gallery blocks use `imagesFolderUrl` (a GCS folder path) not explicit image lists — seeding must call `fetchImageUrls(folder)` to expand these into individual URLs

---

## API Routes

All routes live under `/pages/api/admin/`:

| Route | Method | Purpose |
|---|---|---|
| `/api/admin/library` | GET | List all GCS objects + read `library-config.json` |
| `/api/admin/library` | PUT | Write updated `library-config.json` to GCS |
| `/api/admin/upload` | POST | Generate a signed upload URL for a single file |
| `/api/admin/delete` | DELETE | Delete a GCS object + remove from config |

All routes use the `@google-cloud/storage` Node.js SDK with a service account.

---

## Environment Variables Required

```
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_CLIENT_EMAIL=
GOOGLE_CLOUD_PRIVATE_KEY=
```

These go in `.env.local` (already gitignored). The existing `GOOGLE_CLOUD_STORAGE_API_KEY` (read-only) continues to be used by the public-facing site — these new vars are only used by admin API routes.

---

## GCS Bucket Considerations

- Signed upload URLs require the service account to have `storage.objects.create` permission on the bucket
- Permanent delete requires `storage.objects.delete`
- Read (`list` + `get`) for the config requires `storage.objects.get` and `storage.objects.list`
- CORS must allow PUT from `localhost` and the production domain for signed URL uploads to work

---

## Page & Component Structure

```
pages/
  admin.js                        # Main admin page (no auth for now)
  api/admin/
    library.js                    # GET + PUT config
    upload.js                     # POST → signed URL
    delete.js                     # DELETE GCS object

components/admin/
  AdminLibrary.js                 # Root two-panel layout
  AlbumSidebar.js                 # Left panel — album list
  PhotoGrid.js                    # Right panel — image grid
  PhotoTile.js                    # Single image tile + ⋯ menu
  UploadModal.js                  # Drag-and-drop upload modal
  AddFromLibraryModal.js          # Pick existing images to add to album

common/
  adminConfig.js                  # Helpers: seed config from hardcoded data,
                                  # merge GCS listing with config
```

---

## Out of Scope (for this phase)

- Authentication / password protection of `/admin`
- Reordering images within an album
- Editing captions or other metadata
- Bulk remove/delete from grid (select multiple)
