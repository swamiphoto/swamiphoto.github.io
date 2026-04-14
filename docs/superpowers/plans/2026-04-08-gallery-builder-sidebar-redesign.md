# Gallery Builder Sidebar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the gallery builder block sidebar with icon-based actions, a modal photo picker, smart popover positioning, block insertion zones, and polished visual styling.

**Architecture:** All changes are confined to `components/admin/gallery-builder/`. A new `PhotoPickerModal` component absorbs the persistent `GalleryLibraryPanel` sidebar into a full-screen modal with Library and Upload tabs. A new `DesignPopover` component handles per-block variant options. `BlockBuilder` gains insertion zones between blocks. `GalleryBuilder` manages modal state instead of sidebar state.

**Tech Stack:** React, Next.js (pages router), Tailwind CSS, react-beautiful-dnd, HTML5 drag-and-drop, `/_next/image` optimization endpoint.

---

## File Map

**Create:**
- `components/admin/gallery-builder/PhotoPickerModal.js` — Full-screen modal: Library tab (search/filter/grid) + Upload tab (inline upload form). Replaces `GalleryLibraryPanel`.
- `components/admin/gallery-builder/DesignPopover.js` — Small popover anchored to a paintbrush icon; renders VariantPicker for the block's type.

**Modify:**
- `components/admin/gallery-builder/BlockCard.js` — Icon-based header (drag handle + left-aligned title + `+` / 🖌 / `⋯` icons), natural-aspect-ratio thumbnails, no hint when photos present.
- `components/admin/gallery-builder/BlockBuilder.js` — Insertion zones between blocks, gallery meta polish (thumbnail image, slug, visibility), stylistic inputs, smart "+ Add Block" menu trigger.
- `components/admin/gallery-builder/BlockTypeMenu.js` — Smart up/down positioning based on viewport.
- `components/admin/gallery-builder/GalleryBuilder.js` — Modal state management; remove `libraryOpen` / `GalleryLibraryPanel`; add `photoPickerOpen` + `photoPickerBlockIndex`.

**Remove dependency on:**
- `components/admin/gallery-builder/GalleryLibraryPanel.js` — No longer rendered by GalleryBuilder (can be left as dead file or deleted).

---

## Task 1: Visual base — panel background, card shadows, stylistic inputs

**Files:**
- Modify: `components/admin/gallery-builder/BlockBuilder.js`
- Modify: `components/admin/gallery-builder/BlockCard.js`

Establishes the visual foundation: shaded panel, drop-shadowed cards, polished input styles. All subsequent tasks build on these styles.

- [ ] **Step 1: Update BlockBuilder panel and input styles**

Replace the root div and meta section in `BlockBuilder.js`:

```jsx
// Root div: was bg-white, now bg-gray-50
<div className="w-80 flex-shrink-0 border-r border-gray-200 flex flex-col h-full bg-gray-50">

// Header: keep existing
<div className="px-4 py-3 border-b border-gray-200 bg-white flex items-center gap-2 flex-shrink-0">

// Gallery meta section — replace the entire meta div:
<div className="px-4 py-4 border-b border-gray-100 space-y-3 flex-shrink-0 bg-white">
  <input
    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder-gray-300"
    placeholder="Gallery name"
    value={gallery.name || ""}
    onChange={(e) => updateField("name", e.target.value)}
  />
  <textarea
    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors resize-none placeholder-gray-300"
    placeholder="Description (optional)"
    rows={2}
    value={gallery.description || ""}
    onChange={(e) => updateField("description", e.target.value)}
  />
</div>
```

- [ ] **Step 2: Update BlockCard card styling**

Replace the root div in `BlockCard.js`:

```jsx
// was: bg-white border border-gray-200 rounded-xl p-4 mb-3
// now: add shadow-sm, use ring instead of border for subtlety
<div
  className="bg-white rounded-xl p-4 mb-2 shadow-sm ring-1 ring-gray-100"
  onDragOver={isPhotoBlock ? handleDragOver : undefined}
  onDrop={isPhotoBlock ? handleDrop : undefined}
>
```

- [ ] **Step 3: Update textarea and inputs inside BlockCard**

For all `input` and `textarea` inside BlockCard, use this consistent style:
```
className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder-gray-300"
```

Apply to: caption input (photo block), content textarea (text block), url input (video block), caption input (video block).

- [ ] **Step 4: Also shade the block list scroll area**

In `BlockBuilder.js`, the block list wrapper:
```jsx
// was: flex-1 overflow-y-auto p-4
<div className="flex-1 overflow-y-auto p-3">
```

- [ ] **Step 5: Verify visually**

