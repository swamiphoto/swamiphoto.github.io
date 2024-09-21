import React, { useEffect, useState, useRef } from "react";
import Text from "../../text/Text"; // Correct Text import
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SlideshowAdmin = ({ gallery }) => {
  const [slides, setSlides] = useState([]);
  const [inputs, setInputs] = useState([]); // Stores both image URLs and text inputs in order
  const imageRefs = useRef([]); // Ref array for image elements
  const [popup, setPopup] = useState({ open: false, index: null }); // Popup state for URL input
  const [newUrl, setNewUrl] = useState(""); // Temporary URL state for adding new images

  useEffect(() => {
    if (gallery) {
      const combinedSlides = [];
      const tempInputs = [];

      let currentImageBatch = [];
      gallery.imageUrls.forEach((url, index) => {
        currentImageBatch.push(url);

        if (gallery.texts[index + 1]) {
          combinedSlides.push({ type: "images", urls: [...currentImageBatch] });
          tempInputs.push({ type: "images", urls: [...currentImageBatch] });
          currentImageBatch = [];

          combinedSlides.push({ type: "text", content: gallery.texts[index + 1] });
          tempInputs.push({ type: "text", content: gallery.texts[index + 1] });
        }
      });

      if (currentImageBatch.length > 0) {
        combinedSlides.push({ type: "images", urls: [...currentImageBatch] });
        tempInputs.push({ type: "images", urls: [...currentImageBatch] });
      }

      setSlides(combinedSlides);
      setInputs(tempInputs);
    }
  }, [gallery]);

  // Sync refs with slides length
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, slides.length); // Trim refs array to match slides length
  }, [slides]);

  // Handle deleting an image by index
  const handleDeleteImage = (sectionIndex, imageIndex) => {
    const updatedInputs = [...inputs];
    updatedInputs[sectionIndex].urls.splice(imageIndex, 1); // Remove the image URL
    setInputs(updatedInputs);

    // Update slides as well
    const updatedSlides = [...slides];
    updatedSlides[sectionIndex].urls.splice(imageIndex, 1);
    setSlides(updatedSlides);
  };

  // Handle opening a popup for adding new images
  const handleOpenPopup = (sectionIndex) => {
    setPopup({ open: true, index: sectionIndex });
    setNewUrl(""); // Reset new URL state
  };

  // Handle saving a new image URL
  const handleSaveImage = () => {
    if (newUrl.trim()) {
      const updatedInputs = [...inputs];
      updatedInputs[popup.index].urls.push(newUrl); // Add the new image URL
      setInputs(updatedInputs);

      // Update slides as well
      const updatedSlides = [...slides];
      updatedSlides[popup.index].urls.push(newUrl);
      setSlides(updatedSlides);

      setPopup({ open: false, index: null }); // Close popup
      setNewUrl(""); // Clear URL input
    }
  };

  // Handle drag end
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Clone current inputs and slides
    const updatedInputs = [...inputs];
    const updatedSlides = [...slides];

    // Moving within the same section
    if (source.droppableId === destination.droppableId) {
      const sectionIndex = parseInt(source.droppableId, 10);
      const [movedImage] = updatedInputs[sectionIndex].urls.splice(source.index, 1);
      updatedInputs[sectionIndex].urls.splice(destination.index, 0, movedImage);

      // Update slides as well
      updatedSlides[sectionIndex].urls = [...updatedInputs[sectionIndex].urls];
    } else {
      // Moving across sections
      const sourceSectionIndex = parseInt(source.droppableId, 10);
      const destinationSectionIndex = parseInt(destination.droppableId, 10);
      const [movedImage] = updatedInputs[sourceSectionIndex].urls.splice(source.index, 1);
      updatedInputs[destinationSectionIndex].urls.splice(destination.index, 0, movedImage);

      // Update slides as well
      updatedSlides[sourceSectionIndex].urls = [...updatedInputs[sourceSectionIndex].urls];
      updatedSlides[destinationSectionIndex].urls = [...updatedInputs[destinationSectionIndex].urls];
    }

    // Update state
    setInputs(updatedInputs);
    setSlides(updatedSlides);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Pane: Display Images and Texts */}
      <div className="w-3/4 p-4 overflow-auto border-r">
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} className="mb-4" ref={(el) => (imageRefs.current[slideIndex] = el)}>
            {slide.type === "images" ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
                {slide.urls.map((url, urlIndex) => (
                  <img
                    key={urlIndex}
                    src={url}
                    alt={`Slide ${slideIndex + 1}`}
                    className="h-36 w-auto object-contain mx-auto" // Consistent height, preserve aspect ratio
                  />
                ))}
              </div>
            ) : (
              <div className="max-w-3xl px-4">
                <Text layout="layout2">{slide.content}</Text>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Pane: Editable Inputs */}
      <div className="w-1/4 p-4 overflow-auto">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {inputs.map((input, index) => (
            <div key={`input-${index}`} className="mb-4 p-3 bg-gray-100 shadow rounded-lg">
              {input.type === "images" ? (
                <Droppable droppableId={`${index}`} direction="horizontal">
                  {(provided) => (
                    <div className="flex flex-wrap gap-2" {...provided.droppableProps} ref={provided.innerRef}>
                      {input.urls.map((url, urlIndex) => (
                        <Draggable key={urlIndex} draggableId={`${index}-${urlIndex}`} index={urlIndex}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="relative group">
                              {/* Image Thumbnail */}
                              <img src={url} alt="Thumbnail" className="h-20 w-auto object-cover" />
                              {/* Delete Icon on Hover */}
                              <button className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteImage(index, urlIndex)}>
                                X
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {/* Insert Placeholder Button */}
                      <button className="flex items-center justify-center w-full h-10 bg-gray-200 text-gray-600 hover:bg-gray-300" onClick={() => handleOpenPopup(index)}>
                        + Add Image
                      </button>
                    </div>
                  )}
                </Droppable>
              ) : (
                <textarea id={`input-text-${index}`} value={input.content} onChange={(e) => handleInputChange(e, index, "text")} rows={2} className="w-full p-2 border border-gray-300 rounded-lg" />
              )}
            </div>
          ))}
        </DragDropContext>

        {/* Popup for Adding New Image */}
        {popup.open && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
              <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Enter image URL" className="w-full mb-4 p-2 border border-gray-300 rounded-lg" />
              <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={handleSaveImage}>
                Save
              </button>
            </div>
          </div>
        )}

        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          onClick={() =>
            alert(
              JSON.stringify({
                imageUrls: inputs.flatMap((input) => (input.type === "images" ? input.urls : [])),
                texts: inputs.filter((input) => input.type === "text").map((input, i) => ({ [i + 1]: input.content })),
              })
            )
          }>
          Regenerate JSON
        </button>
      </div>
    </div>
  );
};

export default SlideshowAdmin;
