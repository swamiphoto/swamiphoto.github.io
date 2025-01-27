import React from "react";
import ReactPlayer from "react-player";

const VideoBlock = ({ url, caption, variant = 1 }) => {
  const videoContainerStyle = (() => {
    if (variant === 1) return "w-full"; // Full-width for variant 1
    if (variant === 2) return "w-[80%] mx-auto"; // Slightly wider and centered for variant 2
    if (variant === 3) return "w-[90%] max-w-5xl mx-auto flex flex-col md:flex-row gap-6"; // Padded and centered for variant 3
    return "w-full"; // Default fallback
  })();

  const videoStyle = (() => {
    if (variant === 3) return "relative pb-[56.25%] overflow-hidden rounded-3xl shadow-lg md:pb-[42%]"; // Adjusted aspect ratio for variant 3
    return "relative pb-[56.25%] overflow-hidden rounded-3xl shadow-lg"; // Default aspect ratio for other variants
  })();

  return (
    <div className={videoContainerStyle}>
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
          <div className={videoStyle}>
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
          {caption && <p className="my-4 font-medium text-sm md:text-xl italic text-center max-w-6xl mx-auto">{caption}</p>}
        </>
      )}
    </div>
  );
};

export default VideoBlock;
