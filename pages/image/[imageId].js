import Lightbox from "../../components/image-displays/lightbox/Lightbox"; // Adjust path as needed
import Head from "next/head";
import { base64Decode } from "../../common/images"; // Adjust import for your decoding logic
import { imageMapping } from "../../common/images"; // Assuming this has the thumbnail mapping
import { useRouter } from "next/router";

const ImagePage = () => {
  const router = useRouter();
  const { imageId } = router.query; // Get the encoded image ID from the query params

  if (!imageId) return null; // Return null if no imageId is available

  const decodedImageUrl = base64Decode(imageId); // Decode the Base64-encoded image URL
  const imageUrl = imageMapping[decodedImageUrl] || decodedImageUrl; // Use the decoded URL or fallback to dynamic
  const thumbnailUrl = `${imageUrl}?width=300&quality=80`; // Example for generating a thumbnail version

  const imageDescription = "High-quality image by Swami Venkataramani"; // You can customize the description as needed
  const imageTitle = `Image — Swami Venkataramani`;

  return (
    <>
      <Head>
        <title>{imageTitle}</title>
        <meta name="description" content={imageDescription} />

        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:title" content={imageTitle} />
        <meta property="og:description" content={imageDescription} />
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:url" content={`https://swamiphoto.com/image/${imageId}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:title" content={imageTitle} />
        <meta name="twitter:description" content={imageDescription} />
        <meta name="twitter:image" content={thumbnailUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Lightbox />
    </>
  );
};

export default ImagePage;
