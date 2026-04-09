import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BlockCard from "./BlockCard";
import BlockTypeMenu, { defaultBlock } from "./BlockTypeMenu";

export default function BlockBuilder({
  gallery,
  onChange,
  onSave,
  saving,
  onAddPhotosToBlock,
}) {
  const [showBlockMenu, setShowBlockMenu] = useState(false);

  const updateField = (key, value) => onChange({ ...gallery, [key]: value });

  const addBlock = (block) =>
    onChange({ ...gallery, blocks: [...(gallery.blocks || []), block] });

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
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300"
          placeholder="Gallery name"
          value={gallery.name || ""}
          onChange={(e) => updateField("name", e.target.value)}
        />
        <textarea
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300 resize-none"
          placeholder="Description"
          rows={2}
          value={gallery.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
        />
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-500 outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300"
          placeholder="Thumbnail URL"
          value={gallery.thumbnailUrl || ""}
          onChange={(e) => updateField("thumbnailUrl", e.target.value)}
        />
      </div>

      {/* Block list */}
      <div className="flex-1 overflow-y-auto p-3">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {(gallery.blocks || []).map((block, index) => (
                  <Draggable
                    key={`block-${index}`}
                    draggableId={`block-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
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
          {showBlockMenu && (
            <BlockTypeMenu
              onAdd={addBlock}
              onClose={() => setShowBlockMenu(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
