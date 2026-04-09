import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminGalleriesPage() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/galleries")
      .then((r) => (r.ok ? r.json() : Promise.reject(`API error ${r.status}`)))
      .then(setConfig)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm(`Delete gallery "${slug}"? This cannot be undone.`)) return;
    const updated = {
      galleries: config.galleries.filter((g) => g.slug !== slug),
    };
    const res = await fetch("/api/admin/galleries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) setConfig(updated);
    else alert("Delete failed");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
        Loading galleries…
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
        <title>Galleries — Admin</title>
      </Head>
      <div className="max-w-5xl mx-auto px-6 py-10 font-sans">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Galleries</h1>
            <p className="text-sm text-gray-400 mt-1">
              {config.galleries.length} {config.galleries.length === 1 ? "gallery" : "galleries"}
            </p>
          </div>
          <Link
            href="/admin/galleries/new"
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            + New Gallery
          </Link>
        </div>

        {config.galleries.length === 0 ? (
          <div className="text-gray-400 text-sm">
            No galleries yet.{" "}
            <Link href="/admin/galleries/new" className="text-gray-600 underline">
              Create one
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.galleries.map((gallery) => (
              <div
                key={gallery.slug}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
              >
                {gallery.thumbnailUrl ? (
                  <img
                    src={gallery.thumbnailUrl}
                    alt={gallery.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
                    No thumbnail
                  </div>
                )}
                <div className="p-4">
                  <div className="font-semibold text-gray-900 text-sm">{gallery.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                    {gallery.description || "No description"}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    {gallery.blocks?.length || 0} block{gallery.blocks?.length !== 1 ? "s" : ""}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link
                      href={`/admin/galleries/${gallery.slug}`}
                      className="flex-1 text-center text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(gallery.slug)}
                      className="text-sm text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
