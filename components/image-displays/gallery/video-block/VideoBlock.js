import React from "react";
import ReactPlayer from "react-player";

const VideoBlock = ({ url, caption, variant = 1 }) => {
  const videoContainerStyle = (() => {
    if (variant === 1) return "fixed left-0 w-screen overflow-hidden"; // Full-width, edge-to-edge for variant 1
    if (variant === 2) return "w-[85%] mx-auto"; // Centered for variant 2
    if (variant === 3) return "w-[90%] max-w-5xl mx-auto flex flex-col md:flex-row gap-6"; // Left video, right caption
    return "w-full"; // Default fallback
  })();

  const videoStyle = "relative pb-[56.25%] overflow-hidden shadow-lg"; // Shared video styles
  const videoWrapperStyle = variant === 1 ? "rounded-none shadow-none" : "rounded-3xl shadow-lg";

  return (
    <div className={`${videoContainerStyle} ${variant === 1 ? "ml-0" : ""}`}>
      {variant === 3 ? (
        // Variant 3: Video on the left, caption on the right
        <>
          <div className={`w-full md:w-2/3 ${videoStyle}`}>
            <ReactPlayer
              url={url}
              className="absolute top-0 left-0 w-full h-full"
              width="100%"
              height="100%"
              controls
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1, // Removes YouTube logo in the control bar
                    rel: 0, // Prevents showing related videos at the end
                    showinfo: 0, // Hides video title and uploader info
                    fs: 1, // Allows fullscreen
                    iv_load_policy: 3, // Hides annotations
                    disablekb: 1, // Disables the keyboard controls
                  },
                },
              }}
            />
          </div>
          <div className="w-full md:w-1/3 flex items-center">{caption && <p className="my-4 font-medium text-sm md:text-xl italic text-left max-w-lg mx-auto md:mx-0">{caption}</p>}</div>
        </>
      ) : (
        // Variant 1 and 2: Common layout
        <>
          <div className={`${videoStyle} ${videoWrapperStyle}`}>
            <ReactPlayer
              url={url}
              className="absolute top-0 left-0 w-full h-full"
              width="100%"
              height="100%"
              controls
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    fs: 1,
                    iv_load_policy: 3,
                    disablekb: 1,
                  },
                },
              }}
            />
          </div>
          {caption && <p className="my-4 font-medium text-sm md:text-xl italic text-center max-w-6xl mx-auto">{caption}</p>}
        </>
      )}
    </div>
  );
};

export default VideoBlock;
