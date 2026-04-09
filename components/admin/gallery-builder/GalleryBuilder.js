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
      if (!block) return prev;
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
