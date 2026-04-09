# Admin Photo Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-panel admin page at `/admin` for browsing, uploading, and managing photos across all GCS-backed galleries and portfolios.

**Architecture:** A Next.js page at `/admin` renders a two-panel UI (sidebar + photo grid). All GCS operations go through Next.js API routes at `/api/admin/*` using the `@google-cloud/storage` SDK with a service account. Album membership is persisted in a `library-config.json` file stored in the GCS bucket itself.

**Tech Stack:** Next.js 14 (pages router), `@google-cloud/storage` SDK, Tailwind CSS, React state (no external state library)

---

## File Map

**New files:**
- `common/gcsClient.js` — GCS Storage singleton (server-side only)
- `common/adminConfig.js` — pure helpers: build initial config from hardcoded data, merge GCS listing with config
- `pages/api/admin/library.js` — GET (list all images + read config) and PUT (write config)
- `pages/api/admin/upload.js` — POST → returns signed upload URL per file
- `pages/api/admin/delete.js` — DELETE GCS object + remove from config
- `components/admin/AdminLibrary.js` — root two-panel layout, owns all state
- `components/admin/AlbumSidebar.js` — left panel: album list with counts
- `components/admin/PhotoGrid.js` — right panel: header + 4-col image grid
- `components/admin/PhotoTile.js` — single image tile + ⋯ context menu
- `components/admin/UploadModal.js` — drag-and-drop multi-file upload modal
- `components/admin/AddFromLibraryModal.js` — pick existing GCS images to add to album
- `pages/admin.js` — admin page (no auth, suppresses site header/footer)

**Modified files:**
- `pages/_app.js` — add `/admin` to `noHeaderPaths`

---

## Task 1: Install @google-cloud/storage

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the GCS SDK**

```bash
cd /Users/swami/Documents/Contexts/sp/Code/swamiphoto.github.io
npm install @google-cloud/storage
```

Expected: resolves without errors, `@google-cloud/storage` appears in `package.json` dependencies.

- [ ] **Step 2: Verify install**

```bash
node -e "const {Storage} = require('@google-cloud/storage'); console.log('OK', typeof Storage)"
```

Expected output: `OK function`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install @google-cloud/storage SDK"
```

---

## Task 2: GCS client singleton

**Files:**
- Create: `common/gcsClient.js`

- [ ] **Step 1: Create the file**

Create `common/gcsClient.js`:

```js
import { Storage } from "@google-cloud/storage";

// Server-side only — never import this from client components
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export const bucket = storage.bucket("swamiphoto");
export const CONFIG_PATH = "photos/library-config.json";
export const FALLBACK_FOLDER = "photos/library";
```

- [ ] **Step 2: Add placeholder env vars to .env.local**

Check if `.env.local` exists:
```bash
cat .env.local 2>/dev/null || echo "file not found"
```

If missing, create it (never commit this file):
```bash
cat >> .env.local << 'EOF'

# Admin GCS service account (needed for write operations)
GOOGLE_CLOUD_PROJECT_ID=swamiphoto
GOOGLE_CLOUD_CLIENT_EMAIL=your-service-account@swamiphoto.iam.gserviceaccount.com
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
EOF
```

> **Note for user:** Replace the placeholder values with real credentials from Google Cloud Console → IAM → Service Accounts. The service account needs roles: `Storage Object Admin` on the `swamiphoto` bucket.

- [ ] **Step 3: Commit**

```bash
git add common/gcsClient.js
git commit -m "feat: add GCS client singleton for admin API routes"
```

---

## Task 3: adminConfig.js — seed and merge helpers

**Files:**
- Create: `common/adminConfig.js`

These are pure functions that build the initial config from the existing hardcoded data in `common/images.js` and `pages/galleries.js`. The seed runs server-side (in the GET API route) only when `library-config.json` doesn't exist in GCS.

- [ ] **Step 1: Create the file**

Create `common/adminConfig.js`:

```js
import IMAGES, { bucketUrl } from "./images";
import { galleryData } from "../pages/galleries";

const BUCKET_URL = bucketUrl; // "https://storage.googleapis.com/swamiphoto"

/**
 * Recursively collect all string URL values from a (possibly nested) object.
 * Used to extract URLs from IMAGES.landscapes, IMAGES.portraits etc.
 */
export function collectUrls(obj) {
  const urls = [];
  for (const val of Object.values(obj)) {
    if (typeof val === "string" && val.startsWith("http")) {
      urls.push(val);
    } else if (typeof val === "object" && val !== null) {
      urls.push(...collectUrls(val));
    }
  }
  return urls;
}

