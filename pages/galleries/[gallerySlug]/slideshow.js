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
  const [slides, setSlides] = useState([]);
  const isAdminView = router.query.admin !== undefined; // Detect if the admin query is present

  useEffect(() => {
    if (gallery) {
      const fetchAndProcessSlides = async () => {
        const combinedSlides = [];

        for (const block of gallery.blocks) {
          if (block.type === "photo" && block.imageUrl) {
            combinedSlides.push({ type: "image", url: block.imageUrl, caption: block.caption || null });
          } else if (block.type === "text" && block.content) {
            combinedSlides.push({ type: "text", content: block.content });
          } else if (block.type === "stacked" || block.type === "masonry") {
            let urls = [];
            if (block.imageUrls) {
              urls = block.imageUrls;
            } else if (block.imagesFolderUrl) {
              const fetchedUrls = await fetchImageUrls(block.imagesFolderUrl);
              urls = fetchedUrls.filter((url) => !url.includes("protected"));
            }
            combinedSlides.push(...urls.map((url) => ({ type: "image", url })));
          } else if (block.type === "video" && block.url) {
            combinedSlides.push({ type: "video", url: block.url, caption: block.caption || null });
          }
        }

        setSlides(combinedSlides);
        setImagesLoaded(true);
      };

      fetchAndProcessSlides();
    }
  }, [gallery]);

  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  const { slideshowSettings = {} } = gallery;
  const { layout = "kenburns", youtubeLinks = ["https://www.youtube.com/watch?v=PYujyluMxMU"], customDurations = {}, duration = 10000, captions = {}, coverImageIndex = 0, musicCredits = [] } = slideshowSettings;

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
          slides={slides}
          layout={layout}
          title={gallery.name}
          subtitle={gallery.description}
          youtubeUrl={youtubeLinks[Math.floor(Math.random() * youtubeLinks.length)]}
          customDurations={customDurations}
          duration={duration}
          thumbnailUrl={gallery.thumbnailUrl}
          slug={gallerySlug}
          musicCredits={musicCredits}
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
