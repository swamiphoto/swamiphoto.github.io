import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { galleryData } from "../../galleries"; // Import gallery data
import Slideshow from "../../../components/image-displays/slideshow/Slideshow";
import SlideshowAdmin from "../../../components/image-displays/slideshow/SlideshowAdmin"; // Import SlideshowAdmin component
import Head from "next/head";
import { getCloudimageUrl, getImageResolution, fetchImageUrls } from "../../../common/images";

const SlideshowPage = ({ gallerySlug, gallery }) => {
  const router = useRouter();
  const isAdminView = router.query.admin !== undefined; // Detect if the admin query is present

  // Process slides from pre-fetched gallery blocks (images already fetched server-side)
  const slides = useMemo(() => {
    const combinedSlides = [];

    for (const block of gallery.blocks) {
      if (block.type === "photo" && block.imageUrl) {
        combinedSlides.push({ type: "image", url: block.imageUrl, caption: block.caption || null });
      } else if (block.type === "text" && block.content) {
        combinedSlides.push({ type: "text", content: block.content });
      } else if (block.type === "stacked" || block.type === "masonry") {
        // Images are already fetched server-side in getStaticProps
        const urls = (block.imageUrls || []).filter((url) => !url.includes("protected"));
        combinedSlides.push(...urls.map((url) => ({ type: "image", url })));
      } else if (block.type === "video" && block.url) {
        combinedSlides.push({ type: "video", url: block.url, caption: block.caption || null });
      }
    }

    return combinedSlides;
  }, [gallery.blocks]);

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
          console.log(`[slideshow getStaticProps] Fetching images for folder: ${block.imagesFolderUrl}`);
          const imageUrls = await fetchImageUrls(block.imagesFolderUrl);
          // Sort URLs for consistency
          const sortedUrls = imageUrls.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
          
          if (sortedUrls.length === 0) {
            console.warn(`[slideshow getStaticProps] WARNING: No images found for folder ${block.imagesFolderUrl} in gallery ${gallerySlug}.`);
          } else {
            console.log(`[slideshow getStaticProps] Successfully fetched ${sortedUrls.length} images for folder ${block.imagesFolderUrl}`);
          }
          
          return {
            ...block,
            imageUrls: sortedUrls,
          };
        } catch (error) {
          console.error(`[slideshow getStaticProps] ERROR fetching images for ${block.imagesFolderUrl} in gallery ${gallerySlug}:`, error.message || error);
          console.error(`[slideshow getStaticProps] Full error:`, error);
          // Return block with empty imageUrls array if fetch fails
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

export default SlideshowPage;