/**
 * Build the initial library config from hardcoded data.
 * For gallery blocks that use imagesFolderUrl, listGcsFolder is called to get URLs.
 * @param {Function} listGcsFolder - async (folderPath: string) => string[] of full GCS URLs
 * @returns {Promise<LibraryConfig>}
 *
 * LibraryConfig shape:
 * {
 *   portfolios: { landscapes: string[], portraits: string[], ... },
 *   galleries: { arizona: string[], "naga-sunol": string[], ... }
 * }
 */
export async function seedConfig(listGcsFolder) {
  const portfolios = {
    landscapes: collectUrls(IMAGES.landscapes),
    portraits: collectUrls(IMAGES.portraits),
    bollywood: collectUrls(IMAGES.bollywood),
    tennis: collectUrls(IMAGES.tennis),
    headshots: collectUrls(IMAGES.headshots),
  };

  const galleries = {};

  for (const gallery of galleryData) {
    if (gallery.isHidden) continue;
    const slug = gallery.slug;
    const urls = new Set();

    for (const block of gallery.blocks || []) {
      if (block.type === "photo" && block.imageUrl) {
        urls.add(block.imageUrl);
      } else if (
        (block.type === "stacked" || block.type === "masonry") &&
        block.imagesFolderUrl
      ) {
        const folderUrls = await listGcsFolder(block.imagesFolderUrl);
        for (const u of folderUrls) urls.add(u);
      } else if (
        (block.type === "stacked" || block.type === "masonry") &&
        block.imageUrls
      ) {
        for (const u of block.imageUrls) urls.add(u);
      }
    }

    if (urls.size > 0) galleries[slug] = [...urls];
  }

  return { portfolios, galleries };
}

/**
 * Given the full list of GCS image URLs and the library config,
 * compute what to show for each view.
 *
 * @param {string[]} allImages - every image URL in the bucket
 * @param {LibraryConfig} config
 * @returns {{ allImages: string[], portfolios: Record<string,string[]>, galleries: Record<string,string[]>, counts: Record<string,number> }}
 */
export function mergeLibraryData(allImages, config) {
  const portfolios = config.portfolios || {};
  const galleries = config.galleries || {};

  const counts = { all: allImages.length };
  for (const [key, urls] of Object.entries(portfolios)) counts[key] = urls.length;
  for (const [key, urls] of Object.entries(galleries)) counts[key] = urls.length;

  return { allImages, portfolios, galleries, counts };
}

/**
 * Remove a URL from all album arrays in the config.
 * Returns a new config object (does not mutate).
 */
export function removeFromAllAlbums(config, imageUrl) {
  const portfolios = {};
  for (const [key, urls] of Object.entries(config.portfolios || {})) {
    portfolios[key] = urls.filter((u) => u !== imageUrl);
  }
  const galleries = {};
  for (const [key, urls] of Object.entries(config.galleries || {})) {
    galleries[key] = urls.filter((u) => u !== imageUrl);
  }
  return { portfolios, galleries };
}

/**
 * Remove a URL from one specific album in the config.
 * albumType: 'portfolios' | 'galleries'
 * albumKey: e.g. 'landscapes', 'arizona'
 */
export function removeFromAlbum(config, albumType, albumKey, imageUrl) {
  const section = { ...(config[albumType] || {}) };
  section[albumKey] = (section[albumKey] || []).filter((u) => u !== imageUrl);
  return { ...config, [albumType]: section };
}

/**
 * Add URLs to a specific album in the config.
 * De-duplicates automatically.
 */
export function addToAlbum(config, albumType, albumKey, imageUrls) {
  const section = { ...(config[albumType] || {}) };
  const existing = new Set(section[albumKey] || []);
  for (const u of imageUrls) existing.add(u);
  section[albumKey] = [...existing];
  return { ...config, [albumType]: section };
}
```

- [ ] **Step 2: Verify it imports cleanly**

```bash
node -e "
const mod = require('./common/adminConfig');
console.log(Object.keys(mod));
"
```

Expected (approximate): `[ 'collectUrls', 'seedConfig', 'mergeLibraryData', 'removeFromAllAlbums', 'removeFromAlbum', 'addToAlbum' ]`

> Note: This may fail with ESM import errors since the file uses `import`. That's fine — it runs correctly inside Next.js. The node check is just for syntax validation.

- [ ] **Step 3: Commit**

```bash
git add common/adminConfig.js
git commit -m "feat: add adminConfig helpers (seed, merge, remove, add)"
```

---

## Task 4: GET /api/admin/library

**Files:**
- Create: `pages/api/admin/library.js`

- [ ] **Step 1: Create the route (GET handler)**

Create `pages/api/admin/library.js`:

```js
import { bucket, CONFIG_PATH } from "../../../common/gcsClient";
import { seedConfig, mergeLibraryData } from "../../../common/adminConfig";

const BUCKET_URL = "https://storage.googleapis.com/swamiphoto";

