import React, { useState, useEffect } from "react";

function Photo({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState("");
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction ? "https://swamiphoto-github-io.vercel.app/api/resize-image" : `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/resize-image`;

  useEffect(() => {
    const fetchResizedImage = async () => {
      try {
        // Assuming your serverless function expects a POST request with an image URL
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: src }), // Sending the original image URL
        });

        if (response.ok) {
          const result = await response.blob(); // Get the image as a blob
          const processedUrl = URL.createObjectURL(result); // Convert blob to local URL
          setProcessedImageUrl(processedUrl);
        } else {
          console.error("Error fetching processed image:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchResizedImage();
  }, [src]);

  return (
    <div className={`flex justify-center items-center  ${!isLoaded ? "animate-pulse" : ""}`}>
      {processedImageUrl && <img src={processedImageUrl} alt={alt} loading="lazy" className={`transition-opacity duration-500 ease-in-out max-w-full h-auto border border-gray-300 shadow-md mb-4 md:mb-10 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />}
    </div>
  );
}

export default Photo;
