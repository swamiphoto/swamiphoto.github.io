# Gallery Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a visual three-panel gallery builder in the admin area backed by `galleries-config.json` in GCS, and update public gallery pages to read from GCS with ISR instead of hardcoded data.

**Architecture:** `common/galleriesConfig.js` provides GCS read/write helpers. The API route at `/api/admin/galleries` seeds from hardcoded `galleryData` on first load. The builder (`GalleryBuilder.js`) owns all state; `BlockBuilder` (left), `GalleryLibraryPanel` (middle, toggleable), and `GalleryPreview` (right) are panels. Public gallery pages switch from static build-time data to ISR (revalidate: 60) fetching from GCS.

**Tech Stack:** Next.js 14 (pages router), React, Tailwind CSS, `@google-cloud/storage`, `react-beautiful-dnd` (block reordering), HTML5 drag events (photos-to-blocks), ISR.

---

## File Structure

**New files:**
- `common/galleriesConfig.js` — GCS read/write for `galleries-config.json`
- `pages/api/admin/galleries.js` — GET (read or seed) + PUT (write) galleries config
- `pages/admin/galleries.js` — Gallery list page
- `pages/admin/galleries/new.js` — New gallery builder page
- `pages/admin/galleries/[slug].js` — Edit gallery builder page
- `components/admin/gallery-builder/GalleryBuilder.js` — Root: owns state, three-panel layout
- `components/admin/gallery-builder/BlockBuilder.js` — Left panel: gallery meta + block list
- `components/admin/gallery-builder/BlockCard.js` — Single block card (fields + drag handle)
- `components/admin/gallery-builder/BlockTypeMenu.js` — Popover for "+ Add Block"
- `components/admin/gallery-builder/GalleryLibraryPanel.js` — Middle panel: photo picker
- `components/admin/gallery-builder/GalleryPreview.js` — Right panel: live preview

**Modified files:**
- `pages/_app.js` — Add admin gallery paths to `noHeaderPaths`
- `pages/galleries/[gallerySlug].js` — Switch to ISR + GCS config with hardcoded fallback

---

## Task 1: GCS Config Helper + API Route

**Files:**
- Create: `common/galleriesConfig.js`
- Create: `pages/api/admin/galleries.js`

The config JSON lives at `galleries-config.json` in the `swamiphoto` GCS bucket (no `photos/` prefix). The seeding function expands `imagesFolderUrl` blocks into explicit `imageUrls[]` arrays, resolving `start`/`count` pagination and `excludeImageUrls` filtering.

- [ ] **Step 1: Create `common/galleriesConfig.js`**

```js
// common/galleriesConfig.js
import { bucket } from "./gcsClient";

const GALLERIES_CONFIG_PATH = "galleries-config.json";

export async function readGalleriesConfig() {
  try {
    const file = bucket.file(GALLERIES_CONFIG_PATH);
    const [contents] = await file.download();
    return JSON.parse(contents.toString());
  } catch {
    return null;
  }
}

export async function writeGalleriesConfig(config) {
  const file = bucket.file(GALLERIES_CONFIG_PATH);
  await file.save(JSON.stringify(config, null, 2), {
    contentType: "application/json",
    metadata: { cacheControl: "no-cache" },
  });
}
```

- [ ] **Step 2: Create `pages/api/admin/galleries.js`**

