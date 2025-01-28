import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import styles from "./FilmStackSlideshowLayout.module.css";

const FilmStackSlideshowLayout = ({ slides, currentImageIndex, transitioning, aspectRatios, captions, hideCaptionsOnMobile }) => {
  const [tilts, setTilts] = useState([]);
  const [zTilts, setZTilts] = useState([]);
  const [moveXs, setMoveXs] = useState([]);
  const [moveYs, setMoveYs] = useState([]);
  const [durations, setDurations] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    // Filter slides to include only image slides
    const imageSlides = slides.filter((slide) => slide.type === "image");

    if (imageSlides.length > 0) {
      const newTilts = imageSlides.map(() => Math.random() * 12 - 6);
      const newZTilts = imageSlides.map(() => Math.random() * 20 - 10);
      const newMoveXs = imageSlides.map(() => `${Math.random() * 15 - 5}px`);
      const newMoveYs = imageSlides.map(() => `${Math.random() * 20 - 5}px`);
      const newDurations = imageSlides.map(() => `${Math.random() * 2 + 3}s`);

      setTilts(newTilts);
      setZTilts(newZTilts);
      setMoveXs(newMoveXs);
      setMoveYs(newMoveYs);
      setDurations(newDurations);
    }
  }, [slides]);

  return (
    <div className={`${styles["film-stack-container"]} mt-8 md:mt-0`}>
      {slides.map((slide, index) => {
        // Randomly choose left or right for each slide
        const slideDirection = Math.random() < 0.5 ? "left" : "right";

        const isCurrentSlide = index === currentImageIndex;
        const isTransitioningOut = isCurrentSlide && transitioning;

        const className = `${styles["film-stack-image"]} ${aspectRatios[index] > 1 ? styles["horizontal"] : styles["vertical"]} ${
          isCurrentSlide ? (isTransitioningOut ? styles[`slide-out-${slideDirection}`] : `${styles[`slide-out-${slideDirection}`]} ${styles["visible"]}`) : index > currentImageIndex ? styles["stacked"] : styles["hidden"]
        }`;

        // Handle `image` slides
        if (slide.type === "image") {
          return (
            <div
              key={index}
              className={className}
              style={{
                "--rotate": `${tilts[index]}deg`,
                "--rotateZ": `${zTilts[index]}deg`,
                "--moveX": moveXs[index],
                "--moveY": moveYs[index],
                "--duration": durations[index],
                zIndex: slides.length - index,
              }}>
              <img src={slide.url} alt={`Slide ${index + 1}`} />
              {(!isMobile || !hideCaptionsOnMobile) && captions[index] && (
                <div className="absolute top-10 left-4 w-3/5 p-5">
                  <div
                    className="text-left bg-yellow-200 font-mono shadow-lg transform rotate-1"
                    style={{
                      backgroundImage: "url('images/paper2.jpg')",
                      backgroundSize: "cover",
                      boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                      clipPath: "url(#torn-edge-clip)",
                      padding: "20px",
                    }}>
                    {captions[index]}
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

        // Handle `text` slides
        if (slide.type === "text") {
          return (
            <div key={index} className={`${styles["film-stack-text"]} ${isCurrentSlide ? styles["visible"] : styles["hidden"]}`}>
              <div className="text-center px-8">
                <p>{slide.content}</p>
              </div>
            </div>
          );
        }

        // Handle `video` slides
        if (slide.type === "video") {
          return (
            <div key={index} className={`${styles["film-stack-video"]} ${isCurrentSlide ? styles["visible"] : styles["hidden"]}`}>
              <iframe src={slide.url} title={`Video ${index + 1}`} frameBorder="0" allow="autoplay; fullscreen" className="w-full h-full" />
              {(!isMobile || !hideCaptionsOnMobile) && slide.caption && <div className="absolute bottom-10 left-4 w-3/5 p-5 bg-white shadow-lg">{slide.caption}</div>}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

FilmStackSlideshowLayout.propTypes = {
  slides: PropTypes.array.isRequired, // Combined slides with images, texts, and videos
  currentImageIndex: PropTypes.number.isRequired,
  transitioning: PropTypes.bool.isRequired,
  aspectRatios: PropTypes.array.isRequired,
  captions: PropTypes.object.isRequired,
  hideCaptionsOnMobile: PropTypes.bool.isRequired,
};

export default FilmStackSlideshowLayout;
