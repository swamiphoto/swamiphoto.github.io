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
