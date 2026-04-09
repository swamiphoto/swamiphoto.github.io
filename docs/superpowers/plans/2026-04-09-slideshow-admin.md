# Slideshow Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a slideshow admin page at `/admin/galleries/[slug]/slideshow` where users configure cover, images, music, and theme — with a live Slideshow preview on the right.

**Architecture:** Three new files (`SlideshowBuilder`, `SlideshowSidebar`, new page) follow the exact same two-panel pattern as `GalleryBuilder`/`BlockBuilder`. Changes autosave into the gallery's existing draft mechanism via the same `/api/admin/galleries` PUT endpoint — no new API. The right panel renders the real `Slideshow` component live.

**Tech Stack:** Next.js 14 (pages router), React, Tailwind CSS stone palette, existing `Slideshow` component from `components/image-displays/slideshow/Slideshow.js`

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `components/admin/gallery-builder/BlockBuilder.js` | Modify | Add enableSlideshow toggle + Customize link in Gallery Info card |
| `pages/galleries/[gallerySlug]/slideshow.js` | Modify | Backward compat: read `youtubeLink` (single) with fallback to `youtubeLinks[0]` |
| `pages/admin/galleries/new.js` | Modify | Add new slideshowSettings fields to DEFAULT_GALLERY |
| `components/admin/slideshow-builder/SlideshowBuilder.js` | Create | Two-panel layout: SlideshowSidebar + live Slideshow preview |
| `components/admin/slideshow-builder/SlideshowSidebar.js` | Create | Sidebar with Cover, Images, Music collapsible cards |
| `pages/admin/galleries/[slug]/slideshow.js` | Create | Page that loads gallery config and renders SlideshowBuilder |

---

### Task 1: Backward compat + data model defaults

**Files:**
- Modify: `pages/galleries/[gallerySlug]/slideshow.js:39`
- Modify: `pages/admin/galleries/new.js:13`

- [ ] **Step 1: Update slideshow render page to read single `youtubeLink` with fallback**

In `pages/galleries/[gallerySlug]/slideshow.js`, find line 39:
```js
const { layout = "kenburns", youtubeLinks = ["https://www.youtube.com/watch?v=PYujyluMxMU"], customDurations = {}, duration = 10000, captions = {}, coverImageIndex = 0, musicCredits = [] } = slideshowSettings;
```

Replace with:
```js
const {
  layout = "kenburns",
  youtubeLinks,
  youtubeLink,
  customDurations = {},
  duration = 10000,
  captions = {},
  coverImageUrl = "",
  musicCredit = "",
  musicCredits = [],
  excludedImageUrls = [],
} = slideshowSettings;

// Single track: prefer youtubeLink, fall back to first of youtubeLinks[]
const resolvedYoutubeUrl = youtubeLink || (youtubeLinks && youtubeLinks[0]) || "https://www.youtube.com/watch?v=PYujyluMxMU";
const resolvedMusicCredits = musicCredit ? [musicCredit] : musicCredits;
```

Then update the `<Slideshow>` prop `youtubeUrl={youtubeLinks[Math.floor(Math.random() * youtubeLinks.length)]}` to:
```js
youtubeUrl={resolvedYoutubeUrl}
musicCredits={resolvedMusicCredits}
```

Also update slides derivation to exclude `excludedImageUrls`. Find the block where `combinedSlides` is built. After line 30, before `return combinedSlides`, add:
```js
const excludedSet = new Set(excludedImageUrls);
return combinedSlides.filter(slide => !slide.url || !excludedSet.has(slide.url));
```

- [ ] **Step 2: Update DEFAULT_GALLERY in new.js**

In `pages/admin/galleries/new.js`, replace line 13:
```js
slideshowSettings: { youtubeLinks: [], musicCredits: [], layout: "kenburns" },
```
With:
```js
slideshowSettings: {
  layout: "kenburns",
  youtubeLink: "",
  musicCredit: "",
  coverImageUrl: "",
  title: "",
  description: "",
  excludedImageUrls: [],
},
```

