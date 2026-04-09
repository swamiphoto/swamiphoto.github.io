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

      if (isNew) {
        const slugExists = allGalleries.some((g) => g.slug === galleryToSave.slug);
        if (slugExists) {
          alert(`A gallery with the slug "${galleryToSave.slug}" already exists. Please use a different name.`);
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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
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
          activeBlockIndex={activeBlockIndex}
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
