import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { HiOutlineX } from "react-icons/hi"; // Close icon
import Slideshow from "../../components/image-displays/slideshow/Slideshow";
import Gallery from "../../components/image-displays/gallery/Gallery";
import Loading from "../../components/image-displays/slideshow/Loading/Loading";
import { galleryData } from "./Galleries";
import { fetchImageUrls } from "../../common/images";
import { Helmet } from "react-helmet-async";

const DEFAULT_LAYOUT = "masonry";
const DEFAULT_SLIDESHOW_LAYOUT = "kenburns";
const DEFAULT_YOUTUBE_LINK = "https://www.youtube.com/watch?v=PYujyluMxMU";
const DEFAULT_SHOW_COVER = false;
const DEFAULT_ENABLE_SLIDESHOW = false;
const DEFAULT_SLIDESHOW_DURATION = 10000;

const SingleGallery = () => {
  const { gallerySlug, view } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [clientView, setClientView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [metaHtml, setMetaHtml] = useState("");

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

  useEffect(() => {
    const fetchMetaData = async () => {
      const res = await fetch(`/api/meta-tags?slug=${gallerySlug}`); // Call your serverless function
      const metaHtml = await res.text();
      setMetaHtml(metaHtml); // Store the dynamic meta tags
    };

    if (gallerySlug) {
      fetchMetaData();
    }
  }, [gallerySlug]);

  if (view === "slideshow" && !imagesLoaded && gallery) {
    return <Loading />;
  }

  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  const { layout: slideshowLayout = DEFAULT_SLIDESHOW_LAYOUT, youtubeLinks = [DEFAULT_YOUTUBE_LINK], customDurations = {}, duration = DEFAULT_SLIDESHOW_DURATION, captions = {}, coverImageIndex = 0, mobileCoverImageIndex = 0 } = gallery.slideshowSettings || {};

  const { layout = DEFAULT_LAYOUT, showCover = DEFAULT_SHOW_COVER, enableSlideshow = DEFAULT_ENABLE_SLIDESHOW, enableClientView = false, clientSettings = {} } = gallery;

  const finalLayout = isMobile ? "masonry" : layout;

  const handleClientLogin = () => {
    const decryptedPassword = clientSettings.clientLogin;
    if (password === decryptedPassword) {
      setClientView(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleExitClientView = () => {
    setClientView(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderModalContent = () => {
    if (clientView) {
      return (
        <>
          <h1 className="text-center mx-auto md:max-w-xl text-4xl text-gray-800 font-bold tracking-tighter mb-2">Welcome to the Client Area</h1>

          <p className="text-center mx-auto md:max-w-xl text-xl text-gray-800 mb-6">{clientSettings.clientMessage}</p>
          <button onClick={closeModal} className="w-full max-w-sm  bg-black text-white p-5 text-xl font-medium inline-flex items-center justify-center cursor-pointer outline-none focus:outline-none hover:opacity-80">
            View Images
          </button>
        </>
      );
    }

    return (
      <>
        <h1 className="text-center mx-auto md:max-w-xl text-4xl text-gray-800 font-bold tracking-tighter mb-2">Client Login</h1>
        <p className="text-center mx-auto md:max-w-xl text-xl text-gray-800 mb-6">If you need the password for this gallery (and you're the client), feel free to reach out. This will grant you access to all the images.</p>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full max-w-sm border border-gray-300 p-2 mb-4 outline-none focus:outline-none" />
        <button onClick={handleClientLogin} className="w-full max-w-sm bg-black text-white p-2 font-medium inline-flex items-center justify-center cursor-pointer outline-none focus:outline-none hover:opacity-80">
          Enter Client Area
        </button>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>{gallery.name}</title>
        <meta name="description" content={gallery.description} />
      </Helmet>

      {/* Inject dynamic meta tags */}
      <div dangerouslySetInnerHTML={{ __html: metaHtml }} />

      {view === "slideshow" && enableSlideshow ? (
        <Slideshow
          imageUrls={imageUrls}
          layout={slideshowLayout}
          title={gallery.slideshowSettings?.title || gallery.name}
          subtitle={gallery.slideshowSettings?.subtitle || gallery.description}
          youtubeUrl={youtubeLinks[Math.floor(Math.random() * youtubeLinks.length)]}
          customDurations={customDurations}
          duration={duration}
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
      ) : (
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
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex justify-center items-center z-50">
          <div className="w-full h-full p-8 relative">
            <button className="absolute top-4 right-4 text-3xl opacity-70 hover:opacity-100" onClick={closeModal}>
              <HiOutlineX />
            </button>
            <div className="flex flex-col justify-center items-center h-full">{renderModalContent()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleGallery;