- [ ] **Step 3: Commit**
```bash
git add pages/galleries/[gallerySlug]/slideshow.js pages/admin/galleries/new.js
git commit -m "feat: backward compat for single youtubeLink + excludedImageUrls in slideshow"
```

---

### Task 2: Add enableSlideshow toggle + Customize link to Gallery Info

**Files:**
- Modify: `components/admin/gallery-builder/BlockBuilder.js:178-187`

- [ ] **Step 1: Add imports at top of BlockBuilder.js**

Add to the imports at the top (after existing imports):
```js
import Link from "next/link";
```

- [ ] **Step 2: Add slideshow toggle and Customize link after the Unlisted row**

Find the Unlisted row block ending at line 187:
```jsx
              {/* Unlisted row — separate */}
              <div
                className="flex items-center gap-2 cursor-pointer pt-0.5"
                onClick={() => updateField("visibility", gallery.visibility === "unlisted" ? "public" : "unlisted")}
              >
                <div className={`w-7 h-[14px] rounded-full transition-colors relative flex-shrink-0 ${gallery.visibility === "unlisted" ? "bg-stone-700" : "bg-stone-300"}`}>
                  <div className={`absolute top-[2px] w-[10px] h-[10px] bg-white rounded-full shadow-sm transition-transform ${gallery.visibility === "unlisted" ? "translate-x-[14px]" : "translate-x-[2px]"}`} />
                </div>
                <span className="text-xs text-stone-500 select-none">Unlisted</span>
              </div>
```

After that closing `</div>`, add:
```jsx
              {/* Slideshow row */}
              <div className="flex items-center justify-between pt-0.5">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => updateField("enableSlideshow", !gallery.enableSlideshow)}
                >
                  <div className={`w-7 h-[14px] rounded-full transition-colors relative flex-shrink-0 ${gallery.enableSlideshow ? "bg-stone-700" : "bg-stone-300"}`}>
                    <div className={`absolute top-[2px] w-[10px] h-[10px] bg-white rounded-full shadow-sm transition-transform ${gallery.enableSlideshow ? "translate-x-[14px]" : "translate-x-[2px]"}`} />
                  </div>
                  <span className="text-xs text-stone-500 select-none">Include slideshow</span>
                </div>
                {gallery.enableSlideshow && gallery.slug && (
                  <Link
                    href={`/admin/galleries/${gallery.slug}/slideshow`}
                    className="text-xs text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors"
                  >
                    Customize →
                  </Link>
                )}
              </div>
```

- [ ] **Step 3: Verify**

Start dev server (`npm run dev`), open any gallery in the admin builder, expand Gallery Info. Confirm:
- "Include slideshow" toggle appears below Unlisted
- Toggling it on shows "Customize →" link (only when slug exists)
- Toggling it off hides the link
- "Customize →" navigates to `/admin/galleries/[slug]/slideshow` (will 404 until Task 6)

- [ ] **Step 4: Commit**
```bash
git add components/admin/gallery-builder/BlockBuilder.js
git commit -m "feat: add enableSlideshow toggle and Customize link to Gallery Info"
```

---

### Task 3: Create SlideshowSidebar — Cover card

**Files:**
- Create: `components/admin/slideshow-builder/SlideshowSidebar.js`

This task creates the file with only the Cover card working. Tasks 4 and 5 add the remaining cards.

- [ ] **Step 1: Create the music presets constant file**

