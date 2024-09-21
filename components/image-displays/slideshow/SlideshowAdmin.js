import React, { useState, useEffect, useRef } from "react";

const SlideshowAdmin = ({ gallery }) => {
  const [slides, setSlides] = useState([]);
  const textAreaRefs = useRef([]); // Refs for the text areas to focus and scroll

  useEffect(() => {
    const combinedSlides = [];

    if (gallery?.imageUrls) {
      let currentImageGroup = [];

      gallery.imageUrls.forEach((url, index) => {
        currentImageGroup.push(url);

        if (gallery.texts && gallery.texts[index + 1]) {
          combinedSlides.push({ type: "images", urls: currentImageGroup });
          combinedSlides.push({ type: "text", content: gallery.texts[index + 1] });
          currentImageGroup = [];
        }
      });

      if (currentImageGroup.length > 0) {
        combinedSlides.push({ type: "images", urls: currentImageGroup });
      }
    }

    setSlides(combinedSlides);
  }, [gallery]);

  const handleImageUrlsChange = (index, event) => {
    const updatedSlides = [...slides];
    const updatedUrls = event.target.value
      .trim()
      .split("\n")
      .filter((url) => url.trim() !== ""); // Remove empty lines

    updatedSlides[index].urls = updatedUrls;
    setSlides(updatedSlides);
  };

  const handleTextChange = (index, event) => {
    const updatedSlides = [...slides];
    updatedSlides[index].content = event.target.value;
    setSlides(updatedSlides);
  };

  const handleRegenerateJson = () => {
    const updatedGallery = {
      ...gallery,
      imageUrls: slides.filter((slide) => slide.type === "images").flatMap((slide) => slide.urls),
      texts: {},
    };

    slides.forEach((slide, index) => {
      if (slide.type === "text") {
        updatedGallery.texts[index + 1] = slide.content;
      }
    });

    console.log("Updated Gallery JSON:", JSON.stringify(updatedGallery, null, 2));
    alert("Gallery JSON updated! Check console for the output.");
  };

  const handleImageClick = (slideIndex, imageIndex) => {
    if (textAreaRefs.current[slideIndex]) {
      textAreaRefs.current[slideIndex].focus();

      // Highlight the individual URL within the textarea
      const urls = slides[slideIndex].urls.join("\n\n"); // With extra line breaks
      const urlToHighlight = slides[slideIndex].urls[imageIndex];
      const startIndex = urls.indexOf(urlToHighlight);

      if (startIndex !== -1) {
        textAreaRefs.current[slideIndex].setSelectionRange(startIndex, startIndex + urlToHighlight.length);
      }
    }
  };

  const handleTextClick = (index) => {
    if (textAreaRefs.current[index]) {
      textAreaRefs.current[index].focus();
      textAreaRefs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Pane (Main Pane to show images and text in the gallery) */}
      <div className="w-3/4 h-full p-5 overflow-auto">
        {slides.map((slide, index) => {
          if (slide.type === "images") {
            return (
              <div key={index}>
                {slide.urls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Slide ${i + 1}`}
                    className="mb-4 w-full h-auto cursor-pointer"
                    onClick={() => handleImageClick(index, i)} // Handle click on image
                  />
                ))}
              </div>
            );
          } else if (slide.type === "text") {
            return (
              <div key={index} className="p-5 bg-gray-200 mb-4 cursor-pointer" onClick={() => handleTextClick(index)}>
                <p>{slide.content}</p>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Right Pane (Admin Pane for editing URLs and text) */}
      <div className="w-1/4 h-full p-5 overflow-auto bg-gray-100">
        {slides.map((slide, index) => (
          <div key={index} className="mb-6">
            {slide.type === "images" ? (
              <textarea
                ref={(el) => (textAreaRefs.current[index] = el)} // Ref for scrolling and focus
                rows={slide.urls.length * 2} // Adjust rows for extra line breaks
                value={slide.urls.join("\n\n")} // Extra line break between URLs
                onChange={(event) => handleImageUrlsChange(index, event)}
                className="w-full p-2 border border-gray-300"
                placeholder="Enter image URLs (one per line)"
              />
            ) : (
              <textarea
                ref={(el) => (textAreaRefs.current[index] = el)} // Ref for scrolling and focus
                rows={3}
                value={slide.content}
                onChange={(event) => handleTextChange(index, event)}
                className="w-full p-2 border border-gray-300"
                placeholder="Enter text content"
              />
            )}
          </div>
        ))}

        <button onClick={handleRegenerateJson} className="w-full py-2 mt-4 bg-blue-500 text-white font-bold uppercase hover:bg-blue-700">
          Regenerate JSON
        </button>
      </div>
    </div>
  );
};

export default SlideshowAdmin;
