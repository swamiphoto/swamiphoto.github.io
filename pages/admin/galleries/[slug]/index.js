// pages/admin/galleries/[slug].js
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import GalleryBuilder from "../../../../components/admin/gallery-builder/GalleryBuilder";

export default function EditGalleryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/admin/galleries")
      .then((r) => (r.ok ? r.json() : Promise.reject(`API error ${r.status}`)))
      .then((config) => {
        const index = config.galleries.findIndex((g) => g.slug === slug);
        if (index === -1) throw new Error(`Gallery "${slug}" not found`);
        setData({
          gallery: config.galleries[index],
          index,
          allGalleries: config.galleries,
        });
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
        Loading gallery…
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
        <title>{data.gallery.name} — Edit Gallery</title>
      </Head>
      <GalleryBuilder
        initialGallery={data.gallery}
        galleryIndex={data.index}
        allGalleries={data.allGalleries}
        isNew={false}
      />
    </>
  );
}
