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
