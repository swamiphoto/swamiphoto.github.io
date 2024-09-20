import React from "react";
import PropTypes from "prop-types";
import styles from "./KenBurnsSlideshowLayout.module.css";
import Text from "../../../text/Text";

const KenBurnsSlideshowLayout = ({ imageUrls, texts, currentImageIndex, transitioning, aspectRatios = [], captions, hideCaptionsOnMobile }) => {
  // Combine image and text slides in a single array, ensuring the text slide comes after the image
  const slides = [];
  imageUrls.forEach((imageUrl, index) => {
    slides.push({ type: "image", index });
    if (texts.hasOwnProperty(index + 1)) {
      slides.push({ type: "text", index: index + 1 });
    }
  });

  return (
    <div className={styles["kenburns-container"]}>
      {slides.map((slide, index) => {
        if (slide.type === "text") {
          return (
            <div key={`text-${slide.index}`} className={`${styles["kenburns-text"]} ${index === currentImageIndex ? (transitioning ? styles["kenburns-slide-out"] : styles["kenburns-visible"]) : styles["kenburns-hidden"]}`}>
              <div className="flex justify-center items-center h-full bg-white">
                <div className={`max-w-3xl px-4 ${styles["kenburns-zoom-text"]}`}>
                  <Text layout="layout2">{texts[slide.index]}</Text>
                </div>
              </div>
            </div>
          );
        } else {
          const actualImageIndex = slide.index;
          const aspectRatio = aspectRatios[actualImageIndex];
          const isVertical = aspectRatio < 1;
          const isHorizontal = aspectRatio >= 1;

          return (
            <div
              key={`image-${actualImageIndex}`}
              className={`${styles["kenburns-image"]} ${isVertical ? styles["vertical"] : ""} ${isHorizontal ? styles["horizontal"] : ""} ${index === currentImageIndex ? (transitioning ? styles["kenburns-slide-out"] : styles["kenburns-visible"]) : styles["kenburns-hidden"]}`}>
              <img src={imageUrls[actualImageIndex]} alt={`Image ${actualImageIndex + 1}`} />
              {captions[actualImageIndex] && (
                <div className="absolute bottom-10 left-4 w-3/5 p-5">
                  <div
                    className="text-left bg-yellow-200 font-mono shadow-lg transform"
                    style={{
                      backgroundImage: "url('images/paper2.jpg')",
                      backgroundSize: "cover",
                      boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                      clipPath: "url(#torn-edge-clip)",
                      padding: "20px",
                    }}>
                    {captions[actualImageIndex]}
                  </div>
                  <svg width="0" height="0">
                    <clipPath id="torn-edge-clip" clipPathUnits="objectBoundingBox">
                      <path d="M0,0 h1 v0.7 l-0.1,0.05 l0.05,0.05 l-0.05,0.05 l0.1,0.05 v0.7 h-1 z" />
                    </clipPath>
                  </svg>
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

KenBurnsSlideshowLayout.propTypes = {
  imageUrls: PropTypes.array.isRequired,
  texts: PropTypes.object.isRequired, // Text slides
  currentImageIndex: PropTypes.number.isRequired,
  transitioning: PropTypes.bool.isRequired,
  aspectRatios: PropTypes.array.isRequired,
  captions: PropTypes.object.isRequired,
  hideCaptionsOnMobile: PropTypes.bool.isRequired,
};

export default KenBurnsSlideshowLayout;
