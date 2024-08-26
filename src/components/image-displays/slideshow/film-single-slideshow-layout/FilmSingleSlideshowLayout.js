import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import "./FilmSingleSlideshowLayout.css";

const FilmSingleSlideshowLayout = ({ imageUrls, currentImageIndex, transitioning, captions, hideCaptionsOnMobile }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="film-single-container">
      {imageUrls.map((url, index) => (
        <div key={index} className={`film-single-image ${index === currentImageIndex ? (transitioning ? `slide-out-left` : "visible") : "hidden"}`}>
          <img src={url} alt={`Image ${index + 1}`} />
          {(!isMobile || !hideCaptionsOnMobile) && captions[index] && (
            <div className="absolute top-10 left-4 w-3/5 p-5">
              <div
                className="text-left bg-yellow-200 font-geist-mono shadow-lg transform rotate-1"
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
      ))}
    </div>
  );
};

FilmSingleSlideshowLayout.propTypes = {
  imageUrls: PropTypes.array.isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  transitioning: PropTypes.bool.isRequired,
  captions: PropTypes.object.isRequired,
  hideCaptionsOnMobile: PropTypes.bool.isRequired,
};

export default FilmSingleSlideshowLayout;