Run `npm run dev`, open `/admin/galleries/[any-slug]`. Confirm:
- Left panel has a light gray (`gray-50`) background
- Block cards have a subtle shadow and no heavy border
- Inputs have rounded-xl, gray-50 bg, smooth focus transition

- [ ] **Step 6: Commit**

```bash
cd /Users/swami/Documents/Contexts/sp/Code/swamiphoto.github.io
git add components/admin/gallery-builder/BlockBuilder.js components/admin/gallery-builder/BlockCard.js
git commit -m "style: polish gallery builder panel bg, card shadows, input styles"
```

---

## Task 2: Block card header redesign — icon actions

**Files:**
- Modify: `components/admin/gallery-builder/BlockCard.js`

Replace the "× Remove" text button with a `⋯` icon dropdown, add `+` icon for photo blocks, add 🖌 paintbrush icon (will wire to popover in Task 3). Left-align the block type label.

- [ ] **Step 1: Add local state for the `⋯` dropdown**

At the top of the `BlockCard` function:
```jsx
const [showMenu, setShowMenu] = useState(false);
const menuRef = useRef(null);

// Close menu on outside click
useEffect(() => {
  const handler = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
}, []);
```

Add these imports at top:
```jsx
import { useState, useRef, useEffect } from "react";
```

- [ ] **Step 2: Replace the header row**

Replace the entire `{/* Header row */}` div with:

```jsx
{/* Header row */}
<div className="flex items-center gap-2 mb-3">
  {/* Drag handle — left */}
  <span
    {...dragHandleProps}
    className="text-gray-300 cursor-grab hover:text-gray-400 text-base leading-none select-none flex-shrink-0"
  >
    ⠿
  </span>

  {/* Block type label — left-aligned, fills space */}
  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex-1">
    {TYPE_LABELS[block.type] || block.type}
  </span>

  {/* + icon — only for photo/stacked/masonry blocks */}
  {(block.type === "photo" || isPhotoBlock) && (
    <button
      onClick={onAddPhotos}
      title="Add photos"
      className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium leading-none"
    >
      +
    </button>
  )}

  {/* Paintbrush icon — for blocks with variants */}
  {(block.type === "photo" || block.type === "text" || block.type === "video") && (
    <button
      title="Design options"
      className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors text-xs leading-none"
    >
      ✦
    </button>
  )}

  {/* ⋯ more menu */}
  <div className="relative" ref={menuRef}>
    <button
      onClick={() => setShowMenu((v) => !v)}
      className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors text-sm leading-none"
      title="More options"
    >
      ⋯
    </button>
    {showMenu && (
      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 w-36">
        <button
          onClick={() => { setShowMenu(false); onRemove(); }}
          className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
        >
          Remove block
        </button>
      </div>
    )}
  </div>
</div>
```

- [ ] **Step 3: Remove the old "+ Add Photos" button from stacked/masonry section**

In the stacked/masonry block section, remove:
```jsx
<button
  onClick={onAddPhotos}
  className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
>
  + Add Photos
</button>
```

Also remove the "+ Add Photos" button from the photo block section (the one that shows when `!block.imageUrl`).
The photo block empty state drop zone `onClick={() => { if (!block.imageUrl) onAddPhotos(); }}` handles this case.

- [ ] **Step 4: Verify visually**

Open the gallery builder. Confirm:
- Each card header shows: drag handle | block type | [+] [✦] [⋯]
- ⋯ opens a small dropdown with "Remove block" in red
- No separate "Remove" text button anywhere
- ✦ button exists but does nothing yet (wired in Task 3)

- [ ] **Step 5: Commit**

```bash
git add components/admin/gallery-builder/BlockCard.js
git commit -m "refactor: replace block card text buttons with icon actions"
```

---

## Task 3: DesignPopover component

**Files:**
- Create: `components/admin/gallery-builder/DesignPopover.js`
- Modify: `components/admin/gallery-builder/BlockCard.js`

Small popover anchored to the ✦ button, containing the VariantPicker for the block type.

- [ ] **Step 1: Create DesignPopover.js**