```js
// pages/api/admin/galleries.js
import { bucket } from "../../../common/gcsClient";
import { readGalleriesConfig, writeGalleriesConfig } from "../../../common/galleriesConfig";
import { galleryData } from "../../galleries";

const BUCKET_URL = "https://storage.googleapis.com/swamiphoto";

async function listGcsFolder(folderPath) {
  // folderPath is like "landscapes/arizona/canyon" — relative to "photos/"
  const [files] = await bucket.getFiles({ prefix: `photos/${folderPath}/` });
  return files
    .filter((f) => /\.(jpg|jpeg|png|gif)$/i.test(f.name))
    .map((f) => `${BUCKET_URL}/${f.name}`);
}

async function seedGalleriesConfig() {
  const galleries = [];

  for (const gallery of galleryData) {
    if (gallery.isHidden) continue;

    const processedBlocks = await Promise.all(
      (gallery.blocks || []).map(async (block) => {
        if ((block.type === "stacked" || block.type === "masonry") && block.imagesFolderUrl) {
          let urls = await listGcsFolder(block.imagesFolderUrl);
          urls = urls.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
          if (typeof block.start === "number") {
            urls = block.count === -1
              ? urls.slice(block.start)
              : urls.slice(block.start, block.start + block.count);
          }
          if (block.excludeImageUrls?.length) {
            const excluded = new Set(block.excludeImageUrls);
            urls = urls.filter((u) => !excluded.has(u));
          }
          return { type: block.type, imageUrls: urls };
        }
        if ((block.type === "stacked" || block.type === "masonry") && block.imageUrls) {
          return { type: block.type, imageUrls: block.imageUrls };
        }
        if (block.type === "photo") {
          const out = { type: "photo", imageUrl: block.imageUrl || "", variant: block.variant || 1 };
          if (block.caption) out.caption = block.caption;
          return out;
        }
        if (block.type === "text") {
          return { type: "text", content: block.content || "", variant: block.variant || 1 };
        }
        if (block.type === "video") {
          const out = { type: "video", url: block.url || "", variant: block.variant || 1 };
          if (block.caption) out.caption = block.caption;
          return out;
        }
        return block;
      })
    );

    const seeded = {
      name: gallery.name,
      slug: gallery.slug,
      description: gallery.description || "",
      thumbnailUrl: gallery.thumbnailUrl || "",
      enableSlideshow: gallery.enableSlideshow || false,
      showCover: gallery.showCover !== false,
      slideshowSettings: gallery.slideshowSettings || {
        youtubeLinks: [],
        musicCredits: [],
        layout: "kenburns",
      },
      blocks: processedBlocks,
    };
    if (gallery.clientSettings) seeded.clientSettings = gallery.clientSettings;
    galleries.push(seeded);
  }

  return { galleries };
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let config = await readGalleriesConfig();
      if (!config) {
        config = await seedGalleriesConfig();
        await writeGalleriesConfig(config);
      }
      return res.status(200).json(config);
    } catch (err) {
      console.error("GET /api/admin/galleries error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const config = req.body;
      if (!config || !Array.isArray(config.galleries)) {
        return res.status(400).json({ error: "Invalid config: must have galleries array" });
      }
      await writeGalleriesConfig(config);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("PUT /api/admin/galleries error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
```

- [ ] **Step 3: Verify API works**

Run: `npm run dev`
Visit: `http://localhost:3000/api/admin/galleries` in browser.

Expected: First visit returns JSON `{ galleries: [...] }` seeded from hardcoded data. Subsequent visits return the cached GCS config. No 500 errors.

- [ ] **Step 4: Commit**

```bash
git add common/galleriesConfig.js pages/api/admin/galleries.js
git commit -m "feat: add galleries GCS config helper and API route"
```

---

## Task 2: Gallery List Admin Page

**Files:**
- Create: `pages/admin/galleries.js`

Gallery cards with thumbnail, name, description snippet, block count. Edit and Delete buttons. "New Gallery" button links to `/admin/galleries/new`.

- [ ] **Step 1: Create `pages/admin/galleries.js`**

```js
// pages/admin/galleries.js
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminGalleriesPage() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/galleries")
      .then((r) => (r.ok ? r.json() : Promise.reject(`API error ${r.status}`)))
      .then(setConfig)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm(`Delete gallery "${slug}"? This cannot be undone.`)) return;
    const updated = {
      galleries: config.galleries.filter((g) => g.slug !== slug),
    };
    const res = await fetch("/api/admin/galleries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) setConfig(updated);
    else alert("Delete failed");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
        Loading galleries…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-sm">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Galleries — Admin</title>
      </Head>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Galleries</h1>
            <p className="text-sm text-gray-400 mt-1">
              {config.galleries.length} {config.galleries.length === 1 ? "gallery" : "galleries"}
            </p>
          </div>
          <Link
            href="/admin/galleries/new"
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            + New Gallery
          </Link>
        </div>

        {config.galleries.length === 0 ? (
          <div className="text-gray-400 text-sm">
            No galleries yet.{" "}
            <Link href="/admin/galleries/new" className="text-gray-600 underline">
              Create one
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.galleries.map((gallery) => (
              <div
                key={gallery.slug}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
              >
                {gallery.thumbnailUrl ? (
                  <img
                    src={gallery.thumbnailUrl}
                    alt={gallery.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
                    No thumbnail
                  </div>
                )}
                <div className="p-4">
                  <div className="font-semibold text-gray-900 text-sm">{gallery.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                    {gallery.description || "No description"}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    {gallery.blocks?.length || 0} block{gallery.blocks?.length !== 1 ? "s" : ""}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link
                      href={`/admin/galleries/${gallery.slug}`}
                      className="flex-1 text-center text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(gallery.slug)}
                      className="text-sm text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify list page**

Visit: `http://localhost:3000/admin/galleries`

