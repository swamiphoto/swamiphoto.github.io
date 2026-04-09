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
