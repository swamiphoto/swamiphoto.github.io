import React, { useEffect, useState, useRef } from "react";
import Text from "../../text/Text"; // Correct Text import

const SlideshowAdmin = ({ gallery }) => {
  const [slides, setSlides] = useState([]);
  const [inputs, setInputs] = useState([]); // Stores both image URLs and text inputs in order
  const imageRefs = useRef([]); // Ref array for image elements

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

  const handleInputChange = (e, index, type) => {
    const value = e.target.value;

    if (type === "images") {
      const newInputs = [...inputs];
      const urls = value.split("\n").filter((url) => url.trim() !== ""); // Split by line break
      newInputs[index].urls = urls; // Set this to the array of URLs
      setInputs(newInputs);

      // Update slides
      const newSlides = [...slides];
      newSlides[index] = { type: "images", urls };
      setSlides(newSlides);
    } else if (type === "text") {
      const newInputs = [...inputs];
      newInputs[index].content = value;
      setInputs(newInputs);

      const newSlides = [...slides];
      newSlides[index] = { type: "text", content: value };
      setSlides(newSlides);
    }
  };

  const handleElementClick = (index, type, urlIndex) => {
    const inputElem = type === "images" ? document.getElementById(`input-images-${index}`) : document.getElementById(`input-text-${index}`);
    if (inputElem) {
      inputElem.focus();
      inputElem.scrollIntoView({ behavior: "smooth", block: "center" });

      // Highlight individual URL if it's an image click
      if (type === "images" && urlIndex !== undefined) {
        const urls = inputElem.value.split("\n");
        const urlStart = urls.slice(0, urlIndex).join("\n").length;
        const urlEnd = urlStart + urls[urlIndex].length;

        inputElem.setSelectionRange(urlStart + 1, urlEnd + 1); // Highlight the URL
      }
    }
  };

  const handleScrollToLeftPane = (index, type) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Pane: Display Images and Texts */}
      <div className="w-3/4 p-4 overflow-auto border-r">
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} className="mb-4" onClick={() => handleElementClick(slideIndex, slide.type)} ref={(el) => (imageRefs.current[slideIndex] = el)}>
            {slide.type === "images" ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
                {slide.urls.map((url, urlIndex) => (
                  <img
                    key={urlIndex}
                    src={url}
                    alt={`Slide ${slideIndex + 1}`}
                    className="h-36 w-auto object-contain mx-auto" // Consistent height, preserve aspect ratio
                    onClick={() => handleElementClick(slideIndex, slide.type, urlIndex)}
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
        {inputs.map((input, index) => (
          <div key={`input-${index}`} className="mb-4">
            {input.type === "images" ? (
              <textarea
                id={`input-images-${index}`}
                value={input.urls.join("\n\n")} // Join URLs with extra line breaks
                onChange={(e) => handleInputChange(e, index, "images")}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg"
                onClick={() => handleScrollToLeftPane(index, "images")}
              />
            ) : (
              <textarea id={`input-text-${index}`} value={input.content} onChange={(e) => handleInputChange(e, index, "text")} rows={2} className="w-full p-2 border border-gray-300 rounded-lg" onClick={() => handleScrollToLeftPane(index, "text")} />
            )}
          </div>
        ))}
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
