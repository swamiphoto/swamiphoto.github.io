import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

function GalleryCard({ gallery, onDelete }) {
  return (
    <div className="border border-stone-200 overflow-hidden bg-white shadow-sm">
      {gallery.thumbnailUrl ? (
        <img src={gallery.thumbnailUrl} alt={gallery.name} className="w-full h-36 object-cover" />
      ) : (
        <div className="w-full h-36 bg-stone-100 flex items-center justify-center text-stone-300 text-xs">
          No cover
        </div>
      )}
      <div className="p-3">
        <div className="font-semibold text-stone-900 text-sm">{gallery.name || "Untitled"}</div>
        <div className="text-xs text-stone-400 mt-0.5 line-clamp-1">
          {gallery.description || <span className="italic">No description</span>}
        </div>
        <div className="text-xs text-stone-300 mt-1">
          {gallery.blocks?.length || 0} block{gallery.blocks?.length !== 1 ? "s" : ""}
          {gallery.slug && <span className="ml-2 font-mono">/{gallery.slug}</span>}
        </div>
        <div className="flex gap-2 mt-3">
          <Link
            href={`/admin/galleries/${gallery.slug}`}
            className="flex-1 text-center text-xs font-medium bg-stone-100 text-stone-700 px-3 py-1.5 hover:bg-stone-200 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(gallery.slug)}
            className="text-xs text-red-400 px-3 py-1.5 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, count, children, empty }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-2 mb-4 border-b border-stone-100 pb-2">
        <h2 className="text-sm font-semibold text-stone-800">{title}</h2>
        <span className="text-xs text-stone-400">{count}</span>
      </div>
      {empty ? (
        <p className="text-xs text-stone-400">{empty}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{children}</div>
      )}
    </div>
  );
}

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
    const updated = { galleries: config.galleries.filter((g) => g.slug !== slug) };
    const res = await fetch("/api/admin/galleries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) setConfig(updated);
    else alert("Delete failed");
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-stone-400 text-sm">Loading…</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500 text-sm">Error: {error}</div>;

  const published = (config.galleries || []).filter((g) => g.status === "published" || !g.status);
  const drafts = (config.galleries || []).filter((g) => g.status === "draft");

  return (
    <>
      <Head><title>Galleries — Admin</title></Head>
      <div className="max-w-5xl mx-auto px-6 py-10 font-sans">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-stone-900">Galleries</h1>
          <Link
            href="/admin/galleries/new"
            className="bg-stone-900 text-white text-xs font-semibold px-4 py-2 hover:bg-stone-700 transition-colors"
          >
            + New Gallery
          </Link>
        </div>

        <Section
          title="Published"
          count={published.length}
          empty={published.length === 0 ? "No published galleries yet." : null}
        >
          {published.map((g) => (
            <GalleryCard key={g.slug} gallery={g} onDelete={handleDelete} />
          ))}
        </Section>

        {drafts.length > 0 && (
          <Section title="Drafts" count={drafts.length}>
            {drafts.map((g) => (
              <GalleryCard key={g.slug} gallery={g} onDelete={handleDelete} />
            ))}
          </Section>
        )}
      </div>
    </>
  );
}
