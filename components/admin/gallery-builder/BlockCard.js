import { useState, useRef, useEffect } from "react";
import DesignPopover from "./DesignPopover";

const TYPE_LABELS = {
  photo: "Photo",
  stacked: "Stacked Gallery",
  masonry: "Masonry Gallery",
  text: "Text",
  video: "Video",
};


export default function BlockCard({
  block,
  dragHandleProps,
  onUpdate,
  onRemove,
  onAddPhotos,
  onRemovePhoto,
}) {
  const isPhotoBlock = block.type === "stacked" || block.type === "masonry";

  const [showMenu, setShowMenu] = useState(false);
  const [showDesign, setShowDesign] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
      className="bg-white rounded-xl p-4 mb-2 shadow-sm ring-1 ring-gray-100"
      onDragOver={isPhotoBlock ? handleDragOver : undefined}
      onDrop={isPhotoBlock ? handleDrop : undefined}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 mb-3">
        {/* Drag handle */}
        <span
          {...dragHandleProps}
          className="text-gray-300 cursor-grab hover:text-gray-400 text-base leading-none select-none flex-shrink-0"
        >
          ⠿
        </span>

        {/* Block type label — left-aligned */}
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex-1">
          {TYPE_LABELS[block.type] || block.type}
        </span>

        {/* + icon — only for photo/stacked/masonry */}
        {(block.type === "photo" || isPhotoBlock) && (
          <button
            onClick={onAddPhotos}
            title="Add photos"
            className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium leading-none"
          >
            +
          </button>
        )}

        {/* ✦ design icon */}
        {(block.type === "photo" || block.type === "text" || block.type === "video") && (
          <div className="relative">
            <button
              onClick={() => setShowDesign((v) => !v)}
              title="Design options"
              className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors text-xs leading-none ${
                showDesign ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
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

      {/* Photo block */}
      {block.type === "photo" && (
        <div className="space-y-2">
          {/* Image preview / drop zone */}
          <div
            className={`rounded-lg overflow-hidden border-2 border-dashed transition-colors ${
              block.imageUrl ? "border-transparent" : "border-gray-200 hover:border-gray-400 cursor-pointer"
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const url = e.dataTransfer.getData("text/plain");
              if (url) onUpdate({ ...block, imageUrl: url });
            }}
            onClick={() => { if (!block.imageUrl) onAddPhotos(); }}
          >
            {block.imageUrl ? (
              <div className="relative group">
                <img
                  src={`/_next/image?url=${encodeURIComponent(block.imageUrl)}&w=400&q=70`}
                  alt=""
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); onUpdate({ ...block, imageUrl: "" }); }}
                  className="absolute top-1.5 right-1.5 bg-black/60 text-white text-xs rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  × Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-20 text-gray-400 text-xs text-center px-3 gap-1">
                <span className="text-lg">🖼</span>
                Drag a photo here, or click + to pick one
              </div>
            )}
          </div>
          <input
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300"
            placeholder="Caption (optional)"
            value={block.caption || ""}
            onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
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
                  <img src={`/_next/image?url=${encodeURIComponent(url)}&w=200&q=65`} alt="" className="w-full h-full object-cover" loading="lazy" />
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
        </div>
      )}

      {/* Text block */}
      {block.type === "text" && (
        <div className="space-y-2">
          <textarea
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300 resize-none"
            placeholder="Text content"
            rows={3}
            value={block.content || ""}
            onChange={(e) => onUpdate({ ...block, content: e.target.value })}
          />
        </div>
      )}

      {/* Video block */}
      {block.type === "video" && (
        <div className="space-y-2">
          <input
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300"
            placeholder="YouTube URL"
            value={block.url || ""}
            onChange={(e) => onUpdate({ ...block, url: e.target.value })}
          />
          <input
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300"
            placeholder="Caption (optional)"
            value={block.caption || ""}
            onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
