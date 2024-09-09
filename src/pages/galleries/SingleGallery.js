import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slideshow from "../../components/image-displays/slideshow/Slideshow";
import Gallery from "../../components/image-displays/gallery/Gallery";
import Loading from "../../components/image-displays/slideshow/Loading/Loading";
import { galleryData } from "./Galleries"; // Use galleryData from Galleries.js
import { fetchImageUrls } from "../../common/images";

const DEFAULT_LAYOUT = "masonry"; // Default layout for gallery
const DEFAULT_SLIDESHOW_LAYOUT = "kenburns"; // Default layout for slideshow
const DEFAULT_YOUTUBE_LINK = "https://www.youtube.com/watch?v=PYujyluMxMU";
const DEFAULT_SHOW_COVER = true; // Default to show the cover
const DEFAULT_ENABLE_SLIDESHOW = false; // Default slideshow is disabled

const SingleGallery = () => {
  const { gallerySlug, view } = useParams(); // view can be 'slideshow' or undefined for gallery
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Ensure the hook is always run and the gallery is selected
  const gallery = galleryData.find((g) => g.slug === gallerySlug);

  useEffect(() => {
    // Only fetch images if the view is "slideshow" and the gallery exists
    if (gallery && view === "slideshow") {
      const fetchImages = async () => {
        const urls = await fetchImageUrls(gallery.imagesFolderUrl);
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
  }, [gallery, view]);

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
    showCover = DEFAULT_SHOW_COVER, // Default to true
    enableSlideshow = DEFAULT_ENABLE_SLIDESHOW, // Default to false
  } = gallery;

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
      />
    );
  }

  // Render default gallery view
  return (
    <Gallery
      name={gallery.name}
      description={gallery.description}
      layout={layout} // Default to "masonry" if no layout is provided
      imagesFolderUrl={gallery.imagesFolderUrl}
      showCover={showCover} // Default to true if not provided
      enableSlideshow={true}
      slug={gallerySlug}
    />
  );
};

export default SingleGallery;
