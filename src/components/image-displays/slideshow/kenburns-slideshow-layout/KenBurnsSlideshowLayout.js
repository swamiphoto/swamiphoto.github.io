import React from "react";
import PropTypes from "prop-types";
import "./KenBurnsSlideshowLayout.css";
import { getCloudimageUrl } from "../../../../common/images";

const KenBurnsSlideshowLayout = ({ imageUrls, currentImageIndex, transitioning, aspectRatios = [], captions, hideCaptionsOnMobile }) => {
  return (
    <div className="kenburns-container">
      {imageUrls.map((url, index) => {
        const aspectRatio = aspectRatios[index];

        const isVertical = aspectRatio < 1;
        const isHorizontal = aspectRatio >= 1;

        return (
          <div key={index} className={`kenburns-image ${isVertical ? "vertical" : ""} ${isHorizontal ? "horizontal" : ""} ${index === currentImageIndex ? (transitioning ? `kenburns-slide-out` : "kenburns-visible") : "kenburns-hidden"}`}>
            <img src={getCloudimageUrl(url, { width: 1600, quality: 80 })} alt={`Image ${index + 1}`} />

            {captions[index] && (
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
      })}
    </div>
  );
};

KenBurnsSlideshowLayout.propTypes = {
  imageUrls: PropTypes.array.isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  transitioning: PropTypes.bool.isRequired,
  aspectRatios: PropTypes.array.isRequired,
  captions: PropTypes.object.isRequired,
  hideCaptionsOnMobile: PropTypes.bool.isRequired,
};

export default KenBurnsSlideshowLayout;
