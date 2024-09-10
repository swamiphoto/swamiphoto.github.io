import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive"; // Import for detecting mobile
import Slideshow from "../../components/image-displays/slideshow/Slideshow";
import Gallery from "../../components/image-displays/gallery/Gallery";
import Loading from "../../components/image-displays/slideshow/Loading/Loading";
import { galleryData } from "./Galleries"; // Use galleryData from Galleries.js
import { fetchImageUrls } from "../../common/images";

const DEFAULT_LAYOUT = "masonry"; // Default layout for gallery
const DEFAULT_SLIDESHOW_LAYOUT = "kenburns"; // Default layout for slideshow
const DEFAULT_YOUTUBE_LINK = "https://www.youtube.com/watch?v=PYujyluMxMU";
const DEFAULT_SHOW_COVER = false; // Default to not show the cover
const DEFAULT_ENABLE_SLIDESHOW = false; // Default slideshow is disabled

const SingleGallery = () => {
  const { gallerySlug, view } = useParams(); // view can be 'slideshow' or undefined for gallery
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [clientView, setClientView] = useState(false); // Manage client view state

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Detect if on mobile

  // Ensure the hook is always run and the gallery is selected
  const gallery = galleryData.find((g) => g.slug === gallerySlug);

  useEffect(() => {
    if (gallery && view === "slideshow") {
      const fetchImages = async () => {
        let urls = await fetchImageUrls(gallery.imagesFolderUrl);

        // Filter out "protected" images if clientView is false
        if (!clientView) {
          urls = urls.filter((url) => !url.includes("protected"));
        }

        setImageUrls(urls);

        const imageLoadPromises = urls.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = url;
          });
        });

        await Promise.all(imageLoadPromises);
        setImagesLoaded(true);
      };

      fetchImages();
    }
  }, [gallery, view, clientView]);

  // Handle loading state only for slideshow view
  if (view === "slideshow" && !imagesLoaded && gallery) {
    return <Loading />;
  }

  // Handle case where gallery is not found
  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  // Destructure optional slideshow settings with defaults
  const {
    layout: slideshowLayout = DEFAULT_SLIDESHOW_LAYOUT,
    youtubeLinks = [DEFAULT_YOUTUBE_LINK], // Default YouTube link if none provided
    customDurations = {},
    captions = {},
    coverImageIndex = 0,
    mobileCoverImageIndex = 0,
  } = gallery.slideshowSettings || {}; // Use empty object if slideshowSettings is undefined

  // Destructure gallery-level settings with defaults
  const {
    layout = DEFAULT_LAYOUT, // Default to "masonry"
    showCover = DEFAULT_SHOW_COVER, // Default to false
    enableSlideshow = DEFAULT_ENABLE_SLIDESHOW, // Default to false
    enableClientView = false, // Add this to check if client view is enabled
    clientSettings = {}, // Contains clientLogin and clientMessage
  } = gallery;

  // Override layout to "masonry" if on mobile
  const finalLayout = isMobile ? "masonry" : layout;

  // Render slideshow if 'view' is 'slideshow' and the slideshow is enabled
  if (view === "slideshow" && enableSlideshow) {
    const randomYouTubeLink = youtubeLinks[Math.floor(Math.random() * youtubeLinks.length)];

    return (
      <Slideshow
        imageUrls={imageUrls}
        layout={slideshowLayout} // Default to 'kenburns' if no layout is provided
        title={gallery.slideshowSettings?.title || gallery.name} // Optional title
        subtitle={gallery.slideshowSettings?.subtitle || gallery.description} // Optional subtitle
        youtubeUrl={randomYouTubeLink}
        customDurations={customDurations}
        captions={captions}
        coverImageIndex={coverImageIndex}
        mobileCoverImageIndex={mobileCoverImageIndex}
        slug={gallerySlug}
        enableClientView={enableClientView} // Pass client view logic
        clientSettings={clientSettings} // Pass client settings for login
        clientView={clientView} // Pass client view state to filter protected images
        setClientView={setClientView} // Function to toggle client view
      />
    );
  }

  // Render default gallery view
  return (
    <Gallery
      name={gallery.name}
      description={gallery.description}
      layout={finalLayout} // Use "masonry" if on mobile, else use the provided layout
      imagesFolderUrl={gallery.imagesFolderUrl}
      showCover={showCover} // Default to true if not provided
      enableSlideshow={enableSlideshow}
      slug={gallerySlug}
      enableClientView={enableClientView} // Pass client view logic
      clientSettings={clientSettings} // Pass client settings for login
      clientView={clientView} // Pass client view state to filter protected images
      setClientView={setClientView} // Function to toggle client view
    />
  );
};

export default SingleGallery;