Create `components/admin/slideshow-builder/musicPresets.js`:
```js
// components/admin/slideshow-builder/musicPresets.js
export const MUSIC_PRESETS = [
  { label: "Eléana — Richard Clayderman", url: "https://www.youtube.com/watch?v=IvoAT-5HKwM" },
  { label: "Piano Relaxing", url: "https://www.youtube.com/watch?v=PYujyluMxMU" },
  { label: "Soft Piano", url: "https://www.youtube.com/watch?v=qj4RiKoARPk" },
  { label: "Calm Instrumental", url: "https://www.youtube.com/watch?v=BciS5krYL80" },
  { label: "Gentle Piano", url: "https://www.youtube.com/watch?v=_iktURk0X-A" },
  { label: "Peaceful Music", url: "https://www.youtube.com/watch?v=BeUSuSXBqMQ" },
  { label: "Ambient Piano", url: "https://www.youtube.com/watch?v=JkfSV51U-64" },
  { label: "Relaxing Piano", url: "https://www.youtube.com/watch?v=puOnVzlkrQM" },
  { label: "Soft Instrumental", url: "https://www.youtube.com/watch?v=hzGHrQBq_i4" },
  { label: "Tranquil Music", url: "https://www.youtube.com/watch?v=6P5zx_rxlhI" },
  { label: "Calm Piano", url: "https://www.youtube.com/watch?v=Kpjo3Cxc_90" },
  { label: "Peaceful Instrumental", url: "https://www.youtube.com/watch?v=OBUauvQLrQQ" },
  { label: "Soft Ambient", url: "https://www.youtube.com/watch?v=OhswLOVzXNc" },
  { label: "Gentle Instrumental", url: "https://www.youtube.com/watch?v=S61L1fpqFXE" },
  { label: "Relaxing Ambient", url: "https://www.youtube.com/watch?v=ZTmF2v59CtI" },
  { label: "Calm Instrumental 2", url: "https://www.youtube.com/watch?v=LD5W8W7-0II" },
  { label: "Piano Meditation", url: "https://www.youtube.com/watch?v=U1FZVpcKhGg" },
  { label: "Soft Piano 2", url: "https://www.youtube.com/watch?v=qmBW9-fUvag" },
  { label: "Ambient 2", url: "https://www.youtube.com/watch?v=g4M0hH1R2eU" },
  { label: "Gentle Ambient", url: "https://www.youtube.com/watch?v=mVsmFCgxc1o" },
];
```

- [ ] **Step 2: Create SlideshowSidebar.js with Cover card only**

