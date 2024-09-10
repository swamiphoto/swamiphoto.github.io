import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Slideshow from "../../components/image-displays/slideshow/Slideshow";
import Gallery from "../../components/image-displays/gallery/Gallery";
import Loading from "../../components/image-displays/slideshow/Loading/Loading";
import { galleryData } from "./Galleries";
import { fetchImageUrls } from "../../common/images";

const DEFAULT_LAYOUT = "masonry";
const DEFAULT_SLIDESHOW_LAYOUT = "kenburns";
const DEFAULT_YOUTUBE_LINK = "https://www.youtube.com/watch?v=PYujyluMxMU";
const DEFAULT_SHOW_COVER = false;
const DEFAULT_ENABLE_SLIDESHOW = false;

const SingleGallery = () => {
  const { gallerySlug, view } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [clientView, setClientView] = useState(false); // Manage client view state in the parent

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const observer = useRef(null);

  const gallery = galleryData.find((g) => g.slug === gallerySlug);

  useEffect(() => {
    if (gallery) {
      const fetchImages = async () => {
        let urls = await fetchImageUrls(gallery.imagesFolderUrl);

        // Filter out protected images based on clientView state
        if (!clientView) {
          urls = urls.filter((url) => !url.includes("protected"));
        }

        setImageUrls(urls);
        setImagesLoaded(true);
      };

      fetchImages();
    }
  }, [gallery, clientView]); // Refetch images when clientView changes

  // IntersectionObserver for lazy loading
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add("loaded");
          observer.current.unobserve(img);
        }
      });
    });

    return () => observer.current.disconnect();
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      const imgs = document.querySelectorAll("img.lazy-load");
      imgs.forEach((img) => observer.current.observe(img));
    }
  }, [imagesLoaded]);

  // Handle loading state
  if (!imagesLoaded && gallery) {
    return <Loading />;
  }

  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  const { layout: slideshowLayout = DEFAULT_SLIDESHOW_LAYOUT, youtubeLinks = [DEFAULT_YOUTUBE_LINK], customDurations = {}, captions = {}, coverImageIndex = 0, mobileCoverImageIndex = 0 } = gallery.slideshowSettings || {};

  const { layout = DEFAULT_LAYOUT, showCover = DEFAULT_SHOW_COVER, enableSlideshow = DEFAULT_ENABLE_SLIDESHOW, enableClientView = false, clientSettings = {} } = gallery;

  const finalLayout = isMobile ? "masonry" : layout;

  if (view === "slideshow" && enableSlideshow) {
    const randomYouTubeLink = youtubeLinks[Math.floor(Math.random() * youtubeLinks.length)];

    return (
      <Slideshow
        imageUrls={imageUrls}
        layout={slideshowLayout}
        title={gallery.slideshowSettings?.title || gallery.name}
        subtitle={gallery.slideshowSettings?.subtitle || gallery.description}
        youtubeUrl={randomYouTubeLink}
        customDurations={customDurations}
        captions={captions}
        coverImageIndex={coverImageIndex}
        mobileCoverImageIndex={mobileCoverImageIndex}
        slug={gallerySlug}
        enableClientView={enableClientView}
        clientSettings={clientSettings}
        clientView={clientView}
        setClientView={setClientView} // Pass setClientView to the child
      />
    );
  }

  return (
    <Gallery
      name={gallery.name}
      description={gallery.description}
      layout={finalLayout}
      imageUrls={imageUrls}
      showCover={showCover}
      enableSlideshow={enableSlideshow}
      slug={gallerySlug}
      enableClientView={enableClientView}
      clientSettings={clientSettings}
      clientView={clientView}
      setClientView={setClientView} // Pass setClientView to the child
    />
  );
};

export default SingleGallery;