```jsx
// components/admin/gallery-builder/DesignPopover.js
import { useRef, useEffect } from "react";

const VARIANT_OPTIONS = {
  photo: [
    { value: 1, label: "Edge to edge" },
    { value: 2, label: "Centered 72%" },
  ],
  text: [
    { value: 1, label: "Sans-serif" },
    { value: 2, label: "Serif" },
  ],
  video: [
    { value: 1, label: "Edge to edge" },
    { value: 2, label: "85% centered" },
    { value: 3, label: "Video + caption" },
  ],
};

export default function DesignPopover({ blockType, value, onClose, onChange }) {
  const ref = useRef(null);
  const options = VARIANT_OPTIONS[blockType];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  if (!options) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-3 w-48"
    >
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Layout</div>
      <div className="flex flex-col gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { onChange(opt.value); onClose(); }}
            className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${
              value === opt.value
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire DesignPopover into BlockCard**

Add state for popover visibility at the top of `BlockCard`:
```jsx
const [showDesign, setShowDesign] = useState(false);
```

Import DesignPopover:
```jsx
import DesignPopover from "./DesignPopover";
```

Wrap the ✦ button in a relative div and add the popover:
```jsx
{/* Paintbrush icon — for blocks with variants */}
{(block.type === "photo" || block.type === "text" || block.type === "video") && (
  <div className="relative">
    <button
      onClick={() => setShowDesign((v) => !v)}
      title="Design options"
      className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors text-xs leading-none"
    >
      ✦
    </button>
    {showDesign && (
      <DesignPopover
        blockType={block.type}
        value={block.variant || 1}
        onChange={(v) => onUpdate({ ...block, variant: v })}
        onClose={() => setShowDesign(false)}
      />
    )}
  </div>
)}
```

- [ ] **Step 3: Remove VariantPicker usages from block bodies**

Now that variants are handled by DesignPopover, remove the `<VariantPicker>` component and its usages from all block body sections:
- Remove `VariantPicker` from photo block body
- Remove `VariantPicker` from text block body  
- Remove `VariantPicker` from video block body
- Remove the `VariantPicker` function definition (it's no longer used)

- [ ] **Step 4: Verify visually**

Click ✦ on a photo block → popover shows "Edge to edge" / "Centered 72%".
Click a variant → it closes and the preview updates.
Click outside → closes.

- [ ] **Step 5: Commit**

```bash
git add components/admin/gallery-builder/DesignPopover.js components/admin/gallery-builder/BlockCard.js
git commit -m "feat: add DesignPopover for per-block variant options"
```

---

## Task 4: Hide drag hint when photos are already present; natural-aspect-ratio thumbnails

**Files:**
- Modify: `components/admin/gallery-builder/BlockCard.js`

Two small quality-of-life improvements: (1) hide the "Drag photos" hint once photos exist, (2) show stacked/masonry thumbnails at their natural aspect ratio.

- [ ] **Step 1: Conditionally hide the hint text**

In the stacked/masonry block section, find:
```jsx
<div className="text-xs text-gray-400">
  Drag photos from the library panel, or click + Add Photos