Create `components/admin/slideshow-builder/SlideshowSidebar.js`:
```jsx
// components/admin/slideshow-builder/SlideshowSidebar.js
import { useState } from "react";
import Link from "next/link";
import { MUSIC_PRESETS } from "./musicPresets";

const THEMES = [
  { label: "Ken Burns", value: "kenburns" },
  { label: "Film Stack", value: "film-stack" },
  { label: "Film Single", value: "film-single" },
];

const INPUT = "w-full border-b border-stone-200 pb-1.5 text-sm text-stone-800 outline-none focus:border-stone-500 transition-colors placeholder:text-stone-300 bg-transparent";

function ChevronIcon({ expanded }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform ${expanded ? "" : "rotate-180"}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );
}

function Card({ title, children, defaultExpanded = true }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <div className="bg-white border border-stone-200 rounded-lg shadow-sm overflow-hidden mb-1.5">
      <button
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-stone-50 transition-colors"
        onClick={() => setExpanded(v => !v)}
      >
        <span className="text-xs font-semibold text-stone-600 flex-1 tracking-wide">{title}</span>
        <ChevronIcon expanded={expanded} />
      </button>
      {expanded && (
        <div className="px-3 pb-3 border-t border-stone-100 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

export default function SlideshowSidebar({
  gallery,
  onChange,
  onPublish,
  publishing,
  autosaveStatus,
  hasDraft,
  isPublished,
  onPickCover,
}) {
  const ss = gallery.slideshowSettings || {};

  const updateSS = (key, value) => onChange({
    ...gallery,
    slideshowSettings: { ...ss, [key]: value },
  });

  return (
    <div
      className="w-72 flex-shrink-0 flex flex-col h-full bg-stone-50 relative z-10"
      style={{ boxShadow: "1px 0 0 #e7e5e3, 4px 0 20px rgba(0,0,0,0.05)" }}
    >
      {/* Header */}
      <div className="px-3 pt-3 pb-3 flex items-center gap-2 flex-shrink-0 border-b border-stone-200">
        <Link
          href={`/admin/galleries/${gallery.slug}`}
          className="text-stone-400 hover:text-stone-700 transition-colors text-sm leading-none"
        >
          ←
        </Link>
        <span className="text-xs tracking-widest font-medium text-stone-400 flex-1">SLIDESHOW</span>
        <span className="text-[10px] text-stone-400">
          {autosaveStatus === "saving" && "Saving…"}
          {autosaveStatus === "saved" && "Saved"}
          {autosaveStatus === "unsaved" && "Unsaved"}
        </span>
        <button
          onClick={onPublish}
          disabled={publishing || (isPublished && !hasDraft)}
          className="text-xs font-semibold bg-stone-900 text-white px-4 py-1.5 hover:bg-stone-700 disabled:opacity-40 transition-colors"
        >
          {publishing ? "Publishing…" : isPublished && !hasDraft ? "Published ✓" : isPublished && hasDraft ? "Publish changes" : "Publish"}
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0">

        {/* Cover card */}
        <Card title="Cover">
          <div className="space-y-3">
            {/* Theme */}
            <div>
              <div className="text-[10px] font-medium text-stone-400 uppercase tracking-wider mb-1.5 pl-0.5">Theme</div>
              <div className="flex gap-1.5">
                {THEMES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => updateSS("layout", t.value)}
                    className={`text-xs px-2.5 py-1 border transition-colors ${
                      (ss.layout || "kenburns") === t.value
                        ? "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-200 text-stone-600 hover:border-stone-400"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cover photo */}
            <div className="flex items-center gap-3 pt-0.5">
              <div
                onClick={onPickCover}
                className={`w-12 h-12 overflow-hidden flex-shrink-0 flex items-center justify-center border border-stone-200 cursor-pointer hover:border-stone-400 transition-colors ${ss.coverImageUrl ? "" : "bg-stone-50"}`}
              >
                {ss.coverImageUrl ? (
                  <img src={`/_next/image?url=${encodeURIComponent(ss.coverImageUrl)}&w=200&q=70`} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-4 h-4 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5" />
                  </svg>
                )}
              </div>
              <button onClick={onPickCover} className="text-xs text-stone-600 hover:text-stone-900 transition-colors underline underline-offset-2">
                Select cover photo
              </button>
            </div>

            {/* Title */}
            <input
              className={INPUT}
              placeholder={gallery.name || "Slideshow title"}
              value={ss.title || ""}
              onChange={e => updateSS("title", e.target.value)}
            />

            {/* Description */}
            <textarea
              className={`${INPUT} resize-none`}
              placeholder={gallery.description || "Slideshow description"}
              rows={2}
              value={ss.description || ""}
              onChange={e => updateSS("description", e.target.value)}
            />
          </div>
        </Card>

        {/* Images and Music cards — added in Tasks 4 & 5 */}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add components/admin/slideshow-builder/musicPresets.js components/admin/slideshow-builder/SlideshowSidebar.js