Expected: Gallery cards grid. Each card shows thumbnail, name, description, block count, Edit and Delete buttons. "+ New Gallery" button in top right. No header/footer (added in Task 7 — if header shows, that's OK for now).

- [ ] **Step 3: Commit**

```bash
git add pages/admin/galleries.js
git commit -m "feat: add gallery list admin page"
```

---

## Task 3: BlockTypeMenu + BlockCard Components

**Files:**
- Create: `components/admin/gallery-builder/BlockTypeMenu.js`
- Create: `components/admin/gallery-builder/BlockCard.js`

`BlockTypeMenu` is a popover with 5 block type options. `BlockCard` renders fields for one block and handles HTML5 drag-drop to receive photo URLs.

- [ ] **Step 1: Create `components/admin/gallery-builder/BlockTypeMenu.js`**

```js
// components/admin/gallery-builder/BlockTypeMenu.js
import { useEffect, useRef } from "react";

const BLOCK_TYPES = [
  { type: "photo", label: "Photo", desc: "Single photo with optional caption" },
  { type: "stacked", label: "Stacked", desc: "Alternating pairs of photos" },
  { type: "masonry", label: "Masonry", desc: "Grid in masonry layout" },
  { type: "text", label: "Text", desc: "Text between photos" },
  { type: "video", label: "Video", desc: "YouTube video embed" },
];

export function defaultBlock(type) {
  switch (type) {
    case "photo":
      return { type: "photo", imageUrl: "", caption: "", variant: 1 };
    case "stacked":
      return { type: "stacked", imageUrls: [] };
    case "masonry":
      return { type: "masonry", imageUrls: [] };
    case "text":
      return { type: "text", content: "", variant: 1 };
    case "video":
      return { type: "video", url: "", caption: "", variant: 1 };
    default:
      return { type };
  }
}

export default function BlockTypeMenu({ onAdd, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 w-64 py-1"
    >
      {BLOCK_TYPES.map(({ type, label, desc }) => (
        <button
          key={type}
          onClick={() => {
            onAdd(defaultBlock(type));
            onClose();
          }}
          className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors"
        >
          <div className="text-sm font-medium text-gray-800">{label}</div>
          <div className="text-xs text-gray-400">{desc}</div>
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/admin/gallery-builder/BlockCard.js`**

```js
// components/admin/gallery-builder/BlockCard.js

const TYPE_LABELS = {
  photo: "Photo",
  stacked: "Stacked Gallery",
  masonry: "Masonry Gallery",
  text: "Text",
  video: "Video",
};

function VariantPicker({ value, options, onChange }) {
  return (
    <div className="flex gap-1.5 flex-wrap mt-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
            value === opt.value
              ? "bg-gray-900 text-white border-gray-900"
              : "border-gray-200 text-gray-500 hover:border-gray-400"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function BlockCard({
  block,
  dragHandleProps,
  onUpdate,
  onRemove,
  onAddPhotos,
  onRemovePhoto,
}) {
  const isPhotoBlock = block.type === "stacked" || block.type === "masonry";

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const url = e.dataTransfer.getData("text/plain");
    if (url && isPhotoBlock && !(block.imageUrls || []).includes(url)) {
      onUpdate({ ...block, imageUrls: [...(block.imageUrls || []), url] });
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-4 mb-3"
      onDragOver={isPhotoBlock ? handleDragOver : undefined}
      onDrop={isPhotoBlock ? handleDrop : undefined}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 mb-3">
        <span
          {...dragHandleProps}
          className="text-gray-300 cursor-grab hover:text-gray-500 text-base leading-none select-none"
        >
          ⠿
        </span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex-1">
          {TYPE_LABELS[block.type] || block.type}
        </span>
        <button
          onClick={onRemove}
          className="text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          × Remove
        </button>
      </div>

      {/* Photo block */}
      {block.type === "photo" && (
        <div className="space-y-2">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
            placeholder="Image URL"
            value={block.imageUrl || ""}
            onChange={(e) => onUpdate({ ...block, imageUrl: e.target.value })}
          />
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
            placeholder="Caption (optional)"
            value={block.caption || ""}
            onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
          />
          <VariantPicker
            value={block.variant || 1}
            options={[
              { value: 1, label: "Edge to edge" },
              { value: 2, label: "Centered 72%" },
            ]}
            onChange={(v) => onUpdate({ ...block, variant: v })}
          />
        </div>
      )}

      {/* Stacked / Masonry block */}
      {isPhotoBlock && (
        <div className="space-y-2">
          <div className="text-xs text-gray-400">
            Drag photos from the library panel, or click + Add Photos
          </div>
          {(block.imageUrls || []).length > 0 && (
            <div className="grid grid-cols-3 gap-1.5">
              {(block.imageUrls || []).map((url) => (
                <div key={url} className="relative aspect-square rounded overflow-hidden group">
                  <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
                  <button
                    onClick={() => onRemovePhoto(url)}
                    className="absolute top-0.5 right-0.5 bg-black/60 text-white text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={onAddPhotos}
            className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + Add Photos
          </button>
        </div>
      )}

      {/* Text block */}
      {block.type === "text" && (
        <div className="space-y-2">
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400 resize-none"
            placeholder="Text content"
            rows={3}
            value={block.content || ""}
            onChange={(e) => onUpdate({ ...block, content: e.target.value })}
          />
          <VariantPicker
            value={block.variant || 1}
            options={[
              { value: 1, label: "Sans-serif" },
              { value: 2, label: "Serif" },
            ]}
            onChange={(v) => onUpdate({ ...block, variant: v })}
          />
        </div>
      )}

      {/* Video block */}
      {block.type === "video" && (
        <div className="space-y-2">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
            placeholder="YouTube URL"
            value={block.url || ""}
            onChange={(e) => onUpdate({ ...block, url: e.target.value })}
          />
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
            placeholder="Caption (optional)"
            value={block.caption || ""}
            onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
          />
          <VariantPicker
            value={block.variant || 1}
            options={[
              { value: 1, label: "Edge to edge" },
              { value: 2, label: "85% centered" },
              { value: 3, label: "Video + caption" },
            ]}
            onChange={(v) => onUpdate({ ...block, variant: v })}
          />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify components exist and have no syntax errors**

Run: `node -e "require('./components/admin/gallery-builder/BlockTypeMenu.js')" 2>&1 || echo "check next.js context"`

Since these are React components, verify by importing in the next task when BlockBuilder renders them. For now, check that no obvious syntax errors exist by reviewing the files.

- [ ] **Step 4: Commit**

```bash
git add components/admin/gallery-builder/BlockTypeMenu.js components/admin/gallery-builder/BlockCard.js
git commit -m "feat: add BlockTypeMenu and BlockCard components"
```

---

## Task 4: BlockBuilder (Left Panel)

**Files:**
- Create: `components/admin/gallery-builder/BlockBuilder.js`

Left panel (~320px wide). Contains gallery meta inputs (name, description, thumbnailUrl), a "📷 Photos" toggle button, a Save button, and a drag-reorderable list of BlockCards. Uses `react-beautiful-dnd` for block reordering.

- [ ] **Step 1: Create `components/admin/gallery-builder/BlockBuilder.js`**

```js
// components/admin/gallery-builder/BlockBuilder.js
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BlockCard from "./BlockCard";
import BlockTypeMenu, { defaultBlock } from "./BlockTypeMenu";

export default function BlockBuilder({
  gallery,
  onChange,
  onSave,
  saving,
  onToggleLibrary,
  libraryOpen,
  onAddPhotosToBlock,
}) {
  const [showBlockMenu, setShowBlockMenu] = useState(false);

  const updateField = (key, value) => onChange({ ...gallery, [key]: value });

  const addBlock = (block) =>
    onChange({ ...gallery, blocks: [...(gallery.blocks || []), block] });

  const updateBlock = (index, updated) => {
    const blocks = [...(gallery.blocks || [])];
    blocks[index] = updated;
    onChange({ ...gallery, blocks });
  };

  const removeBlock = (index) => {
    const blocks = (gallery.blocks || []).filter((_, i) => i !== index);
    onChange({ ...gallery, blocks });
  };

  const removePhotoFromBlock = (blockIndex, url) => {
    const blocks = [...(gallery.blocks || [])];
    blocks[blockIndex] = {
      ...blocks[blockIndex],
      imageUrls: (blocks[blockIndex].imageUrls || []).filter((u) => u !== url),
    };
    onChange({ ...gallery, blocks });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const blocks = Array.from(gallery.blocks || []);
    const [moved] = blocks.splice(result.source.index, 1);
    blocks.splice(result.destination.index, 0, moved);
    onChange({ ...gallery, blocks });
  };

  return (
    <div className="w-80 flex-shrink-0 border-r border-gray-200 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onToggleLibrary}
          className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
            libraryOpen
              ? "bg-gray-900 text-white border-gray-900"
              : "border-gray-200 text-gray-600 hover:border-gray-400"
          }`}
        >
          📷 Photos
        </button>
        <div className="flex-1" />
        <button
          onClick={onSave}
          disabled={saving}
          className="text-sm bg-gray-900 text-white px-4 py-1.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {/* Gallery meta */}
      <div className="px-4 py-4 border-b border-gray-100 space-y-2 flex-shrink-0">
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:border-gray-400"
          placeholder="Gallery name"
          value={gallery.name || ""}
          onChange={(e) => updateField("name", e.target.value)}
        />
        <textarea
          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400 resize-none"
          placeholder="Description"
          rows={2}
          value={gallery.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
        />
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-500 outline-none focus:border-gray-400"
          placeholder="Thumbnail URL"
          value={gallery.thumbnailUrl || ""}
          onChange={(e) => updateField("thumbnailUrl", e.target.value)}
        />
      </div>

      {/* Block list */}
      <div className="flex-1 overflow-y-auto p-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {(gallery.blocks || []).map((block, index) => (
                  <Draggable
                    key={`block-${index}`}
                    draggableId={`block-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <BlockCard
                          block={block}
                          dragHandleProps={provided.dragHandleProps}
                          onUpdate={(updated) => updateBlock(index, updated)}
                          onRemove={() => removeBlock(index)}
                          onAddPhotos={() => onAddPhotosToBlock(index)}
                          onRemovePhoto={(url) => removePhotoFromBlock(index, url)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Add block button */}
        <div className="relative mt-2">
          <button
            onClick={() => setShowBlockMenu((v) => !v)}
            className="w-full text-sm border-2 border-dashed border-gray-200 text-gray-400 py-2.5 rounded-xl hover:border-gray-400 hover:text-gray-600 transition-colors"
          >
            + Add Block
          </button>
          {showBlockMenu && (
            <BlockTypeMenu
              onAdd={addBlock}
              onClose={() => setShowBlockMenu(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify by temporarily rendering BlockBuilder**

In a browser at `http://localhost:3000/admin/galleries` (after Task 2), open devtools console. No JS errors from the import chain yet. The component will be rendered in Task 7.

- [ ] **Step 3: Commit**

```bash
git add components/admin/gallery-builder/BlockBuilder.js
git commit -m "feat: add BlockBuilder left panel with DnD block list"
```

---

## Task 5: GalleryLibraryPanel (Middle Panel)

**Files:**
- Create: `components/admin/gallery-builder/GalleryLibraryPanel.js`

Displays all GCS images in a searchable, filterable thumbnail grid. Thumbnails are HTML5 draggable. Clicking a thumbnail calls `onPhotoClick(url)`. Receives `images` and `loading` from parent (GalleryBuilder fetches once and passes down).

- [ ] **Step 1: Create `components/admin/gallery-builder/GalleryLibraryPanel.js`**

```js
// components/admin/gallery-builder/GalleryLibraryPanel.js
import { useState, useMemo } from "react";

function extractFolder(url) {
  // "https://storage.googleapis.com/swamiphoto/photos/landscapes/arizona/foo.jpg"
  // → "landscapes/arizona"
  const match = url.match(/\/photos\/(.+)\/[^/]+$/);
  return match ? match[1] : "other";
}

export default function GalleryLibraryPanel({ images, loading, onPhotoClick }) {
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("all");

  const folders = useMemo(() => {
    const set = new Set();
    images.forEach((url) => set.add(extractFolder(url)));
    return ["all", ...Array.from(set).sort()];
  }, [images]);

  const filtered = useMemo(() => {
    let result = images;
    if (folder !== "all") {
      result = result.filter((url) => extractFolder(url) === folder);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((url) => url.toLowerCase().includes(q));
    }
    return result;
  }, [images, folder, search]);

  return (
    <div className="w-72 flex-shrink-0 border-r border-gray-200 flex flex-col h-full bg-gray-50">
      {/* Search + folder filter */}
      <div className="px-3 py-3 border-b border-gray-200 bg-white space-y-2 flex-shrink-0">
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
          placeholder="Search photos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-600 bg-white outline-none"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          {folders.map((f) => (
            <option key={f} value={f}>
              {f === "all" ? "All folders" : f}
            </option>
          ))}
        </select>
      </div>

      {/* Image grid */}
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="text-center text-gray-400 text-xs py-10">Loading photos…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-xs py-10">No photos found</div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {filtered.map((url) => {
              const filename = url.split("/").pop();
              return (
                <div
                  key={url}
                  className="aspect-square rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", url)}
                  onClick={() => onPhotoClick(url)}
                  title={filename}
                >
                  <img
                    src={url}
                    alt={filename}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer count */}
      <div className="px-3 py-2 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="text-xs text-gray-400">
          {filtered.length}
          {filtered.length !== images.length ? ` of ${images.length}` : ""} photos
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/gallery-builder/GalleryLibraryPanel.js
git commit -m "feat: add GalleryLibraryPanel middle panel"
```

---

## Task 6: GalleryPreview (Right Panel)

**Files:**
- Create: `components/admin/gallery-builder/GalleryPreview.js`

Renders the actual `Gallery` component with the current block state, debounced 300ms. Has an Expand/Collapse button.

- [ ] **Step 1: Create `components/admin/gallery-builder/GalleryPreview.js`**

```js
// components/admin/gallery-builder/GalleryPreview.js
import { useState, useEffect } from "react";
import Gallery from "../../image-displays/gallery/Gallery";

export default function GalleryPreview({ gallery, expanded, onToggleExpand }) {
  const [debouncedGallery, setDebouncedGallery] = useState(gallery);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedGallery(gallery), 300);
    return () => clearTimeout(timer);
  }, [gallery]);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center px-4 py-2 border-b border-gray-200 bg-white flex-shrink-0">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          Preview
        </span>
        <div className="flex-1" />
        <button
          onClick={onToggleExpand}
          className="text-xs text-gray-500 hover:text-gray-800 border border-gray-200 px-2.5 py-1 rounded-lg transition-colors"
        >
          {expanded ? "⤡ Collapse" : "⤢ Expand"}
        </button>
      </div>

      {/* Live preview */}
      <div className="flex-1 overflow-y-auto bg-white">
        {(debouncedGallery.blocks || []).length > 0 ? (
          <Gallery
            name={debouncedGallery.name}
            description={debouncedGallery.description}
            blocks={debouncedGallery.blocks}
            enableSlideshow={false}
            onBackClick={() => {}}
            onSlideshowClick={() => {}}
            onClientLoginClick={() => {}}
          />
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-300 text-sm">
            Add blocks to preview the gallery
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/gallery-builder/GalleryPreview.js
git commit -m "feat: add GalleryPreview right panel with 300ms debounce"
```

---

## Task 7: GalleryBuilder Root + Builder Pages + _app.js

**Files:**
- Create: `components/admin/gallery-builder/GalleryBuilder.js`
- Create: `pages/admin/galleries/new.js`
- Create: `pages/admin/galleries/[slug].js`
- Modify: `pages/_app.js`

`GalleryBuilder` owns all state: `gallery`, `libraryOpen`, `expanded`, `activeBlockIndex`, `libraryImages` (fetched lazily). Wires up all three panels. Builder pages fetch the config from the API and pass the target gallery + index to `GalleryBuilder`.

- [ ] **Step 1: Create `components/admin/gallery-builder/GalleryBuilder.js`**

```js
// components/admin/gallery-builder/GalleryBuilder.js
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import BlockBuilder from "./BlockBuilder";
import GalleryLibraryPanel from "./GalleryLibraryPanel";
import GalleryPreview from "./GalleryPreview";

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function GalleryBuilder({ initialGallery, galleryIndex, allGalleries, isNew }) {
  const router = useRouter();
  const [gallery, setGallery] = useState(initialGallery);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryImages, setLibraryImages] = useState(null); // null = not yet fetched
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeBlockIndex, setActiveBlockIndex] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchLibrary = useCallback(() => {
    if (libraryImages !== null) return; // already fetched
    setLibraryLoading(true);
    fetch("/api/admin/library")
      .then((r) => r.json())
      .then((data) => setLibraryImages(data.allImages || []))
      .catch(() => setLibraryImages([]))
      .finally(() => setLibraryLoading(false));
  }, [libraryImages]);

  const handleToggleLibrary = () => {
    const next = !libraryOpen;
    setLibraryOpen(next);
    if (next) fetchLibrary();
  };

  const handleAddPhotosToBlock = (blockIndex) => {
    setActiveBlockIndex(blockIndex);
    setLibraryOpen(true);
    fetchLibrary();
  };

  const handlePhotoClick = (url) => {
    if (activeBlockIndex === null) return;
    setGallery((prev) => {
      const blocks = [...(prev.blocks || [])];
      const block = blocks[activeBlockIndex];
      if (block.type !== "stacked" && block.type !== "masonry") return prev;
      if ((block.imageUrls || []).includes(url)) return prev;
      blocks[activeBlockIndex] = {
        ...block,
        imageUrls: [...(block.imageUrls || []), url],
      };
      return { ...prev, blocks };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const galleryToSave = { ...gallery };

      // Auto-generate slug for new galleries
      if (isNew && !galleryToSave.slug) {
        galleryToSave.slug = generateSlug(galleryToSave.name || "untitled");
      }

      if (!galleryToSave.slug) {
        alert("Gallery needs a name before saving.");
        setSaving(false);
        return;
      }

      const updatedGalleries = isNew
        ? [...allGalleries, galleryToSave]
        : allGalleries.map((g, i) => (i === galleryIndex ? galleryToSave : g));

      const res = await fetch("/api/admin/galleries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ galleries: updatedGalleries }),
      });

      if (!res.ok) throw new Error(`Save failed ${res.status}`);

      if (isNew) {
        // Redirect to edit page for the newly created gallery
        router.push(`/admin/galleries/${galleryToSave.slug}`);
      } else {
        // Update local gallery state in case slug changed
        setGallery(galleryToSave);
        alert("Saved!");
      }
    } catch (err) {
      alert(`Error saving: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {!expanded && (
        <BlockBuilder
          gallery={gallery}
          onChange={setGallery}
          onSave={handleSave}
          saving={saving}
          onToggleLibrary={handleToggleLibrary}
          libraryOpen={libraryOpen}
          onAddPhotosToBlock={handleAddPhotosToBlock}
        />
      )}

      {!expanded && libraryOpen && (
        <GalleryLibraryPanel
          images={libraryImages || []}
          loading={libraryLoading}
          onPhotoClick={handlePhotoClick}
        />
      )}

      <GalleryPreview
        gallery={gallery}
        expanded={expanded}
        onToggleExpand={() => setExpanded((v) => !v)}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create `pages/admin/galleries/new.js`**

```js
// pages/admin/galleries/new.js
import Head from "next/head";
import { useState, useEffect } from "react";
import GalleryBuilder from "../../../components/admin/gallery-builder/GalleryBuilder";

const DEFAULT_GALLERY = {
  name: "",
  slug: "",
  description: "",
  thumbnailUrl: "",
  enableSlideshow: false,
  showCover: true,
  slideshowSettings: { youtubeLinks: [], musicCredits: [], layout: "kenburns" },
  blocks: [],
};

export default function NewGalleryPage() {
  const [allGalleries, setAllGalleries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/galleries")
      .then((r) => (r.ok ? r.json() : Promise.reject(`API error ${r.status}`)))
      .then((data) => setAllGalleries(data.galleries || []))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-sm">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>New Gallery — Admin</title>
      </Head>
      <GalleryBuilder
        initialGallery={DEFAULT_GALLERY}
        galleryIndex={-1}
        allGalleries={allGalleries}
        isNew={true}
      />
    </>
  );
}
```

- [ ] **Step 3: Create `pages/admin/galleries/[slug].js`**

```js
// pages/admin/galleries/[slug].js
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import GalleryBuilder from "../../../components/admin/gallery-builder/GalleryBuilder";

export default function EditGalleryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null); // { gallery, index, allGalleries }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/admin/galleries")
      .then((r) => (r.ok ? r.json() : Promise.reject(`API error ${r.status}`)))
      .then((config) => {
        const index = config.galleries.findIndex((g) => g.slug === slug);
        if (index === -1) throw new Error(`Gallery "${slug}" not found`);
        setData({
          gallery: config.galleries[index],
          index,
          allGalleries: config.galleries,
        });
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
        Loading gallery…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-sm">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{data.gallery.name} — Edit Gallery</title>
      </Head>
      <GalleryBuilder
        initialGallery={data.gallery}
        galleryIndex={data.index}
        allGalleries={data.allGalleries}
        isNew={false}
      />
    </>
  );
}
```

- [ ] **Step 4: Update `pages/_app.js` to suppress header/footer on admin gallery pages**

In `pages/_app.js`, find this line:
```js
const noHeaderPaths = [...slideshowPaths, ...otherNoHeaderPaths, ...adminPaths, "/timemanagement", "/course-platform", "/admin"];
```

Replace it with:
```js
const noHeaderPaths = [...slideshowPaths, ...otherNoHeaderPaths, ...adminPaths, "/timemanagement", "/course-platform", "/admin", "/admin/galleries", "/admin/galleries/new", "/admin/galleries/[slug]"];
```

- [ ] **Step 5: End-to-end verify**

Run: `npm run dev`

Check:
1. Visit `http://localhost:3000/admin/galleries` — No site header/footer, gallery cards visible
2. Click "+ New Gallery" — Opens `/admin/galleries/new`, three-panel layout: left panel (name/description fields + "+ Add Block" button), right panel (empty preview with "Add blocks to preview" message)
3. Type a gallery name — Name updates in the preview header live (after 300ms debounce)
4. Click "+ Add Block" → popover appears with 5 block type options
5. Click "Stacked" — A stacked block card appears in the left panel
6. Click "📷 Photos" — Library panel slides in (middle), shows loading then images
7. Click a photo in library — It's added to the `activeBlockIndex` block (if a stacked/masonry block was targeted, else nothing)
8. Click "+ Add Photos" on a stacked block → library opens, click a photo → it appears in the block's grid
9. Drag a photo thumbnail from library and drop it on a stacked block card — Photo appears in the block
10. Drag block cards to reorder — Order updates
11. Click "⤢ Expand" — Left and middle panels hide, preview goes full width
12. Click "⤡ Collapse" — Panels return
13. Click "Save" with a gallery named "Test Gallery" — Saves to GCS, redirects to `/admin/galleries/test-gallery`
14. Visit `http://localhost:3000/admin/galleries` — New gallery appears in list

- [ ] **Step 6: Commit**

```bash
git add components/admin/gallery-builder/GalleryBuilder.js pages/admin/galleries/new.js "pages/admin/galleries/[slug].js" pages/_app.js
git commit -m "feat: add GalleryBuilder, new and edit pages, suppress header on admin gallery paths"
```

---

## Task 8: Update Public Gallery Page to Use ISR + GCS

**Files:**
- Modify: `pages/galleries/[gallerySlug].js`

Switch `getStaticProps` to read from `galleries-config.json` in GCS first. Fall back to existing hardcoded data + `imagesFolderUrl` expansion if the GCS config is missing or the gallery isn't found there. Add `revalidate: 60` for ISR. Change `getStaticPaths` to use `fallback: 'blocking'` so new galleries created in the builder work.

- [ ] **Step 1: Update `getStaticPaths` in `pages/galleries/[gallerySlug].js`**

Find:
```js
export async function getStaticPaths() {
  const paths = galleryData.map((gallery) => ({
    params: { gallerySlug: gallery.slug },
  }));
  return { paths, fallback: false };
}
```

Replace with:
```js
export async function getStaticPaths() {
  // Pre-generate known paths from hardcoded data.
  // fallback: 'blocking' allows new galleries created in the builder to work.
  const paths = galleryData
    .filter((g) => !g.isHidden)
    .map((gallery) => ({ params: { gallerySlug: gallery.slug } }));
  return { paths, fallback: "blocking" };
}
```

- [ ] **Step 2: Update imports at the top of `pages/galleries/[gallerySlug].js`**

Add this import after the existing imports:
```js
import { readGalleriesConfig } from "../../common/galleriesConfig";
```

- [ ] **Step 3: Update `getStaticProps` in `pages/galleries/[gallerySlug].js`**

Find:
```js
export async function getStaticProps({ params }) {
  const gallerySlug = params.gallerySlug;
  const gallery = galleryData.find((g) => g.slug === gallerySlug);

  if (!gallery) {
    return {
      notFound: true,
    };
  }
```

Replace the entire `getStaticProps` function with:
```js
export async function getStaticProps({ params }) {
  const gallerySlug = params.gallerySlug;

  // Try GCS config first (source of truth for galleries built with the builder)
  try {
    const config = await readGalleriesConfig();
    if (config) {
      const gallery = config.galleries.find((g) => g.slug === gallerySlug);
      if (gallery) {
        return {
          props: { gallerySlug, gallery },
          revalidate: 60,
        };
      }
    }
  } catch (err) {
    console.error("[getStaticProps] Error reading GCS galleries config:", err.message);
  }

  // Fall back to hardcoded galleryData + imagesFolderUrl expansion
  const gallery = galleryData.find((g) => g.slug === gallerySlug);

  if (!gallery) {
    return { notFound: true };
  }

  if (!gallery.blocks || !Array.isArray(gallery.blocks)) {
    return {
      props: {
        gallerySlug,
        gallery: { ...gallery, blocks: [] },
      },
      revalidate: 60,
    };
  }

  const processedBlocks = await Promise.all(
    gallery.blocks.map(async (block) => {
      if ((block.type === "stacked" || block.type === "masonry") && block.imagesFolderUrl) {
        try {
          const imageUrls = await fetchImageUrls(block.imagesFolderUrl);
          const sortedUrls = imageUrls.sort((a, b) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
          );
          return { ...block, imageUrls: sortedUrls };
        } catch (error) {
          console.error(
            `[getStaticProps] ERROR fetching images for ${block.imagesFolderUrl}:`,
            error.message
          );
          return { ...block, imageUrls: block.imageUrls || [] };
        }
      }
      return block;
    })
  );

  return {
    props: {
      gallerySlug,
      gallery: { ...gallery, blocks: processedBlocks },
    },
    revalidate: 60,
  };
}
```

- [ ] **Step 4: Verify public gallery pages still load**

Run: `npm run dev`

Check:
1. Visit `http://localhost:3000/galleries/arizona` — Gallery loads with blocks from GCS config (or hardcoded fallback if GCS not seeded yet). Should look identical to before.
2. Visit the "Test Gallery" created in Task 7: `http://localhost:3000/galleries/test-gallery` — Should load the gallery's blocks.
3. Open `http://localhost:3000/api/admin/galleries` and confirm GCS config has the gallery.
4. Edit a gallery's description in the builder, save, then visit the public page — After ISR triggers (within 60s on next visit), description should update.

- [ ] **Step 5: Commit**

```bash
git add pages/galleries/[gallerySlug].js common/galleriesConfig.js
git commit -m "feat: update public gallery page to use ISR + GCS config with hardcoded fallback"
```

---

## Self-Review Notes

**Spec coverage:**
- ✅ Three-panel layout (BlockBuilder | GalleryLibraryPanel | GalleryPreview)
- ✅ Gallery name/description/thumbnailUrl editable at top of BlockBuilder
- ✅ "+ Add Block" → inline popover → 5 block types
- ✅ Block cards with drag handle (⠿), type label, variant picker, relevant fields
- ✅ Stacked/masonry: photo list with × remove, "+ Add Photos" button opens library
- ✅ Save button writes to GCS
- ✅ Library panel: toggled by "📷 Photos", thumbnail grid with search + folder filter
- ✅ Drag from library to block (HTML5 drag events)
- ✅ Click photo in library to add to active block
- ✅ Library fetched once on open, held in GalleryBuilder state
- ✅ GalleryPreview renders Gallery component debounced 300ms
- ✅ "⤢ Expand" / "⤡ Collapse" for full-width preview
- ✅ `/admin/galleries` list page with edit/delete/new
- ✅ `/admin/galleries/new` and `/admin/galleries/[slug]` routes
- ✅ GET + PUT `/api/admin/galleries`
- ✅ Seeded from hardcoded galleryData, expands imagesFolderUrl + resolves start/count/excludeImageUrls
- ✅ isHidden galleries skipped at seed time
- ✅ Public gallery page updated to ISR (revalidate: 60) + GCS config
- ✅ fallback: 'blocking' for new galleries created in builder
- ✅ `_app.js` updated with admin gallery noHeader paths
- ✅ Out of scope: slideshow settings, client login, showCover toggle, photo reordering within blocks
