import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import Gallery from "../../components/image-displays/gallery/Gallery"; // Replace with the new Story component path
import Loading from "../../components/image-displays/slideshow/loading/Loading";
import { fetchImageUrls } from "../../common/images";
import Head from "next/head";
import { galleryData } from "../galleries"; // Ensure gallery data is imported correctly
import router from "next/router";

const SingleGallery = ({ gallerySlug, gallery }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [clientView, setClientView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (gallery) {
      const fetchImages = async () => {
        let urls = [];

        // Use provided imageUrls if specified
        if (gallery.imageUrls && gallery.imageUrls.length > 0) {
          urls = gallery.imageUrls;
        } else if (gallery.imagesFolderUrl) {
          // Otherwise fetch images from the folder URL
          const fetchedUrls = await fetchImageUrls(gallery.imagesFolderUrl);

          // Filter out protected images if not in client view
          if (!clientView) {
            urls = fetchedUrls.filter((url) => !url.includes("protected"));
          } else {
            urls = fetchedUrls;
          }
        }

        setImageUrls(urls);

        // Preload the images
        const imageLoadPromises = urls.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = url;
          });
        });

        await Promise.all(imageLoadPromises);
        setImagesLoaded(true); // Mark images as loaded
      };

      fetchImages(); // Invoke the async function
    }
  }, [gallery, clientView]);

  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  const handleClientLogin = () => {
    const decryptedPassword = gallery.clientSettings?.clientLogin || "";
    if (password === decryptedPassword) {
      setClientView(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderModalContent = () => {
    if (clientView) {
      return (
        <>
          <h1 className="text-center mx-auto md:max-w-xl text-4xl text-gray-800 font-bold tracking-tighter mb-2">Welcome to the Client Area</h1>
          <p className="text-center mx-auto md:max-w-xl text-xl text-gray-800 mb-6">{gallery.clientSettings?.clientMessage}</p>
          <button onClick={closeModal} className="w-full max-w-sm bg-black text-white p-5 text-xl font-medium inline-flex items-center justify-center cursor-pointer outline-none focus:outline-none hover:opacity-80">
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
      <Head>
        <title>{gallery.name} — Swami Venkataramani</title>
        <meta name="description" content={gallery.description} />

        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:title" content={`${gallery.name} - Gallery by Swami Venkataramani`} />
        <meta property="og:description" content={gallery.description} />
        <meta property="og:image" content={gallery.thumbnailUrl} />
        <meta property="og:url" content={`https://swamiphoto.com/galleries/${gallerySlug}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:title" content={`${gallery.name} - Gallery by Swami Venkataramani`} />
        <meta name="twitter:description" content={gallery.description} />
        <meta name="twitter:image" content={gallery.thumbnailUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Gallery
        name={gallery.name}
        description={gallery.description}
        blocks={gallery.blocks || []}
        enableSlideshow={gallery.enableSlideshow}
        enableClientView={gallery.enableClientView}
        onBackClick={() => router.push("/galleries")}
        onSlideshowClick={() => {
          if (gallery.slug) {
            router.push(`/galleries/${gallery.slug}/slideshow`);
          } else {
            console.error("Gallery slug is undefined");
          }
        }}
        onClientLoginClick={() => setIsModalOpen(true)}
      />

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

// Dynamic routing for Next.js
export async function getStaticPaths() {
  const paths = galleryData.map((gallery) => ({
    params: { gallerySlug: gallery.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const gallerySlug = params.gallerySlug;
  const gallery = galleryData.find((g) => g.slug === gallerySlug);

  return {
    props: {
      gallerySlug,
      gallery,
    },
  };
}

export default SingleGallery;