</div>
```

Replace with:
```jsx
{(block.imageUrls || []).length === 0 && (
  <div className="text-xs text-gray-400">
    Click + to add photos, or drag from the picker
  </div>
)}
```

- [ ] **Step 2: Natural-aspect-ratio thumbnails in stacked/masonry blocks**

Replace the thumbnail grid (`grid grid-cols-3 gap-1.5`) with a CSS columns layout that preserves aspect ratios:

```jsx
{(block.imageUrls || []).length > 0 && (
  <div style={{ columns: "3", gap: "6px" }}>
    {(block.imageUrls || []).map((url) => (
      <div key={url} className="relative rounded overflow-hidden group mb-1.5 break-inside-avoid">
        <img
          src={`/_next/image?url=${encodeURIComponent(url)}&w=200&q=65`}
          alt=""
          className="w-full h-auto block"
          loading="lazy"
        />
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
```

- [ ] **Step 3: Verify visually**

- A stacked block with no photos shows the hint text
- A stacked block with photos hides the hint and shows thumbnails at natural aspect ratio (vertical photos appear taller, horizontal wider)

- [ ] **Step 4: Commit**

```bash
git add components/admin/gallery-builder/BlockCard.js
git commit -m "feat: hide photo hint when photos present; natural aspect ratio thumbnails"
```

---

## Task 5: PhotoPickerModal component

**Files:**
- Create: `components/admin/gallery-builder/PhotoPickerModal.js`

Full-screen modal with Library tab (search + folder filter + natural-aspect-ratio image grid) and Upload tab (inline upload form). The modal knows the block type being targeted so it can handle single-select (photo block) vs multi-select (stacked/masonry).

- [ ] **Step 1: Create PhotoPickerModal.js**

```jsx
// components/admin/gallery-builder/PhotoPickerModal.js
import { useState, useMemo, useRef } from "react";

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

function extractFolder(url) {
  const match = url.match(/\/photos\/(.+)\/[^/]+$/);
  return match ? match[1] : "other";
}

function LibraryTab({ images, loading, blockType, onConfirm }) {
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("all");
  const [selected, setSelected] = useState([]);

  const isMulti = blockType === "stacked" || blockType === "masonry";

  const folders = useMemo(() => {
    const set = new Set();
    images.forEach((url) => set.add(extractFolder(url)));
    return ["all", ...Array.from(set).sort()];
  }, [images]);

  const filtered = useMemo(() => {
    let result = images;
    if (folder !== "all") result = result.filter((url) => extractFolder(url) === folder);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((url) => url.toLowerCase().includes(q));
    }
    return result;
  }, [images, folder, search]);

  const toggle = (url) => {
    if (!isMulti) {
      // Single select — immediately confirm
      onConfirm([url]);
      return;
    }
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="px-4 py-3 border-b border-gray-100 space-y-2 flex-shrink-0">
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder-gray-300"
          placeholder="Search photos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 outline-none"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          {folders.map((f) => (
            <option key={f} value={f}>{f === "all" ? "All folders" : f}</option>
          ))}
        </select>
      </div>

      {/* Image grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="text-center text-gray-400 text-sm py-16">Loading photos…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-16">No photos found</div>
        ) : (
          <div style={{ columns: "4", gap: "6px" }}>
            {filtered.map((url) => {
              const isSelected = selected.includes(url);
              return (
                <div
                  key={url}
                  className={`relative rounded-lg overflow-hidden cursor-pointer mb-1.5 break-inside-avoid group ring-2 transition-all ${
                    isSelected ? "ring-blue-500" : "ring-transparent hover:ring-gray-300"
                  }`}
                  onClick={() => toggle(url)}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", url)}
                  title={url.split("/").pop()}
                >
                  <img
                    src={`/_next/image?url=${encodeURIComponent(url)}&w=256&q=65`}
                    alt=""
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer for multi-select */}
      {isMulti && (
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-gray-400">
            {selected.length > 0 ? `${selected.length} selected` : `${filtered.length} photos`}
          </span>
          <button
            onClick={() => onConfirm(selected)}
            disabled={selected.length === 0}
            className="bg-gray-900 text-white text-sm px-4 py-1.5 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
          >
            Add {selected.length > 0 ? selected.length : ""} photo{selected.length !== 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
}

function UploadTab({ onUploaded }) {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({});
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const arr = Array.from(newFiles).filter((f) => /\.(jpg|jpeg|png|gif)$/i.test(f.name));
    setFiles((prev) => [...prev, ...arr]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    const uploadedUrls = [];
    for (const file of files) {
      setProgress((p) => ({ ...p, [file.name]: "pending" }));
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, contentType: file.type, folder: folder || undefined }),
        });
        const { signedUrl, gcsUrl } = await res.json();
        const formData = new FormData();
        Object.entries(signedUrl.fields).forEach(([k, v]) => formData.append(k, v));
        formData.append("file", file);
        const uploadRes = await fetch(signedUrl.url, { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Upload failed");
        setProgress((p) => ({ ...p, [file.name]: "done" }));
        uploadedUrls.push(gcsUrl);
      } catch {
        setProgress((p) => ({ ...p, [file.name]: "error" }));
      }
    }
    setUploading(false);
    if (uploadedUrls.length > 0) onUploaded(uploadedUrls);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          dragging ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-400 bg-gray-50"
        }`}
      >
        <input ref={inputRef} type="file" multiple accept=".jpg,.jpeg,.png,.gif" className="hidden" onChange={(e) => addFiles(e.target.files)} />
        <div className="text-3xl mb-2">📁</div>
        <div className="text-sm font-medium text-gray-700">Drop photos here or click to browse</div>
        <div className="text-xs text-gray-400 mt-1">JPG, PNG — multiple files supported</div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="max-h-32 overflow-y-auto space-y-1">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="flex-1 truncate text-xs">{f.name}</span>
              <span className={
                progress[f.name] === "done" ? "text-green-500" :
                progress[f.name] === "error" ? "text-red-500" :
                progress[f.name] === "pending" ? "text-blue-400" : "text-gray-300"
              }>
                {progress[f.name] === "done" ? "✓" : progress[f.name] === "error" ? "✗" : progress[f.name] === "pending" ? "↑" : "·"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Folder */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Folder <span className="text-gray-400 font-normal">(optional — blank = photos/library)</span>
        </label>
        <input
          list="upload-folder-options"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          placeholder="photos/landscapes"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors"
        />
        <datalist id="upload-folder-options">
          {KNOWN_FOLDERS.map((f) => <option key={f} value={f} />)}
        </datalist>
      </div>

      <button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className="bg-gray-900 text-white text-sm py-2.5 rounded-xl disabled:opacity-40 hover:bg-gray-700 transition-colors"
      >
        {uploading ? "Uploading…" : `Upload ${files.length} photo${files.length !== 1 ? "s" : ""}`}
      </button>
    </div>
  );
}

export default function PhotoPickerModal({ images, loading, blockType, onConfirm, onClose }) {
  const [tab, setTab] = useState("library");

  const handleUploadDone = (uploadedUrls) => {
    onConfirm(uploadedUrls);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col" style={{ height: "80vh" }}>
        {/* Modal header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setTab("library")}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                tab === "library" ? "bg-white shadow-sm text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Library
            </button>
            <button
              onClick={() => setTab("upload")}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                tab === "upload" ? "bg-white shadow-sm text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upload
            </button>
          </div>
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 min-h-0">
          {tab === "library" ? (
            <LibraryTab
              images={images}
              loading={loading}
              blockType={blockType}
              onConfirm={onConfirm}
            />
          ) : (
            <UploadTab onUploaded={handleUploadDone} />
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the file compiles**

```bash
cd /Users/swami/Documents/Contexts/sp/Code/swamiphoto.github.io
node -e "require('./components/admin/gallery-builder/PhotoPickerModal.js')" 2>&1 || echo "syntax check via next build"
npm run build 2>&1 | tail -20
```

Expected: No syntax errors. (Next.js build may still succeed even with warnings.)

- [ ] **Step 3: Commit**

```bash
git add components/admin/gallery-builder/PhotoPickerModal.js
git commit -m "feat: add PhotoPickerModal with Library and Upload tabs"
```

---

## Task 6: Wire PhotoPickerModal into GalleryBuilder — replace sidebar

**Files:**
- Modify: `components/admin/gallery-builder/GalleryBuilder.js`
- Modify: `components/admin/gallery-builder/BlockBuilder.js`

Remove `GalleryLibraryPanel` sidebar. Add `PhotoPickerModal` as a portal-style overlay. Remove "📷 Photos" toggle button.

- [ ] **Step 1: Update GalleryBuilder state and handlers**

Replace the entire `GalleryBuilder.js` with:

```jsx
// components/admin/gallery-builder/GalleryBuilder.js
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import BlockBuilder from "./BlockBuilder";
import GalleryPreview from "./GalleryPreview";
import PhotoPickerModal from "./PhotoPickerModal";

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
  const [libraryImages, setLibraryImages] = useState(null);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);

  // Photo picker modal state
  const [photoPickerOpen, setPhotoPickerOpen] = useState(false);
  const [photoPickerBlockIndex, setPhotoPickerBlockIndex] = useState(null);

  const fetchLibrary = useCallback(() => {
    if (libraryImages !== null) return;
    setLibraryLoading(true);
    fetch("/api/admin/library")
      .then((r) => r.json())
      .then((data) => setLibraryImages(data.allImages || []))
      .catch(() => setLibraryImages([]))
      .finally(() => setLibraryLoading(false));
  }, [libraryImages]);

  const handleAddPhotosToBlock = (blockIndex) => {
    setPhotoPickerBlockIndex(blockIndex);
    setPhotoPickerOpen(true);
    fetchLibrary();
  };

  const handlePhotoPickerConfirm = (urls) => {
    setPhotoPickerOpen(false);
    if (photoPickerBlockIndex === null || urls.length === 0) return;
    setGallery((prev) => {
      const blocks = [...(prev.blocks || [])];
      const block = blocks[photoPickerBlockIndex];
      if (block.type === "photo") {
        blocks[photoPickerBlockIndex] = { ...block, imageUrl: urls[0] };
      } else if (block.type === "stacked" || block.type === "masonry") {
        const existing = block.imageUrls || [];
        const merged = [...existing, ...urls.filter((u) => !existing.includes(u))];
        blocks[photoPickerBlockIndex] = { ...block, imageUrls: merged };
      }
      return { ...prev, blocks };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const galleryToSave = { ...gallery };
      if (isNew && !galleryToSave.slug) {
        galleryToSave.slug = generateSlug(galleryToSave.name || "untitled");
      }
      if (isNew) {
        const slugExists = allGalleries.some((g) => g.slug === galleryToSave.slug);
        if (slugExists) {
          alert(`A gallery with the slug "${galleryToSave.slug}" already exists.`);
          setSaving(false);
          return;
        }
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
        router.push(`/admin/galleries/${galleryToSave.slug}`);
      } else {
        setGallery(galleryToSave);
        alert("Saved!");
      }
    } catch (err) {
      alert(`Error saving: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const currentBlockType = photoPickerBlockIndex !== null
    ? (gallery.blocks || [])[photoPickerBlockIndex]?.type
    : null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {!expanded && (
        <BlockBuilder
          gallery={gallery}
          onChange={setGallery}
          onSave={handleSave}
          saving={saving}
          onAddPhotosToBlock={handleAddPhotosToBlock}
        />
      )}

      <GalleryPreview
        gallery={gallery}
        expanded={expanded}
        onToggleExpand={() => setExpanded((v) => !v)}
      />

      {photoPickerOpen && (
        <PhotoPickerModal
          images={libraryImages || []}
          loading={libraryLoading}
          blockType={currentBlockType}
          onConfirm={handlePhotoPickerConfirm}
          onClose={() => setPhotoPickerOpen(false)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Remove library-related props from BlockBuilder**

Update `BlockBuilder.js` to remove `onToggleLibrary` and `libraryOpen` props. Remove the "📷 Photos" toggle button from the header. The header becomes:

```jsx
<div className="px-4 py-3 border-b border-gray-200 bg-white flex items-center gap-2 flex-shrink-0">
  <span className="text-sm font-semibold text-gray-700 flex-1">Gallery</span>
  <button
    onClick={onSave}
    disabled={saving}
    className="text-sm bg-gray-900 text-white px-4 py-1.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
  >
    {saving ? "Saving…" : "Save"}
  </button>
</div>
```

Also update the prop signature in `BlockBuilder`:
```jsx
export default function BlockBuilder({
  gallery,
  onChange,
  onSave,
  saving,
  onAddPhotosToBlock,
}) {
```

- [ ] **Step 3: Verify end-to-end**

1. Open a gallery in the builder
2. Add a photo block → click `+` in its header → PhotoPickerModal opens in Library tab
3. Click a photo → modal closes → photo appears in block and preview
4. Add a stacked block → click `+` → modal opens → select multiple photos → "Add N photos" → all appear in block

- [ ] **Step 4: Commit**

```bash
git add components/admin/gallery-builder/GalleryBuilder.js components/admin/gallery-builder/BlockBuilder.js
git commit -m "feat: replace library sidebar with PhotoPickerModal overlay"
```

---

## Task 7: Block insertion zones between blocks

**Files:**
- Modify: `components/admin/gallery-builder/BlockBuilder.js`
- Modify: `components/admin/gallery-builder/BlockTypeMenu.js` (prep for smart positioning)

Show a subtle `+` insertion zone between each pair of blocks. On hover it becomes a visible line with a centered `+` circle. Clicking opens `BlockTypeMenu` at that index.

- [ ] **Step 1: Add `insertAtIndex` state and updated `addBlock`**

In `BlockBuilder.js`, add state and update the add function:

```jsx
const [insertAtIndex, setInsertAtIndex] = useState(null);

// Replace the existing addBlock:
const addBlock = (block) => {
  const blocks = [...(gallery.blocks || [])];
  if (insertAtIndex !== null) {
    blocks.splice(insertAtIndex, 0, block);
  } else {
    blocks.push(block);
  }
  onChange({ ...gallery, blocks });
  setInsertAtIndex(null);
};
```

- [ ] **Step 2: Create InsertionZone component inside BlockBuilder.js**

Add this above the `BlockBuilder` export:

```jsx
function InsertionZone({ onInsert }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative h-6 flex items-center justify-center group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onInsert}
    >
      <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 transition-colors ${hovered ? "bg-blue-400" : "bg-transparent"}`} />
      <div className={`relative z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
        hovered ? "border-blue-400 bg-white text-blue-500 shadow-sm" : "border-transparent bg-transparent text-transparent"
      }`}>
        <span className="text-xs font-bold leading-none">+</span>
      </div>
    </div>
  );
}
```

Note: `InsertionZone` uses `useState` from React, which is already imported in `BlockBuilder.js`.

- [ ] **Step 3: Render insertion zones between blocks**

In the Droppable block, replace the block map with insertion zones interspersed:

```jsx
{(provided) => (
  <div ref={provided.innerRef} {...provided.droppableProps}>
    {(gallery.blocks || []).map((block, index) => (
      <div key={`block-${index}`}>
        {/* Insertion zone BEFORE each block */}
        {!showBlockMenu && (
          <InsertionZone
            onInsert={() => {
              setInsertAtIndex(index);
              setShowBlockMenu(true);
            }}
          />
        )}
        <Draggable draggableId={`block-${index}`} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps}>
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
      </div>
    ))}
    {provided.placeholder}
  </div>
)}
```

- [ ] **Step 4: Reset insertAtIndex when BlockTypeMenu closes without adding**

Update `setShowBlockMenu(false)` calls to also clear `insertAtIndex`:

```jsx
// In BlockTypeMenu's onClose callback:
onClose={() => { setShowBlockMenu(false); setInsertAtIndex(null); }}
```

Do this for both the "Add Block" button's `BlockTypeMenu` and any close calls.

- [ ] **Step 5: Verify**

- Hover between two blocks → blue line and `+` circle appear
- Click the `+` → BlockTypeMenu opens
- Select a block type → new block inserted between the two existing blocks (not at the end)
- Click outside menu → insertion zone resets

- [ ] **Step 6: Commit**

```bash
git add components/admin/gallery-builder/BlockBuilder.js
git commit -m "feat: add insertion zones between blocks for mid-list block insertion"
```

---

## Task 8: Smart BlockTypeMenu positioning (popup vs popdown)

**Files:**
- Modify: `components/admin/gallery-builder/BlockTypeMenu.js`
- Modify: `components/admin/gallery-builder/BlockBuilder.js`

The menu should open upward if it would overflow the viewport bottom.

- [ ] **Step 1: Add `anchorRef` prop to BlockTypeMenu**

Update `BlockTypeMenu.js` to accept and use an `anchorRef` for positioning:

```jsx
import { useEffect, useRef, useState } from "react";

// ... BLOCK_TYPES and defaultBlock unchanged ...

export default function BlockTypeMenu({ onAdd, onClose, anchorRef }) {
  const ref = useRef(null);
  const [openUpward, setOpenUpward] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    if (!anchorRef?.current || !ref.current) return;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuHeight = 5 * 60; // approx: 5 items × ~60px each
    const spaceBelow = window.innerHeight - anchorRect.bottom;
    setOpenUpward(spaceBelow < menuHeight);
  }, [anchorRef]);

  return (
    <div
      ref={ref}
      className={`absolute left-0 ${
        openUpward ? "bottom-full mb-1" : "top-full mt-1"
      } bg-white border border-gray-200 rounded-xl shadow-lg z-30 w-64 py-1`}
    >
      {BLOCK_TYPES.map(({ type, label, desc }) => (
        <button
          key={type}
          onClick={() => { onAdd(defaultBlock(type)); onClose(); }}
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

- [ ] **Step 2: Pass anchorRef from BlockBuilder**

In `BlockBuilder.js`, create a ref for the "Add Block" button and pass it:

```jsx
const addBlockBtnRef = useRef(null);

// The Add Block button:
<div className="relative mt-2">
  <button
    ref={addBlockBtnRef}
    onClick={() => setShowBlockMenu((v) => !v)}
    className="w-full text-sm border-2 border-dashed border-gray-200 text-gray-400 py-2.5 rounded-xl hover:border-gray-400 hover:text-gray-600 transition-colors"
  >
    + Add Block
  </button>
  {showBlockMenu && (
    <BlockTypeMenu
      anchorRef={addBlockBtnRef}
      onAdd={addBlock}
      onClose={() => { setShowBlockMenu(false); setInsertAtIndex(null); }}
    />
  )}
</div>
```

For insertion-zone-triggered menus, use the insertion zone's DOM element as anchorRef. Since InsertionZone is a function component, simplify by using the bottom of the insertion zone div. A pragmatic shortcut: pass `null` for anchorRef on insertion zones (the menu at that point is near the block, not at the bottom, so it rarely overflows):

```jsx
// In InsertionZone click handler in the Droppable:
{showBlockMenu && insertAtIndex === index && (
  <BlockTypeMenu
    anchorRef={null}
    onAdd={addBlock}
    onClose={() => { setShowBlockMenu(false); setInsertAtIndex(null); }}
  />
)}
```

Wait — the `BlockTypeMenu` for insertion zones needs to render near the insertion point, not at the bottom of the list. Move the `showBlockMenu` render inside the insertion zone's parent div:

```jsx
{/* Before each block */}
<div className="relative">
  {showBlockMenu && insertAtIndex === index && (
    <BlockTypeMenu
      anchorRef={null}
      onAdd={addBlock}
      onClose={() => { setShowBlockMenu(false); setInsertAtIndex(null); }}
    />
  )}
  <InsertionZone onInsert={() => { setInsertAtIndex(index); setShowBlockMenu(true); }} />
</div>
```

- [ ] **Step 3: Verify**

- Scroll to bottom of a long block list → click "+ Add Block" → menu opens upward
- Near the top of the list, click "+ Add Block" → menu opens downward

- [ ] **Step 4: Commit**

```bash
git add components/admin/gallery-builder/BlockTypeMenu.js components/admin/gallery-builder/BlockBuilder.js
git commit -m "feat: smart BlockTypeMenu positioning — opens up or down based on viewport"
```

---

## Task 9: Gallery meta improvements — thumbnail image picker, slug, visibility

**Files:**
- Modify: `components/admin/gallery-builder/BlockBuilder.js`
- Modify: `components/admin/gallery-builder/GalleryBuilder.js`

Replace the thumbnail URL text input with an image square (click to pick from library). Add `slug` and `visibility` fields.

- [ ] **Step 1: Add thumbnail picker to GalleryBuilder**

In `GalleryBuilder.js`, add state for thumbnail picker:

```jsx
const [thumbnailPickerOpen, setThumbnailPickerOpen] = useState(false);
```

Add handler:
```jsx
const handleThumbnailConfirm = (urls) => {
  setThumbnailPickerOpen(false);
  if (urls.length > 0) {
    setGallery((prev) => ({ ...prev, thumbnailUrl: urls[0] }));
  }
};
```

Add thumbnail `PhotoPickerModal` alongside the existing one in the render:
```jsx
{thumbnailPickerOpen && (
  <PhotoPickerModal
    images={libraryImages || []}
    loading={libraryLoading}
    blockType="photo"
    onConfirm={handleThumbnailConfirm}
    onClose={() => setThumbnailPickerOpen(false)}
  />
)}
```

Pass `onPickThumbnail` to `BlockBuilder`:
```jsx
<BlockBuilder
  gallery={gallery}
  onChange={setGallery}
  onSave={handleSave}
  saving={saving}
  onAddPhotosToBlock={handleAddPhotosToBlock}
  onPickThumbnail={() => { fetchLibrary(); setThumbnailPickerOpen(true); }}
/>
```

- [ ] **Step 2: Update BlockBuilder meta section**

Replace the meta section in `BlockBuilder.js`:

```jsx
{/* Gallery meta */}
<div className="px-4 py-4 border-b border-gray-100 space-y-3 flex-shrink-0 bg-white">
  {/* Name */}
  <input
    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder-gray-300"
    placeholder="Gallery name"
    value={gallery.name || ""}
    onChange={(e) => updateField("name", e.target.value)}
  />

  {/* Slug */}
  <input
    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-500 outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder-gray-300 font-mono"
    placeholder="slug (auto-generated from name)"
    value={gallery.slug || ""}
    onChange={(e) => updateField("slug", e.target.value)}
  />

  {/* Description */}
  <textarea
    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors resize-none placeholder-gray-300"
    placeholder="Description (optional)"
    rows={2}
    value={gallery.description || ""}
    onChange={(e) => updateField("description", e.target.value)}
  />

  {/* Visibility */}
  <select
    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none focus:border-gray-400 focus:bg-white transition-colors"
    value={gallery.visibility || "public"}
    onChange={(e) => updateField("visibility", e.target.value)}
  >
    <option value="public">Public</option>
    <option value="unlisted">Unlisted</option>
    <option value="private">Private</option>
  </select>

  {/* Thumbnail image picker */}
  <div>
    <div className="text-xs text-gray-400 mb-1.5 font-medium">Thumbnail</div>
    <div
      onClick={onPickThumbnail}
      className={`relative w-16 h-16 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition-colors ${
        gallery.thumbnailUrl
          ? "border-transparent"
          : "border-gray-200 hover:border-gray-400 bg-gray-50 flex items-center justify-center"
      }`}
    >
      {gallery.thumbnailUrl ? (
        <img
          src={`/_next/image?url=${encodeURIComponent(gallery.thumbnailUrl)}&w=200&q=70`}
          alt="Thumbnail"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-300 text-xl">🖼</span>
      )}
    </div>
  </div>
</div>
```

Update `BlockBuilder` prop signature to include `onPickThumbnail`:
```jsx
export default function BlockBuilder({
  gallery,
  onChange,
  onSave,
  saving,
  onAddPhotosToBlock,
  onPickThumbnail,
}) {
```

- [ ] **Step 3: Verify**

- Gallery meta section shows: Name, Slug (mono font), Description, Visibility dropdown, Thumbnail square
- Clicking the thumbnail square opens the photo picker and sets the thumbnail
- Visibility dropdown saves correctly when gallery is saved

- [ ] **Step 4: Commit**

```bash
git add components/admin/gallery-builder/BlockBuilder.js components/admin/gallery-builder/GalleryBuilder.js
git commit -m "feat: add slug, visibility, and thumbnail image picker to gallery meta"
```

---

## Self-Review

**Spec coverage check:**

| Requirement | Task |
|-------------|------|
| + and ⋯ icons instead of separate buttons | Task 2 |
| No drag hint when photos present | Task 4 |
| Paintbrush icon for design/variants popup | Task 3 |
| Left-align block titles | Task 2 |
| Drop shadows and shaded panel bg | Task 1 |
| Insert blocks between blocks | Task 7 |
| Smart popup/popdown menu positioning | Task 8 |
| Thumbnail URL → image picker | Task 9 |
| Photos as popup (not sidebar) | Tasks 5+6 |
| Library + Upload tabs in picker | Task 5 |
| Natural aspect ratios | Tasks 4+5 |
| Gallery visibility field | Task 9 |
| Gallery slug field | Task 9 |
| Stylistic inputs | Tasks 1+9 |

All requirements covered. No placeholders. Types and prop names consistent across tasks.
