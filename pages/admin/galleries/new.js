// pages/admin/galleries/new.js
import Head from "next/head";
import { useState, useEffect } from "react";
import GalleryBuilder from "../../../components/admin/gallery-builder/GalleryBuilder";

const DEFAULT_GALLERY = {
  name: "",
  slug: "",
  description: "",
  thumbnailUrl: "",
  enableSlideshow: false,
  showCover: true,
  slideshowSettings: {
    layout: "kenburns",
    youtubeLink: "",
    musicCredit: "",
    coverImageUrl: "",
    title: "",
    description: "",
    excludedImageUrls: [],
  },
  blocks: [],
};

export default function NewGalleryPage() {
  const [allGalleries, setAllGalleries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/galleries")
      .then((r) => (r.ok ? r.json() : Promise.reject(`API error ${r.status}`)))
      .then((data) => setAllGalleries(data.galleries || []))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-sm">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>New Gallery — Admin</title>
      </Head>
      <GalleryBuilder
        initialGallery={DEFAULT_GALLERY}
        galleryIndex={-1}
        allGalleries={allGalleries}
        isNew={true}
      />
    </>
  );
}