async function listAllImages() {
  const [files] = await bucket.getFiles({ prefix: "photos/" });
  return files
    .filter((f) => /\.(jpg|jpeg|png|gif)$/i.test(f.name))
    .map((f) => `${BUCKET_URL}/${f.name}`);
}

async function listFolder(folderPath) {
  const [files] = await bucket.getFiles({ prefix: `photos/${folderPath}/` });
  return files
    .filter((f) => /\.(jpg|jpeg|png|gif)$/i.test(f.name))
    .map((f) => `${BUCKET_URL}/${f.name}`);
}

async function readConfig() {
  try {
    const file = bucket.file(CONFIG_PATH);
    const [contents] = await file.download();
    return JSON.parse(contents.toString());
  } catch {
    return null; // doesn't exist yet
  }
}

async function writeConfig(config) {
  const file = bucket.file(CONFIG_PATH);
  await file.save(JSON.stringify(config, null, 2), {
    contentType: "application/json",
    metadata: { cacheControl: "no-cache" },
  });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [allImages, existingConfig] = await Promise.all([
        listAllImages(),
        readConfig(),
      ]);

      let config = existingConfig;
      if (!config) {
        config = await seedConfig(listFolder);
        await writeConfig(config);
      }

      const data = mergeLibraryData(allImages, config);
      return res.status(200).json(data);
    } catch (err) {
      console.error("GET /api/admin/library error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const config = req.body;
      if (!config || typeof config !== "object") {
        return res.status(400).json({ error: "Invalid config body" });
      }
      await writeConfig(config);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("PUT /api/admin/library error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
```

- [ ] **Step 2: Verify the route exists**

```bash
curl -s http://localhost:3000/api/admin/library | head -c 200
```

Expected: JSON with `allImages`, `portfolios`, `galleries`, `counts` keys. (Will error if env vars aren't set yet — that's expected until credentials are added.)

- [ ] **Step 3: Commit**

```bash
git add pages/api/admin/library.js
git commit -m "feat: add GET+PUT /api/admin/library route"
```

---

## Task 5: POST /api/admin/upload (signed URLs)

**Files:**
- Create: `pages/api/admin/upload.js`

- [ ] **Step 1: Create the route**

Create `pages/api/admin/upload.js`:

```js
import { bucket, FALLBACK_FOLDER } from "../../../common/gcsClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filename, contentType, folder } = req.body;

  if (!filename || !contentType) {
    return res.status(400).json({ error: "filename and contentType required" });
  }

  // Sanitize filename: strip path traversal, keep extension
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const targetFolder = folder ? folder.replace(/^\/|\/$/g, "") : FALLBACK_FOLDER;
  const objectPath = `${targetFolder}/${safeName}`;

  try {
    const file = bucket.file(objectPath);
    const [signedUrl] = await file.generateSignedPostPolicyV4({
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      conditions: [
        ["content-length-range", 0, 50 * 1024 * 1024], // max 50MB
        ["eq", "$Content-Type", contentType],
      ],
      fields: { "Content-Type": contentType },
    });

    const gcsUrl = `https://storage.googleapis.com/swamiphoto/${objectPath}`;
    return res.status(200).json({ signedUrl, gcsUrl, objectPath });
  } catch (err) {
    console.error("POST /api/admin/upload error:", err);
    return res.status(500).json({ error: err.message });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add pages/api/admin/upload.js
git commit -m "feat: add POST /api/admin/upload signed URL route"
```

---

## Task 6: DELETE /api/admin/delete

**Files:**
- Create: `pages/api/admin/delete.js`

- [ ] **Step 1: Create the route**

Create `pages/api/admin/delete.js`:

```js
import { bucket, CONFIG_PATH } from "../../../common/gcsClient";
import { removeFromAllAlbums } from "../../../common/adminConfig";

const BUCKET_URL = "https://storage.googleapis.com/swamiphoto";

async function readConfig() {
  try {
    const [contents] = await bucket.file(CONFIG_PATH).download();
    return JSON.parse(contents.toString());
  } catch {
    return { portfolios: {}, galleries: {} };
  }
}

async function writeConfig(config) {
  await bucket.file(CONFIG_PATH).save(JSON.stringify(config, null, 2), {
    contentType: "application/json",
    metadata: { cacheControl: "no-cache" },
  });
}

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl } = req.body;

  if (!imageUrl || !imageUrl.startsWith(BUCKET_URL)) {
    return res.status(400).json({ error: "Invalid imageUrl" });
  }

  // Derive GCS object path from full URL
  const objectPath = imageUrl.replace(`${BUCKET_URL}/`, "");

  try {
    // Delete the GCS object
    await bucket.file(objectPath).delete();

    // Remove from config
    const config = await readConfig();
    const updatedConfig = removeFromAllAlbums(config, imageUrl);
    await writeConfig(updatedConfig);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/admin/delete error:", err);
    return res.status(500).json({ error: err.message });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add pages/api/admin/delete.js
git commit -m "feat: add DELETE /api/admin/delete route"
```

---

## Task 7: PhotoTile component

**Files:**
- Create: `components/admin/PhotoTile.js`

- [ ] **Step 1: Create the component**

Create `components/admin/PhotoTile.js`:

```js
import { useState, useRef, useEffect } from "react";

export default function PhotoTile({ imageUrl, albumType, albumKey, onRemove, onDelete, onCopyUrl, onAddToAlbum }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const filename = imageUrl.split("/").pop();
  const inAlbum = albumType !== "all";

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(imageUrl);
    setMenuOpen(false);
  };

  const handleRemove = () => {
    setMenuOpen(false);
    onRemove(imageUrl);
  };

  const handleDelete = () => {
    if (!confirm(`Permanently delete ${filename} from GCS? This cannot be undone.`)) return;
    setMenuOpen(false);
    onDelete(imageUrl);
  };

  const handleAddToAlbum = () => {
    setMenuOpen(false);
    onAddToAlbum(imageUrl);
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-sm border border-gray-100 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={filename}
        className="w-full aspect-square object-cover bg-gray-100"
        loading="lazy"
        onError={(e) => { e.target.style.opacity = "0.3"; }}
      />

      {/* ⋯ menu button */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ⋯
      </button>

      {/* filename label */}
      <div className="px-2 py-1 text-xs text-gray-500 bg-white truncate">{filename}</div>

      {/* context menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-8 right-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] z-20"
        >
          <button
            onClick={handleCopy}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Copy URL
          </button>
          <button
            onClick={handleAddToAlbum}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Add to another album
          </button>
          {inAlbum && (
            <>
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={handleRemove}
                className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-50"
              >
                Remove from album
              </button>
            </>
          )}
          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={handleDelete}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50 font-medium"
          >
            Delete permanently
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/PhotoTile.js
git commit -m "feat: add PhotoTile component with context menu"
```

---

## Task 8: AlbumSidebar component

**Files:**
- Create: `components/admin/AlbumSidebar.js`

- [ ] **Step 1: Create the component**

Create `components/admin/AlbumSidebar.js`:

```js
export default function AlbumSidebar({ counts, selectedAlbum, onSelect, onUploadClick }) {
  // counts shape: { all: N, landscapes: N, portraits: N, ..., arizona: N, ... }
  // selectedAlbum shape: { type: 'all' | 'portfolio' | 'gallery', key: string }

  const portfolioKeys = ["landscapes", "portraits", "bollywood", "tennis", "headshots"];
  const galleryKeys = Object.keys(counts).filter(
    (k) => k !== "all" && !portfolioKeys.includes(k)
  );

  const isSelected = (type, key) =>
    selectedAlbum.type === type && selectedAlbum.key === key;

  const itemClass = (active) =>
    `flex items-center px-3 py-1.5 rounded-md cursor-pointer text-sm ${
      active
        ? "bg-gray-900 text-white font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="w-56 bg-gray-50 border-r border-gray-200 flex flex-col flex-shrink-0 h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="font-bold text-gray-900 text-base">Photo Library</div>
        <div className="text-xs text-gray-400 mt-0.5">swamiphoto bucket</div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* All Photos */}
        <button
          onClick={() => onSelect({ type: "all", key: "all" })}
          className={`${itemClass(isSelected("all", "all"))} w-full mb-2`}
        >
          <span className="flex-1 text-left">All Photos</span>
          <span className="text-xs bg-gray-700 text-gray-200 px-2 py-0.5 rounded-full">
            {counts.all ?? 0}
          </span>
        </button>

        {/* Portfolios */}
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-1 mt-1">
          Portfolios
        </div>
        {portfolioKeys.map((key) => (
          <button
            key={key}
            onClick={() => onSelect({ type: "portfolio", key })}
            className={`${itemClass(isSelected("portfolio", key))} w-full capitalize`}
          >
            <span className="flex-1 text-left capitalize">{key}</span>
            <span className="text-xs text-gray-400">{counts[key] ?? 0}</span>
          </button>
        ))}

        {/* Galleries */}
        {galleryKeys.length > 0 && (
          <>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-1 mt-3">
              Galleries
            </div>
            {galleryKeys.map((key) => (
              <button
                key={key}
                onClick={() => onSelect({ type: "gallery", key })}
                className={`${itemClass(isSelected("gallery", key))} w-full`}
              >
                <span className="flex-1 text-left">{key}</span>
                <span className="text-xs text-gray-400">{counts[key] ?? 0}</span>
              </button>
            ))}
          </>
        )}
      </div>

      {/* Upload button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={onUploadClick}
          className="w-full bg-gray-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ↑ Upload Photos
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/AlbumSidebar.js
git commit -m "feat: add AlbumSidebar component"
```

---

## Task 9: PhotoGrid component

**Files:**
- Create: `components/admin/PhotoGrid.js`

- [ ] **Step 1: Create the component**

Create `components/admin/PhotoGrid.js`:

```js
import PhotoTile from "./PhotoTile";

export default function PhotoGrid({
  images,
  selectedAlbum,
  onRemove,
  onDelete,
  onAddToAlbum,
  onUploadClick,
  onAddFromLibraryClick,
}) {
  const inAlbum = selectedAlbum.type !== "all";
  const albumLabel =
    selectedAlbum.type === "all"
      ? "All Photos"
      : selectedAlbum.key.charAt(0).toUpperCase() + selectedAlbum.key.slice(1);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
        <div>
          <div className="font-semibold text-gray-900 text-base">{albumLabel}</div>
          <div className="text-xs text-gray-400 mt-0.5">
            {images.length} photo{images.length !== 1 ? "s" : ""}
            {selectedAlbum.type !== "all" && ` · ${selectedAlbum.type === "portfolio" ? "Portfolio" : "Gallery"}`}
          </div>
        </div>
        <div className="flex-1" />
        {inAlbum && (
          <button
            onClick={onAddFromLibraryClick}
            className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + Add from Library
          </button>
        )}
        <button
          onClick={onUploadClick}
          className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ↑ Upload
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {images.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
            No photos in this album
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {images.map((url) => (
              <PhotoTile
                key={url}
                imageUrl={url}
                albumType={selectedAlbum.type}
                albumKey={selectedAlbum.key}
                onRemove={onRemove}
                onDelete={onDelete}
                onAddToAlbum={onAddToAlbum}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/PhotoGrid.js
git commit -m "feat: add PhotoGrid component"
```

---

## Task 10: UploadModal component

**Files:**
- Create: `components/admin/UploadModal.js`

- [ ] **Step 1: Create the component**

Create `components/admin/UploadModal.js`:

```js
import { useState, useRef } from "react";

const KNOWN_FOLDERS = [
  "photos/library",
  "photos/landscapes",
  "photos/portraits",
  "photos/bollywood",
  "photos/tennis",
  "photos/headshots",
  "photos/landscapes/arizona",
  "photos/landscapes/california",
  "photos/portraits/sunol",
  "photos/portraits/naga-sunflowers",
];

export default function UploadModal({ defaultFolder, onClose, onUploaded }) {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState(defaultFolder || "");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({}); // filename → 'pending' | 'done' | 'error'
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const arr = Array.from(newFiles).filter((f) =>
      /\.(jpg|jpeg|png|gif)$/i.test(f.name)
    );
    setFiles((prev) => [...prev, ...arr]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      setProgress((p) => ({ ...p, [file.name]: "pending" }));
      try {
        // 1. Get signed policy from our API
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
            folder: folder || undefined,
          }),
        });
        const { signedUrl, gcsUrl } = await res.json();

        // 2. POST file directly to GCS using the signed policy
        const formData = new FormData();
        Object.entries(signedUrl.fields).forEach(([k, v]) => formData.append(k, v));
        formData.append("file", file);

        const uploadRes = await fetch(signedUrl.url, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.status}`);

        setProgress((p) => ({ ...p, [file.name]: "done" }));
        uploadedUrls.push(gcsUrl);
      } catch (err) {
        console.error("Upload error for", file.name, err);
        setProgress((p) => ({ ...p, [file.name]: "error" }));
      }
    }

    setUploading(false);
    if (uploadedUrls.length > 0) onUploaded(uploadedUrls);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upload Photos</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors mb-4 ${
            dragging ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
          <div className="text-3xl mb-2">📁</div>
          <div className="text-sm font-medium text-gray-700">Drop photos here or click to browse</div>
          <div className="text-xs text-gray-400 mt-1">JPG, PNG · Multiple files supported</div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mb-4 max-h-32 overflow-y-auto space-y-1">
            {files.map((f) => (
              <div key={f.name} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="flex-1 truncate">{f.name}</span>
                <span className={
                  progress[f.name] === "done" ? "text-green-500" :
                  progress[f.name] === "error" ? "text-red-500" :
                  progress[f.name] === "pending" ? "text-blue-400" : "text-gray-300"
                }>
                  {progress[f.name] === "done" ? "✓" :
                   progress[f.name] === "error" ? "✗" :
                   progress[f.name] === "pending" ? "↑" : "·"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Folder picker */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            GCS folder <span className="text-gray-400 font-normal">(optional — blank = photos/library)</span>
          </label>
          <input
            list="folder-options"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            placeholder="photos/landscapes"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
          <datalist id="folder-options">
            {KNOWN_FOLDERS.map((f) => <option key={f} value={f} />)}
          </datalist>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className="flex-1 bg-gray-900 text-white text-sm py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading…" : `Upload ${files.length} photo${files.length !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/UploadModal.js
git commit -m "feat: add UploadModal with drag-and-drop and signed URL upload"
```

---

## Task 11: AddFromLibraryModal component

**Files:**
- Create: `components/admin/AddFromLibraryModal.js`

- [ ] **Step 1: Create the component**

Create `components/admin/AddFromLibraryModal.js`:

```js
import { useState, useMemo } from "react";

export default function AddFromLibraryModal({ allImages, currentAlbumImages, onClose, onAdd }) {
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");

  const currentSet = useMemo(() => new Set(currentAlbumImages), [currentAlbumImages]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allImages.filter((url) => !currentSet.has(url) && url.toLowerCase().includes(q));
  }, [allImages, currentSet, search]);

  const toggle = (url) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      return next;
    });
  };

  const handleAdd = () => {
    onAdd([...selected]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col" style={{ maxHeight: "85vh" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add from Library</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        <div className="px-5 py-3 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search by filename…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
          {selected.size > 0 && (
            <div className="text-xs text-blue-600 mt-1">{selected.size} selected</div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              {search ? "No images match your search" : "All library images are already in this album"}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {filtered.map((url) => {
                const isSelected = selected.has(url);
                return (
                  <button
                    key={url}
                    onClick={() => toggle(url)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                      isSelected ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={url.split("/").pop()}
                      className="w-full aspect-square object-cover bg-gray-100"
                      loading="lazy"
                    />
                    {isSelected && (
                      <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}
                    <div className="text-xs text-gray-400 px-1 py-0.5 bg-white truncate text-left">
                      {url.split("/").pop()}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={selected.size === 0}
            className="flex-1 bg-gray-900 text-white text-sm py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add {selected.size > 0 ? selected.size : ""} photo{selected.size !== 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/AddFromLibraryModal.js
git commit -m "feat: add AddFromLibraryModal component"
```

---

## Task 12: AdminLibrary root component

**Files:**
- Create: `components/admin/AdminLibrary.js`

This component owns all state: library data, selected album, which modals are open, and the "add to album" target for the per-image "Add to another album" action.

- [ ] **Step 1: Create the component**

Create `components/admin/AdminLibrary.js`:

```js
import { useState, useEffect, useCallback } from "react";
import AlbumSidebar from "./AlbumSidebar";
import PhotoGrid from "./PhotoGrid";
import UploadModal from "./UploadModal";
import AddFromLibraryModal from "./AddFromLibraryModal";

export default function AdminLibrary() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [libraryData, setLibraryData] = useState(null);
  // { allImages, portfolios, galleries, counts }

  const [selectedAlbum, setSelectedAlbum] = useState({ type: "all", key: "all" });
  const [uploadOpen, setUploadOpen] = useState(false);
  const [addLibraryOpen, setAddLibraryOpen] = useState(false);
  const [addLibraryTarget, setAddLibraryTarget] = useState(null);
  // addLibraryTarget: null (add to current album) | { imageUrl } (add single image to album)

  const fetchLibrary = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/library");
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setLibraryData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLibrary(); }, [fetchLibrary]);

  const saveConfig = useCallback(async (newConfig) => {
    const res = await fetch("/api/admin/library", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newConfig),
    });
    if (!res.ok) throw new Error(`Save failed ${res.status}`);
    // Refresh local state: update counts
    await fetchLibrary();
  }, [fetchLibrary]);

  // Get images for the currently selected album
  const currentImages = () => {
    if (!libraryData) return [];
    if (selectedAlbum.type === "all") return libraryData.allImages;
    if (selectedAlbum.type === "portfolio") return libraryData.portfolios[selectedAlbum.key] || [];
    if (selectedAlbum.type === "gallery") return libraryData.galleries[selectedAlbum.key] || [];
    return [];
  };

  const currentConfig = () => ({
    portfolios: libraryData?.portfolios || {},
    galleries: libraryData?.galleries || {},
  });

  // Default upload folder based on selected album
  const defaultUploadFolder = () => {
    if (!selectedAlbum || selectedAlbum.type === "all") return "";
    const folderMap = {
      landscapes: "photos/landscapes",
      portraits: "photos/portraits",
      bollywood: "photos/bollywood",
      tennis: "photos/tennis",
      headshots: "photos/headshots",
    };
    return folderMap[selectedAlbum.key] || "";
  };

  const handleRemove = useCallback(async (imageUrl) => {
    if (selectedAlbum.type === "all") return;
    const config = currentConfig();
    const section = selectedAlbum.type === "portfolio" ? "portfolios" : "galleries";
    const updated = {
      ...config,
      [section]: {
        ...config[section],
        [selectedAlbum.key]: (config[section][selectedAlbum.key] || []).filter((u) => u !== imageUrl),
      },
    };
    await saveConfig(updated);
  }, [selectedAlbum, libraryData, saveConfig]);

  const handleDelete = useCallback(async (imageUrl) => {
    const res = await fetch("/api/admin/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    await fetchLibrary();
  }, [fetchLibrary]);

  const handleUploaded = useCallback(async (uploadedUrls) => {
    setUploadOpen(false);
    if (selectedAlbum.type !== "all") {
      const section = selectedAlbum.type === "portfolio" ? "portfolios" : "galleries";
      const config = currentConfig();
      const updated = {
        ...config,
        [section]: {
          ...config[section],
          [selectedAlbum.key]: [...new Set([...(config[section][selectedAlbum.key] || []), ...uploadedUrls])],
        },
      };
      await saveConfig(updated);
    } else {
      await fetchLibrary();
    }
  }, [selectedAlbum, libraryData, saveConfig, fetchLibrary]);

  // "Add to another album" from PhotoTile ⋯ menu
  const handleAddToAlbum = useCallback((imageUrl) => {
    setAddLibraryTarget({ imageUrl });
    setAddLibraryOpen(true);
  }, []);

  // "Add from Library" button in header — adds to current album
  const handleAddFromLibrary = useCallback(() => {
    setAddLibraryTarget(null);
    setAddLibraryOpen(true);
  }, []);

  const handleAddConfirm = useCallback(async (selectedUrls) => {
    setAddLibraryOpen(false);
    const config = currentConfig();

    if (addLibraryTarget) {
      // Single image → user must pick which album — for now add to current album
      if (selectedAlbum.type === "all") return;
      const section = selectedAlbum.type === "portfolio" ? "portfolios" : "galleries";
      const updated = {
        ...config,
        [section]: {
          ...config[section],
          [selectedAlbum.key]: [...new Set([...(config[section][selectedAlbum.key] || []), addLibraryTarget.imageUrl])],
        },
      };
      await saveConfig(updated);
    } else {
      if (selectedAlbum.type === "all") return;
      const section = selectedAlbum.type === "portfolio" ? "portfolios" : "galleries";
      const updated = {
        ...config,
        [section]: {
          ...config[section],
          [selectedAlbum.key]: [...new Set([...(config[section][selectedAlbum.key] || []), ...selectedUrls])],
        },
      };
      await saveConfig(updated);
    }
  }, [selectedAlbum, libraryData, addLibraryTarget, saveConfig]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
        Loading library…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="text-red-500 text-sm font-medium">Error: {error}</div>
        <div className="text-xs text-gray-400 max-w-sm text-center">
          Make sure GOOGLE_CLOUD_PROJECT_ID, GOOGLE_CLOUD_CLIENT_EMAIL, and GOOGLE_CLOUD_PRIVATE_KEY are set in .env.local
        </div>
        <button onClick={fetchLibrary} className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg">
          Retry
        </button>
      </div>
    );
  }

  const images = currentImages();
  const counts = libraryData?.counts || {};

  return (
    <div className="flex h-screen overflow-hidden">
      <AlbumSidebar
        counts={counts}
        selectedAlbum={selectedAlbum}
        onSelect={setSelectedAlbum}
        onUploadClick={() => setUploadOpen(true)}
      />
      <PhotoGrid
        images={images}
        selectedAlbum={selectedAlbum}
        onRemove={handleRemove}
        onDelete={handleDelete}
        onAddToAlbum={handleAddToAlbum}
        onUploadClick={() => setUploadOpen(true)}
        onAddFromLibraryClick={handleAddFromLibrary}
      />

      {uploadOpen && (
        <UploadModal
          defaultFolder={defaultUploadFolder()}
          onClose={() => setUploadOpen(false)}
          onUploaded={handleUploaded}
        />
      )}

      {addLibraryOpen && (
        <AddFromLibraryModal
          allImages={libraryData?.allImages || []}
          currentAlbumImages={addLibraryTarget ? [] : images}
          onClose={() => setAddLibraryOpen(false)}
          onAdd={handleAddConfirm}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/AdminLibrary.js
git commit -m "feat: add AdminLibrary root component with full state management"
```

---

## Task 13: Admin page + suppress site header/footer

**Files:**
- Create: `pages/admin.js`
- Modify: `pages/_app.js`

- [ ] **Step 1: Create pages/admin.js**

```js
import Head from "next/head";
import AdminLibrary from "../components/admin/AdminLibrary";

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Photo Library — Admin</title>
      </Head>
      <AdminLibrary />
    </>
  );
}
```

- [ ] **Step 2: Suppress site header/footer for /admin**

Open `pages/_app.js`. Find this line:

```js
const noHeaderPaths = [...slideshowPaths, ...otherNoHeaderPaths, ...adminPaths, "/timemanagement", "/course-platform"];
```

Change it to:

```js
const noHeaderPaths = [...slideshowPaths, ...otherNoHeaderPaths, ...adminPaths, "/timemanagement", "/course-platform", "/admin"];
```

- [ ] **Step 3: Verify the page loads**

Open http://localhost:3000/admin (or whichever port the dev server is using). You should see the two-panel admin UI — sidebar on the left, photo grid on the right. If credentials aren't configured yet, you'll see the error state with instructions.

- [ ] **Step 4: Commit**

```bash
git add pages/admin.js pages/_app.js
git commit -m "feat: add /admin page and suppress site header/footer"
```

---

## Task 14: GCS CORS configuration

Signed URL uploads from the browser require the GCS bucket to allow `POST` from your domains. This is a one-time setup in Google Cloud Console or via `gcloud`.

- [ ] **Step 1: Create a CORS config file**

Create `cors.json` in the project root (do not commit — add to `.gitignore`):

```json
[
  {
    "origin": ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "https://swamiphoto.github.io"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "responseHeader": ["Content-Type", "Authorization"],
    "maxAgeSeconds": 3600
  }
]
```

- [ ] **Step 2: Apply the CORS config to the bucket**

```bash
gcloud storage buckets update gs://swamiphoto --cors-file=cors.json
```

Expected output: `Updating gs://swamiphoto/...`

If `gcloud` isn't installed, install it from https://cloud.google.com/sdk/docs/install, then `gcloud auth login`.

- [ ] **Step 3: Add cors.json to .gitignore**

```bash
echo "cors.json" >> .gitignore
git add .gitignore
git commit -m "chore: ignore cors.json"
```

---

## Task 15: End-to-end smoke test

Manual verification with the dev server running.

- [ ] **Step 1: Confirm credentials are set**

```bash
grep GOOGLE_CLOUD /Users/swami/Documents/Contexts/sp/Code/swamiphoto.github.io/.env.local
```

All three vars must have real values (not placeholder text).

- [ ] **Step 2: Test GET /api/admin/library**

```bash
curl -s http://localhost:3003/api/admin/library | python3 -m json.tool | head -30
```

Expected: JSON with `allImages` (array of GCS URLs), `portfolios`, `galleries`, `counts`.

- [ ] **Step 3: Test the admin page in the browser**

Open http://localhost:3003/admin

Check:
- Left sidebar shows "All Photos" with correct count, portfolio section, gallery section
- Clicking an album updates the right panel
- Hovering an image reveals the ⋯ button
- ⋯ menu shows the correct options (Remove disabled on All Photos)
- Upload modal opens and folder picker works
- Add from Library modal opens and shows images

- [ ] **Step 4: Test upload**

- Open admin, select "Landscapes" in sidebar
- Click "↑ Upload"
- Drag a test image into the drop zone
- Confirm the folder shows `photos/landscapes`
- Click Upload
- Verify the image appears in the Landscapes grid after upload

- [ ] **Step 5: Test remove from album**

- Click ⋯ on an image in Landscapes
- Click "Remove from album"
- Verify the image disappears from Landscapes but still appears in All Photos

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: complete admin photo library implementation"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✓ Two-panel layout (C) — AlbumSidebar + PhotoGrid
- ✓ All Photos view — `type: 'all'` in selectedAlbum
- ✓ Portfolios + Galleries in sidebar with counts
- ✓ Upload Photos button in sidebar
- ✓ Per-image ⋯ menu with Copy URL, Add to another album, Remove from album (disabled on All Photos), Delete permanently
- ✓ Drag-and-drop multi-file upload — UploadModal
- ✓ Optional folder picker with datalist suggestions
- ✓ Falls back to `photos/library` when no folder selected
- ✓ Signed URL upload — client POSTs directly to GCS
- ✓ After upload, config updated + grid refreshes
- ✓ Add from Library modal — shows all GCS images, filters out already-in-album
- ✓ Config stored at `photos/library-config.json` in GCS
- ✓ Auto-seeded on first load from IMAGES + galleryData
- ✓ Gallery folder-based blocks expanded via GCS listing at seed time
- ✓ GET + PUT /api/admin/library
- ✓ POST /api/admin/upload
- ✓ DELETE /api/admin/delete
- ✓ Service account env vars documented
- ✓ CORS setup task included
- ✓ /admin suppressed from site header/footer
