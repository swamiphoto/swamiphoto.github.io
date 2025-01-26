import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { galleryData } from "../../galleries"; // Import gallery data
import Slideshow from "../../../components/image-displays/slideshow/Slideshow";
import SlideshowAdmin from "../../../components/image-displays/slideshow/SlideshowAdmin"; // Import SlideshowAdmin component
import Head from "next/head";
import { fetchImageUrls } from "../../../common/images"; // Ensure fetchImageUrls is imported
import Loading from "../../../components/image-displays/slideshow/Loading/Loading";
import { getCloudimageUrl, getImageResolution } from "../../../common/images";

const SlideshowPage = ({ gallerySlug, gallery }) => {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState([]);
  const [texts, setTexts] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const isAdminView = router.query.admin !== undefined; // Detect if the admin query is present

  useEffect(() => {
    if (gallery) {
      const fetchImagesAndTexts = async () => {
        let urls = [];
        let extractedTexts = {};
        let imageCount = 0; // Tracks the index of images for mapping text blocks

        for (const block of gallery.blocks) {
          if (block.type === "stacked" || block.type === "masonry") {
            if (block.imageUrls) {
              urls = urls.concat(block.imageUrls);
              imageCount += block.imageUrls.length;
            } else if (block.imagesFolderUrl) {
              const fetchedUrls = await fetchImageUrls(block.imagesFolderUrl);
              const filteredUrls = fetchedUrls.filter((url) => !url.includes("protected"));
              urls = urls.concat(filteredUrls);
              imageCount += filteredUrls.length;
            }
          } else if (block.type === "text" && block.content) {
            // Map text to the current position in the image order
            extractedTexts[imageCount] = block.content;
          }
        }

        // Get the appropriate resolution based on screen size
        const resolution = getImageResolution();
        urls = urls.map((url) => getCloudimageUrl(url, { width: resolution.width, quality: resolution.quality }));

        setImageUrls(urls);
        setTexts(extractedTexts);

        // Wait for all images to load
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

      fetchImagesAndTexts();
    }
  }, [gallery]);

  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  const { slideshowSettings = {} } = gallery;
  const { layout = "kenburns", youtubeLinks = ["https://www.youtube.com/watch?v=PYujyluMxMU"], customDurations = {}, duration = 10000, captions = {}, coverImageIndex = 0 } = slideshowSettings;

  // Render admin view if ?admin is present in the query string
  if (isAdminView) {
    return <SlideshowAdmin gallery={gallery} />;
  }

  // Regular slideshow rendering
  return (
    <>
      <Head>
        <title>{gallery.name} - Slideshow by Swami Venkataramani</title>
        <meta name="description" content={gallery.description} />
        <meta property="og:site_name" content="Swami Venkataramani — Photography Portfolio"></meta>
        <meta property="og:title" content={`${gallery.name} - Slideshow by Swami Venkataramani`} />
        <meta property="og:description" content={`${gallery.description} (Recommend viewing on desktop)`} />
        <meta property="og:image:secure_url" itemProp="image" content={gallery.thumbnailUrl} />
        <meta property="og:url" content={`https://www.swamiphoto.com/galleries/${gallerySlug}/slideshow`} />
        <meta property="og:type" content="website" />
      </Head>

      {imagesLoaded ? (
        <Slideshow
          imageUrls={imageUrls}
          texts={texts}
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
        <Loading />
      )}
    </>
  );
};

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
