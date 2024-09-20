import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { galleryData } from "../../galleries"; // Import gallery data
import Slideshow from "../../../components/image-displays/slideshow/Slideshow";
import Head from "next/head";
import { fetchImageUrls } from "../../../common/images"; // Ensure fetchImageUrls is imported
import Loading from "../../../components/image-displays/slideshow/Loading/Loading";
import { getCloudimageUrl } from "../../../common/images";

const SlideshowPage = ({ gallerySlug, gallery }) => {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (gallery) {
      const fetchImages = async () => {
        let urls = [];

        if (gallery.imageUrls && gallery.imageUrls.length > 0) {
          // Use provided imageUrls if specified
          urls = gallery.imageUrls;
        } else if (gallery.imagesFolderUrl) {
          // Otherwise fetch images from the folder URL
          urls = await fetchImageUrls(gallery.imagesFolderUrl);
          urls = urls.filter((url) => !url.includes("protected"));
        }

        setImageUrls(urls);

        // Wait for all images to be loaded
        const imageLoadPromises = urls.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = url;
          });
        });

        await Promise.all(imageLoadPromises);
        setImagesLoaded(true); // Set flag when all images are loaded
      };

      fetchImages();
    }
  }, [gallery]);

  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  const { slideshowSettings = {} } = gallery;
  const { layout = "kenburns", youtubeLinks = ["https://www.youtube.com/watch?v=PYujyluMxMU"], customDurations = {}, duration = 10000, captions = {}, coverImageIndex = 0, mobileCoverImageIndex = 0 } = slideshowSettings;

  return (
    <>
      <Head>
        <title>{gallery.name} - Slideshow by Swami Venkataramani</title>
        <meta name="description" content={gallery.description} />
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:site_name" content="Swami Venkataramani — Photography Portfolio"></meta>
        <meta property="og:title" content={`${gallery.name} - Slideshow by Swami Venkataramani`} />
        <meta property="og:description" content={`${gallery.description} (Recommend viewing on desktop)`} />
        <meta property="og:image:secure_url" itemProp="image" content={gallery.thumbnailUrl} />
        <meta property="og:url" content={`https://www.swamiphoto.com/galleries/${gallerySlug}/slideshow`} />
        <meta property="og:type" content="website" />
        <meta property="og:updated_time" content="1726816739" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:title" content={`${gallery.name} - Slideshow by Swami Venkataramani`} />
        <meta name="twitter:description" content={gallery.description} />
        <meta name="twitter:image" content={gallery.thumbnailUrl} /> {/* Assuming thumbnail URL is available */}
        <meta name="twitter:card" content={gallery.thumbnailUrl} />
      </Head>

      {imagesLoaded ? (
        <Slideshow
          imageUrls={imageUrls} // Pass the fetched image URLs to Slideshow
          texts={gallery.texts}
          layout={layout}
          title={gallery.name}
          subtitle={gallery.description}
          youtubeUrl={youtubeLinks[Math.floor(Math.random() * youtubeLinks.length)]}
          customDurations={customDurations}
          duration={duration}
          captions={captions}
          thumbnailUrl={gallery.thumbnailUrl}
          slug={gallerySlug}
        />
      ) : (
        <Loading /> // Use Loading component instead of text
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

export default SlideshowPage;
