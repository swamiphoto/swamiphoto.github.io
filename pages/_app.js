import { ScrollProvider } from "../hooks/ScrollContext"; // Assuming you need ScrollContext
import "../styles/globals.css"; // Global CSS
import Header from "../components/header/Header"; // Adjust the path accordingly
import Footer from "../components/footer/Footer"; // Adjust the path accordingly
import { useRouter } from "next/router";
import { galleryData } from "./galleries"; // Import the gallery data from where it's located
import Head from "next/head";

// Define noHeaderPaths for galleries and other pages
const otherNoHeaderPaths = ["/"];
const galleryPaths = galleryData.map((gallery) => `/galleries/${gallery.slug}`);
const slideshowPaths = galleryData.filter((gallery) => gallery.enableSlideshow).map((gallery) => `/galleries/${gallery.slug}/slideshow`);
const adminPaths = [...galleryPaths.map((path) => `${path}?admin`), ...slideshowPaths.map((path) => `${path}?admin`)];

const noHeaderPaths = [...slideshowPaths, ...otherNoHeaderPaths, ...adminPaths, "/timemanagement"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current path matches exactly any noHeaderPaths or starts with them for dynamic segments
  const isNoHeaderPath = noHeaderPaths.includes(router.pathname) || noHeaderPaths.includes(router.asPath);

  const description = "Published photographer, podcaster, and photography coach based in Bay Area. Focusing on landscapes, portraits, and Bollywood.";

  return (
    <ScrollProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>Swami Venkataramani — Photography Portfolio</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.typekit.net/kbh3pjg.css"></link>
      </Head>

      <div className="App text-center">
        {/* Render header conditionally */}
        {!isNoHeaderPath && <Header />}
        <div className={`${isNoHeaderPath ? "" : "px-4 md:px-0"}`}>
          {/* The page-specific component */}
          <Component {...pageProps} />
        </div>
        {!isNoHeaderPath && <Footer />}
      </div>
    </ScrollProvider>
  );
}

export default MyApp;
