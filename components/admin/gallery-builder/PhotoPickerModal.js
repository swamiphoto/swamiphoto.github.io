// components/admin/gallery-builder/PhotoPickerModal.js
import { useState, useMemo, useRef } from "react";

const KNOWN_FOLDERS = [
  "photos/library",
  "photos/landscapes",
  "photos/portraits",
  "photos/bollywood",
  "photos/tennis",
  "photos/headshots",
  "photos/landscapes/arizona",
  "photos/landscapes/california",
  "photos/portraits/sunol",
  "photos/portraits/naga-sunflowers",
];

function extractFolder(url) {
  const match = url.match(/\/photos\/(.+)\/[^/]+$/);
  return match ? match[1] : "other";
}

function LibraryTab({ images, loading, blockType, onConfirm }) {
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("all");
  const [selected, setSelected] = useState([]);

  const isMulti = blockType === "stacked" || blockType === "masonry";

  const folders = useMemo(() => {
    const set = new Set();
    images.forEach((url) => set.add(extractFolder(url)));
    return ["all", ...Array.from(set).sort()];
  }, [images]);

  const filtered = useMemo(() => {
    let result = images;
    if (folder !== "all") result = result.filter((url) => extractFolder(url) === folder);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((url) => url.toLowerCase().includes(q));
    }
    return result;
  }, [images, folder, search]);

  const toggle = (url) => {
    if (!isMulti) {
      onConfirm([url]);
      return;
    }
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100 space-y-2 flex-shrink-0">
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-300"
          placeholder="Search photos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 outline-none"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          {folders.map((f) => (
            <option key={f} value={f}>{f === "all" ? "All folders" : f}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="text-center text-gray-400 text-sm py-16">Loading photos…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-16">No photos found</div>
        ) : (
          <div style={{ columns: "4", gap: "6px" }}>
            {filtered.map((url) => {
              const isSelected = selected.includes(url);
              return (
                <div
                  key={url}
                  className={`relative rounded-lg overflow-hidden cursor-pointer mb-1.5 break-inside-avoid ring-2 transition-all ${
                    isSelected ? "ring-blue-500" : "ring-transparent hover:ring-gray-300"
                  }`}
                  onClick={() => toggle(url)}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", url)}
                  title={url.split("/").pop()}
                >
                  <img
                    src={`/_next/image?url=${encodeURIComponent(url)}&w=256&q=65`}
                    alt=""
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isMulti && (
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-gray-400">
            {selected.length > 0 ? `${selected.length} selected` : `${filtered.length} photos`}
          </span>
          <button
            onClick={() => onConfirm(selected)}
            disabled={selected.length === 0}
            className="bg-gray-900 text-white text-sm px-4 py-1.5 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
          >
            Add {selected.length > 0 ? selected.length : ""} photo{selected.length !== 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
}

function UploadTab({ onUploaded }) {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({});
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const arr = Array.from(newFiles).filter((f) => /\.(jpg|jpeg|png|gif)$/i.test(f.name));
    setFiles((prev) => [...prev, ...arr]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    const uploadedUrls = [];
    for (const file of files) {
      setProgress((p) => ({ ...p, [file.name]: "pending" }));
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, contentType: file.type, folder: folder || undefined }),
        });
        const { signedUrl, gcsUrl } = await res.json();
        const formData = new FormData();
        Object.entries(signedUrl.fields).forEach(([k, v]) => formData.append(k, v));
        formData.append("file", file);
        const uploadRes = await fetch(signedUrl.url, { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Upload failed");
        setProgress((p) => ({ ...p, [file.name]: "done" }));
        uploadedUrls.push(gcsUrl);
      } catch {
        setProgress((p) => ({ ...p, [file.name]: "error" }));
      }
    }
    setUploading(false);
    if (uploadedUrls.length > 0) onUploaded(uploadedUrls);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          dragging ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-400 bg-gray-50"
        }`}
      >
        <input ref={inputRef} type="file" multiple accept=".jpg,.jpeg,.png,.gif" className="hidden" onChange={(e) => addFiles(e.target.files)} />
        <div className="text-3xl mb-2">📁</div>
        <div className="text-sm font-medium text-gray-700">Drop photos here or click to browse</div>
        <div className="text-xs text-gray-400 mt-1">JPG, PNG — multiple files supported</div>
      </div>

      {files.length > 0 && (
        <div className="max-h-32 overflow-y-auto space-y-1">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-2">
              <span className="flex-1 truncate text-xs text-gray-600">{f.name}</span>
              <span className={
                progress[f.name] === "done" ? "text-green-500 text-xs" :
                progress[f.name] === "error" ? "text-red-500 text-xs" :
                progress[f.name] === "pending" ? "text-blue-400 text-xs" : "text-gray-300 text-xs"
              }>
                {progress[f.name] === "done" ? "✓" : progress[f.name] === "error" ? "✗" : progress[f.name] === "pending" ? "↑" : "·"}
              </span>
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Folder <span className="text-gray-400 font-normal">(optional — blank = photos/library)</span>
        </label>
        <input
          list="upload-folder-options"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          placeholder="photos/landscapes"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors"
        />
        <datalist id="upload-folder-options">
          {KNOWN_FOLDERS.map((f) => <option key={f} value={f} />)}
        </datalist>
      </div>

      <button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className="bg-gray-900 text-white text-sm py-2.5 rounded-xl disabled:opacity-40 hover:bg-gray-700 transition-colors"
      >
        {uploading ? "Uploading…" : `Upload ${files.length} photo${files.length !== 1 ? "s" : ""}`}
      </button>
    </div>
  );
}

export default function PhotoPickerModal({ images, loading, blockType, onConfirm, onClose }) {
  const [tab, setTab] = useState("library");

  const handleUploadDone = (uploadedUrls) => {
    onConfirm(uploadedUrls);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col" style={{ height: "80vh" }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setTab("library")}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                tab === "library" ? "bg-white shadow-sm text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Library
            </button>
            <button
              onClick={() => setTab("upload")}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                tab === "upload" ? "bg-white shadow-sm text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upload
            </button>
          </div>
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 min-h-0">
          {tab === "library" ? (
            <LibraryTab
              images={images}
              loading={loading}
              blockType={blockType}
              onConfirm={onConfirm}
            />
          ) : (
            <UploadTab onUploaded={handleUploadDone} />
          )}
        </div>
      </div>
    </div>
  );
}
