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
