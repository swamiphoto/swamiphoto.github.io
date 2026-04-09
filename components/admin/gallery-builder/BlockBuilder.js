import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BlockCard from "./BlockCard";
import BlockTypeMenu, { defaultBlock } from "./BlockTypeMenu";

function InsertionZone({ onInsert }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative h-6 flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onInsert}
    >
      <div
        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 transition-colors duration-100 ${
          hovered ? "bg-blue-400" : "bg-transparent"
        }`}
      />
      <div
        className={`relative z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-100 ${
          hovered
            ? "border-blue-400 bg-white text-blue-500 shadow-sm"
            : "border-transparent bg-transparent text-transparent"
        }`}
      >
        <span className="text-xs font-bold leading-none">+</span>
      </div>
    </div>
  );
}

export default function BlockBuilder({
  gallery,
  onChange,
  onSave,
  saving,
  onAddPhotosToBlock,
  onPickThumbnail,
}) {
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [insertAtIndex, setInsertAtIndex] = useState(null);

  const updateField = (key, value) => onChange({ ...gallery, [key]: value });

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
    <div className="w-80 flex-shrink-0 border-r border-gray-200 flex flex-col h-full bg-gray-50">
      {/* Header */}
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

      {/* Gallery meta */}
      <div className="px-4 py-4 border-b border-gray-100 space-y-3 flex-shrink-0 bg-white">
        {/* Name */}
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300"
          placeholder="Gallery name"
          value={gallery.name || ""}
          onChange={(e) => updateField("name", e.target.value)}
        />

        {/* Slug */}
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-500 outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300 font-mono"
          placeholder="slug (auto-generated from name)"
          value={gallery.slug || ""}
          onChange={(e) => updateField("slug", e.target.value)}
        />

        {/* Description */}
        <textarea
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors resize-none placeholder:text-gray-300"
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
            className={`relative w-16 h-16 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition-colors flex items-center justify-center ${
              gallery.thumbnailUrl
                ? "border-transparent"
                : "border-gray-200 hover:border-gray-400 bg-gray-50"
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

      {/* Block list */}
      <div className="flex-1 overflow-y-auto p-3">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {(gallery.blocks || []).map((block, index) => (
                  <div key={`slot-${index}`}>
                    {/* Insertion zone before this block */}
                    <div className="relative">
                      {showBlockMenu && insertAtIndex === index && (
                        <BlockTypeMenu
                          onAdd={addBlock}
                          onClose={() => { setShowBlockMenu(false); setInsertAtIndex(null); }}
                        />
                      )}
                      <InsertionZone
                        onInsert={() => {
                          setInsertAtIndex(index);
                          setShowBlockMenu(true);
                        }}
                      />
                    </div>
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
          {showBlockMenu && insertAtIndex === null && (
            <BlockTypeMenu
              onAdd={addBlock}
              onClose={() => { setShowBlockMenu(false); setInsertAtIndex(null); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
