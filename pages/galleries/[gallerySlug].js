import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import Gallery from "../../components/image-displays/gallery/Gallery";
import Head from "next/head";
import { galleryData } from "../galleries";
import { useRouter } from "next/router";
import AdminGallery from "../../components/image-displays/gallery/admin-gallery/AdminGallery";
import { fetchImageUrls } from "../../common/images";

const SingleGallery = ({ gallerySlug, gallery }) => {
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [clientView, setClientView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const isAdmin = router.query.admin !== undefined;

  // Process blocks client-side for pagination, filtering, and client view
  // Images are already fetched server-side in getStaticProps
  useEffect(() => {
    const processedBlocks = gallery.blocks.map((block) => {
      if (block.type === "stacked" || block.type === "masonry") {
        // Images are already fetched and sorted server-side
        let imageUrls = block.imageUrls || [];

        // Apply pagination if needed
        if (typeof block.start === "number") {
          imageUrls = block.count === -1 ? imageUrls.slice(block.start) : imageUrls.slice(block.start, block.start + block.count);
        }

        // Apply protection and exclusion filters
        return {
          ...block,
          imageUrls: imageUrls.filter((url) => {
            const isProtected = clientView ? true : !url.includes("protected");
            const isExcluded = block.excludeImageUrls?.includes(url);
            return isProtected && !isExcluded;
          }),
        };
      }
      return block;
    });

    setFilteredBlocks(processedBlocks);
  }, [gallery.blocks, clientView]);

  const handleClientLogin = () => {
    const decryptedPassword = gallery.clientSettings?.clientLogin || "";
    if (password === decryptedPassword) {
      setClientView(true); // Enable client view
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

  if (isAdmin) {
    // Add error boundary
    try {
      return <AdminGallery gallery={gallery} />;
    } catch (error) {
      console.error("Error in AdminGallery:", error);
      return <div>Error loading admin view</div>;
    }
  }

  return (
    <>
      <Head>
        <title>{gallery.name} — Swami Venkataramani</title>
        <meta name="description" content={gallery.description} key="description" />

        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:title" content={`${gallery.name} - Gallery by Swami Venkataramani`} key="og:title" />
        <meta property="og:description" content={gallery.description} key="og:description" />
        <meta property="og:image" content={gallery.thumbnailUrl ? (gallery.thumbnailUrl.startsWith("http") ? gallery.thumbnailUrl : `https://swamiphoto.com${gallery.thumbnailUrl}`) : "https://swamiphoto.com/images/mac.png"} key="og:image" />
        <meta property="og:image:width" content="1200" key="og:image:width" />
        <meta property="og:image:height" content="630" key="og:image:height" />
        <meta property="og:image:type" content="image/jpeg" key="og:image:type" />
        <meta property="og:url" content={`https://swamiphoto.com/galleries/${gallerySlug}`} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:site_name" content="Swami Venkataramani" key="og:site_name" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:title" content={`${gallery.name} - Gallery by Swami Venkataramani`} key="twitter:title" />
        <meta name="twitter:description" content={gallery.description} key="twitter:description" />
        <meta name="twitter:image" content={gallery.thumbnailUrl ? (gallery.thumbnailUrl.startsWith("http") ? gallery.thumbnailUrl : `https://swamiphoto.com${gallery.thumbnailUrl}`) : "https://swamiphoto.com/images/mac.png"} key="twitter:image" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      </Head>

      {filteredBlocks.length > 0 && (
        <Gallery
          name={gallery.name}
          description={gallery.description}
          blocks={filteredBlocks}
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

  if (!gallery) {
    return {
      notFound: true,
    };
  }

  // Pre-fetch all image URLs server-side at build time
  // Handle galleries without blocks array (e.g., admin gallery)
  if (!gallery.blocks || !Array.isArray(gallery.blocks)) {
    return {
      props: {
        gallerySlug,
        gallery: {
          ...gallery,
          blocks: [],
        },
      },
    };
  }

  const processedBlocks = await Promise.all(
    gallery.blocks.map(async (block) => {
      if ((block.type === "stacked" || block.type === "masonry") && block.imagesFolderUrl) {
        try {
          console.log(`[getStaticProps] Fetching images for folder: ${block.imagesFolderUrl}`);
          const imageUrls = await fetchImageUrls(block.imagesFolderUrl);
          // Sort URLs for consistency
          const sortedUrls = imageUrls.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
          
          if (sortedUrls.length === 0) {
            console.warn(`[getStaticProps] WARNING: No images found for folder ${block.imagesFolderUrl} in gallery ${gallerySlug}. This may cause images not to appear on the site.`);
          } else {
            console.log(`[getStaticProps] Successfully fetched ${sortedUrls.length} images for folder ${block.imagesFolderUrl}`);
          }
          
          return {
            ...block,
            imageUrls: sortedUrls,
          };
        } catch (error) {
          console.error(`[getStaticProps] ERROR fetching images for ${block.imagesFolderUrl} in gallery ${gallerySlug}:`, error.message || error);
          console.error(`[getStaticProps] Full error:`, error);
          // Return block with empty imageUrls array if fetch fails
          // This will cause images not to appear, but at least the page will load
          return {
            ...block,
            imageUrls: block.imageUrls || [],
          };
        }
      }
      return block;
    })
  );

  return {
    props: {
      gallerySlug,
      gallery: {
        ...gallery,
        blocks: processedBlocks,
      },
    },
  };
}

export default SingleGallery;
