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
  const [clientView, setClientView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const gallery = galleryData.find((g) => g.slug === gallerySlug);

  useEffect(() => {
    if (gallery) {
      const fetchImages = async () => {
        let urls = await fetchImageUrls(gallery.imagesFolderUrl);

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
  }, [gallery, clientView]);

  if (view === "slideshow" && !imagesLoaded && gallery) {
    return <Loading />;
  }

  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  const { layout: slideshowLayout = DEFAULT_SLIDESHOW_LAYOUT, youtubeLinks = [DEFAULT_YOUTUBE_LINK], customDurations = {}, captions = {}, coverImageIndex = 0, mobileCoverImageIndex = 0 } = gallery.slideshowSettings || {};

  const { layout = DEFAULT_LAYOUT, showCover = DEFAULT_SHOW_COVER, enableSlideshow = DEFAULT_ENABLE_SLIDESHOW, enableClientView = false, clientSettings = {} } = gallery;

  const finalLayout = isMobile ? "masonry" : layout;

  const handleClientLogin = () => {
    const decryptedPassword = clientSettings.clientLogin;
    if (password === decryptedPassword) {
      setClientView(true);
      setIsModalOpen(false);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleExitClientView = () => {
    setClientView(false);
  };

  if (view === "slideshow" && enableSlideshow) {
    const randomYouTubeLink = youtubeLinks[Math.floor(Math.random() * youtubeLinks.length)];

    return (
      <>
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
          handleClientLogin={handleClientLogin}
          handleExitClientView={handleExitClientView}
          setIsModalOpen={setIsModalOpen}
        />
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative w-3/4 sm:w-1/2 lg:w-1/3">
              <h2 className="text-center text-lg font-bold mb-4">Client Login</h2>
              <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-2 rounded mb-4" />
              <button onClick={handleClientLogin} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Submit
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Gallery
        name={gallery.name}
        description={gallery.description}
        layout={finalLayout}
        images={imageUrls}
        showCover={showCover}
        enableSlideshow={enableSlideshow}
        slug={gallerySlug}
        enableClientView={enableClientView}
        clientSettings={clientSettings}
        clientView={clientView}
        handleClientLogin={handleClientLogin}
        handleExitClientView={handleExitClientView}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-3/4 sm:w-1/2 lg:w-1/3">
            <h2 className="text-center text-lg font-bold mb-4">Client Login</h2>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-2 rounded mb-4" />
            <button onClick={handleClientLogin} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleGallery;