git commit -m "feat: SlideshowSidebar with Cover card (theme, cover photo, title, description)"
```

---

### Task 4: Add Images card to SlideshowSidebar

**Files:**
- Modify: `components/admin/slideshow-builder/SlideshowSidebar.js`

The Images card shows all gallery photos in a grid. Right-click opens a context menu to exclude/include. Excluded photos are 0.3 opacity with a ✕ badge.

- [ ] **Step 1: Add helper to collect all gallery images**

At the top of `SlideshowSidebar.js`, after the imports, add:
```js
function collectGalleryImages(blocks) {
  const urls = [];
  for (const block of blocks || []) {
    if (block.type === "photo" && block.imageUrl) urls.push(block.imageUrl);
    if ((block.type === "stacked" || block.type === "masonry") && block.imageUrls) {
      urls.push(...block.imageUrls);
    }
  }
  return urls;
}
```

- [ ] **Step 2: Add context menu state and Images card to `SlideshowSidebar`**

Inside `SlideshowSidebar`, add state for the context menu after the `ss` destructure:
```js
const [contextMenu, setContextMenu] = useState(null); // { x, y, url }
```

Add a `useEffect` to close context menu on outside click (add after state declarations):
```js
// Close context menu on click outside
useEffect(() => {
  if (!contextMenu) return;
  const close = () => setContextMenu(null);
  window.addEventListener("click", close);
  return () => window.removeEventListener("click", close);
}, [contextMenu]);
```

Add the missing `useEffect` import — update the import at the top:
```js
import { useState, useEffect } from "react";
```

- [ ] **Step 3: Add the Images card JSX**

Replace `{/* Images and Music cards — added in Tasks 4 & 5 */}` with:
```jsx
        {/* Images card */}
        <Card title="Images">
          {(() => {
            const allUrls = collectGalleryImages(gallery.blocks);
            const excluded = new Set(ss.excludedImageUrls || []);
            if (allUrls.length === 0) {
              return <p className="text-xs text-stone-400">No images in this gallery yet.</p>;
            }
            return (
              <div className="grid grid-cols-3 gap-px bg-stone-200">
                {allUrls.map((url) => {
                  const isExcluded = excluded.has(url);
                  return (
                    <div
                      key={url}
                      className="relative group/thumb aspect-square bg-stone-100 overflow-hidden cursor-context-menu"
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu({ x: e.clientX, y: e.clientY, url });
                      }}
                    >
                      <img
                        src={`/_next/image?url=${encodeURIComponent(url)}&w=200&q=65`}
                        alt=""
                        className="w-full h-full object-cover"
                        style={{ opacity: isExcluded ? 0.3 : 1 }}
                        loading="lazy"
                      />
                      {isExcluded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-stone-500 text-xs font-bold bg-white/80 rounded px-1">✕</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </Card>

        {/* Music card — added in Task 5 */}

        {/* Context menu */}
        {contextMenu && (
          <div
            className="fixed bg-white border border-stone-200 shadow-lg z-[9999] py-1 w-44"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={e => e.stopPropagation()}
          >
            {(() => {
              const excluded = new Set(ss.excludedImageUrls || []);
              const isExcluded = excluded.has(contextMenu.url);
              const toggle = () => {
                const next = isExcluded
                  ? (ss.excludedImageUrls || []).filter(u => u !== contextMenu.url)
                  : [...(ss.excludedImageUrls || []), contextMenu.url];
                updateSS("excludedImageUrls", next);
                setContextMenu(null);
              };
              return (
                <button
                  onClick={toggle}
                  className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  {isExcluded ? "Include in slideshow" : "Exclude from slideshow"}
                </button>
              );
            })()}
          </div>
        )}
```

- [ ] **Step 4: Commit**
```bash
git add components/admin/slideshow-builder/SlideshowSidebar.js
git commit -m "feat: Images card with right-click exclude/include in SlideshowSidebar"
```

---

### Task 5: Add Music card to SlideshowSidebar

**Files:**
- Modify: `components/admin/slideshow-builder/SlideshowSidebar.js`

- [ ] **Step 1: Replace the Music card placeholder**

Replace `{/* Music card — added in Task 5 */}` with:
```jsx
        {/* Music card */}
        <Card title="Music">
          <div className="space-y-2.5">
            {/* Preset dropdown */}
            <div>
              <div className="text-[10px] font-medium text-stone-400 uppercase tracking-wider mb-1.5">Track</div>
              <select
                className="w-full border-b border-stone-200 pb-1.5 text-sm text-stone-800 outline-none focus:border-stone-500 bg-transparent transition-colors"
                value={MUSIC_PRESETS.some(p => p.url === ss.youtubeLink) ? ss.youtubeLink : (ss.youtubeLink ? "__custom__" : "")}
                onChange={e => {
                  if (e.target.value === "__custom__") {
                    updateSS("youtubeLink", "");
                  } else {
                    const preset = MUSIC_PRESETS.find(p => p.url === e.target.value);
                    onChange({
                      ...gallery,
                      slideshowSettings: {
                        ...ss,
                        youtubeLink: e.target.value,
                        musicCredit: preset ? preset.label : ss.musicCredit,
                      },
                    });
                  }
                }}
              >
                <option value="">Select a track…</option>
                {MUSIC_PRESETS.map(p => (
                  <option key={p.url} value={p.url}>{p.label}</option>
                ))}
                <option value="__custom__">Custom URL…</option>
              </select>
            </div>

            {/* Custom URL input — shown when custom is selected or no preset match */}
            {(ss.youtubeLink && !MUSIC_PRESETS.some(p => p.url === ss.youtubeLink)) || (!ss.youtubeLink && MUSIC_PRESETS.every(p => p.url !== ss.youtubeLink) && ss.youtubeLink !== undefined) ? (
              <input
                className="w-full border-b border-stone-200 pb-1.5 text-sm text-stone-800 outline-none focus:border-stone-500 transition-colors placeholder:text-stone-300 bg-transparent"
                placeholder="YouTube URL"
                value={ss.youtubeLink || ""}
                onChange={e => updateSS("youtubeLink", e.target.value)}
              />
            ) : null}

            {/* Music credit */}
            <input
              className="w-full border-b border-stone-200 pb-1.5 text-sm text-stone-800 outline-none focus:border-stone-500 transition-colors placeholder:text-stone-300 bg-transparent"
              placeholder="Music credit (e.g. Music: Song — Artist)"
              value={ss.musicCredit || ""}
              onChange={e => updateSS("musicCredit", e.target.value)}
            />
          </div>
        </Card>
```

- [ ] **Step 2: Fix the custom URL visibility logic (simpler condition)**

The condition for showing the custom URL input can be simplified. Replace the custom URL input block with:
```jsx
            {/* Custom URL input — shown when "Custom URL…" is active */}
            {ss.youtubeLink !== undefined && !MUSIC_PRESETS.some(p => p.url === ss.youtubeLink) && (
              <input
                className="w-full border-b border-stone-200 pb-1.5 text-sm text-stone-800 outline-none focus:border-stone-500 transition-colors placeholder:text-stone-300 bg-transparent"
                placeholder="YouTube URL"
                value={ss.youtubeLink || ""}
                onChange={e => updateSS("youtubeLink", e.target.value)}
              />
            )}
```

- [ ] **Step 3: Commit**
```bash
git add components/admin/slideshow-builder/SlideshowSidebar.js
git commit -m "feat: Music card with preset dropdown and custom URL in SlideshowSidebar"
```

---

### Task 6: Create SlideshowBuilder — two-panel layout with autosave

**Files:**
- Create: `components/admin/slideshow-builder/SlideshowBuilder.js`

This is the orchestrating component: manages state, autosave, publish, photo picker, and renders `SlideshowSidebar` + live `Slideshow` preview side by side.

- [ ] **Step 1: Create SlideshowBuilder.js**

Create `components/admin/slideshow-builder/SlideshowBuilder.js`:
```jsx
// components/admin/slideshow-builder/SlideshowBuilder.js
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SlideshowSidebar from "./SlideshowSidebar";
import PhotoPickerModal from "../gallery-builder/PhotoPickerModal";
import Slideshow from "../../image-displays/slideshow/Slideshow";

function collectGalleryImages(blocks) {
  const urls = [];
  for (const block of blocks || []) {
    if (block.type === "photo" && block.imageUrl) urls.push(block.imageUrl);
    if ((block.type === "stacked" || block.type === "masonry") && block.imageUrls) {
      urls.push(...block.imageUrls);
    }
  }
  return urls;
}

export default function SlideshowBuilder({ initialGallery, galleryIndex, allGalleries }) {
  const router = useRouter();

  const [gallery, setGallery] = useState(() => {
    if (initialGallery.draft) return { ...initialGallery, ...initialGallery.draft };
    return initialGallery;
  });

  const [publishing, setPublishing] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState("idle");
  const [hasDraft, setHasDraft] = useState(!!initialGallery.draft);
  const [coverPickerOpen, setCoverPickerOpen] = useState(false);
  const [libraryImages, setLibraryImages] = useState(null);
  const [libraryLoading, setLibraryLoading] = useState(false);

  const allGalleriesRef = useRef(allGalleries);
  useEffect(() => { allGalleriesRef.current = allGalleries; }, [allGalleries]);

  const galleryRef = useRef(gallery);
  useEffect(() => { galleryRef.current = gallery; }, [gallery]);

  const isFirstRender = useRef(true);

  // Autosave
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setAutosaveStatus("unsaved");
    const timer = setTimeout(async () => {
      const g = galleryRef.current;
      if (!g.slug) return;
      setAutosaveStatus("saving");
      try {
        const draftData = { ...g };
        delete draftData.draft;
        const updatedGalleries = allGalleriesRef.current.map((x, i) =>
          i === galleryIndex ? { ...x, draft: draftData } : x
        );
        const res = await fetch("/api/admin/galleries", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ galleries: updatedGalleries }),
        });
        if (res.ok) { setAutosaveStatus("saved"); setHasDraft(true); }
        else setAutosaveStatus("unsaved");
      } catch { setAutosaveStatus("unsaved"); }
    }, 1500);
    return () => clearTimeout(timer);
  }, [gallery, galleryIndex]);

  const fetchLibrary = useCallback(() => {
    if (libraryImages !== null) return;
    setLibraryLoading(true);
    fetch("/api/admin/library")
      .then(r => r.json())
      .then(data => setLibraryImages(data.allImages || []))
      .catch(() => setLibraryImages([]))
      .finally(() => setLibraryLoading(false));
  }, [libraryImages]);

  const handlePickCover = () => { fetchLibrary(); setCoverPickerOpen(true); };

  const handleCoverConfirm = (urls) => {
    setCoverPickerOpen(false);
    if (urls.length === 0) return;
    setGallery(prev => ({
      ...prev,
      slideshowSettings: { ...(prev.slideshowSettings || {}), coverImageUrl: urls[0] },
    }));
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const g = galleryRef.current;
      if (!g.slug) { alert("Gallery has no slug."); return; }
      const publishedGallery = { ...g, status: "published" };
      delete publishedGallery.draft;
      const updatedGalleries = allGalleriesRef.current.map((x, i) =>
        i === galleryIndex ? publishedGallery : x
      );
      const res = await fetch("/api/admin/galleries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ galleries: updatedGalleries }),
      });
      if (!res.ok) throw new Error(`Publish failed ${res.status}`);
      setGallery(publishedGallery);
      setHasDraft(false);
      setAutosaveStatus("saved");
    } catch (err) {
      alert(`Error publishing: ${err.message}`);
    } finally {
      setPublishing(false);
    }
  };

  // Derive live preview props
  const ss = gallery.slideshowSettings || {};
  const excludedSet = new Set(ss.excludedImageUrls || []);
  const allImages = collectGalleryImages(gallery.blocks);
  const coverUrl = ss.coverImageUrl;

  let slides = allImages
    .filter(url => !excludedSet.has(url))
    .map(url => ({ type: "image", url }));

  if (coverUrl && !excludedSet.has(coverUrl)) {
    slides = [
      { type: "image", url: coverUrl },
      ...slides.filter(s => s.url !== coverUrl),
    ];
  }

  const isPublished = initialGallery.status === "published";

  return (
    <div className="flex h-screen bg-stone-50 font-sans">
      <SlideshowSidebar
        gallery={gallery}
        onChange={setGallery}
        onPublish={handlePublish}
        publishing={publishing}
        autosaveStatus={autosaveStatus}
        hasDraft={hasDraft}
        isPublished={isPublished}
        onPickCover={handlePickCover}
      />

      {/* Live preview */}
      <div className="flex-1 relative overflow-hidden">
        {slides.length === 0 ? (
          <div className="flex items-center justify-center h-full text-stone-300 text-sm">
            Add photos to your gallery to preview the slideshow
          </div>
        ) : (
          <Slideshow
            key={ss.youtubeLink || "no-music"}
            slides={slides}
            layout={ss.layout || "kenburns"}
            title={ss.title || gallery.name || ""}
            subtitle={ss.description || gallery.description || ""}
            youtubeUrl={ss.youtubeLink || ""}
            thumbnailUrl={coverUrl || gallery.thumbnailUrl || ""}
            musicCredits={ss.musicCredit ? [ss.musicCredit] : []}
            slug={gallery.slug}
          />
        )}
      </div>

      {coverPickerOpen && (
        <PhotoPickerModal
          images={libraryImages || []}
          loading={libraryLoading}
          blockType="photo"
          onConfirm={handleCoverConfirm}
          onClose={() => setCoverPickerOpen(false)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add components/admin/slideshow-builder/SlideshowBuilder.js
git commit -m "feat: SlideshowBuilder with autosave, publish, cover picker, and live Slideshow preview"
```

---

### Task 7: Create the slideshow admin page

**Files:**
- Create: `pages/admin/galleries/[slug]/slideshow.js`

- [ ] **Step 1: Create the page**

Create `pages/admin/galleries/[slug]/slideshow.js`:
```jsx
// pages/admin/galleries/[slug]/slideshow.js
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SlideshowBuilder from "../../../../components/admin/slideshow-builder/SlideshowBuilder";

export default function SlideshowAdminPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/admin/galleries")
      .then(r => r.ok ? r.json() : Promise.reject(`API error ${r.status}`))
      .then(config => {
        const index = config.galleries.findIndex(g => g.slug === slug);
        if (index === -1) throw new Error(`Gallery "${slug}" not found`);
        setData({ gallery: config.galleries[index], index, allGalleries: config.galleries });
      })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex items-center justify-center h-screen text-stone-400 text-sm">Loading…</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500 text-sm">Error: {error}</div>;

  return (
    <>
      <Head><title>{data.gallery.name} — Slideshow Admin</title></Head>
      <SlideshowBuilder
        initialGallery={data.gallery}
        galleryIndex={data.index}
        allGalleries={data.allGalleries}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify end-to-end**

With dev server running:
1. Open `/admin/galleries` → pick any gallery with photos → click Edit
2. Expand Gallery Info → toggle "Include slideshow" on
3. Confirm "Customize →" link appears
4. Click "Customize →" — should load `/admin/galleries/[slug]/slideshow`
5. Left sidebar shows "SLIDESHOW" header with ← back link
6. Cover card: pick a theme pill, pick a cover photo, edit title/description
7. Images card: grid of all gallery photos, right-click one → "Exclude from slideshow" → photo dims to 0.3 opacity
8. Right-click excluded photo → "Include in slideshow" → opacity restores
9. Music card: select a preset from dropdown → credit auto-fills
10. Change any setting → "Saving…" then "Saved" in the header
11. Right panel shows the live Slideshow component with cover screen and play button
12. Publish button enabled when there's a draft; shows "Publish changes" or "Publish"

- [ ] **Step 3: Commit**
```bash
git add pages/admin/galleries/[slug]/slideshow.js
git commit -m "feat: slideshow admin page at /admin/galleries/[slug]/slideshow"
```
