import { useEffect, useRef, useState } from "react";

const BLOCK_TYPES = [
  { type: "photo", label: "Photo", desc: "Single photo with optional caption" },
  { type: "stacked", label: "Stacked", desc: "Alternating pairs of photos" },
  { type: "masonry", label: "Masonry", desc: "Grid in masonry layout" },
  { type: "text", label: "Text", desc: "Text between photos" },
  { type: "video", label: "Video", desc: "YouTube video embed" },
];

export function defaultBlock(type) {
  switch (type) {
    case "photo":
      return { type: "photo", imageUrl: "", caption: "", variant: 1 };
    case "stacked":
      return { type: "stacked", imageUrls: [] };
    case "masonry":
      return { type: "masonry", imageUrls: [] };
    case "text":
      return { type: "text", content: "", variant: 1 };
    case "video":
      return { type: "video", url: "", caption: "", variant: 1 };
    default:
      return { type };
  }
}

export default function BlockTypeMenu({ onAdd, onClose }) {
  const ref = useRef(null);
  const [openUpward, setOpenUpward] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    // Menu height approx: 5 items × 52px each + 8px padding = ~268px
    if (spaceBelow < 280) {
      setOpenUpward(true);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-30 w-64 py-1 ${
        openUpward ? "bottom-full mb-1" : "top-full mt-1"
      }`}
    >
      {BLOCK_TYPES.map(({ type, label, desc }) => (
        <button
          key={type}
          onClick={() => {
            onAdd(defaultBlock(type));
            onClose();
          }}
          className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors"
        >
          <div className="text-sm font-medium text-gray-800">{label}</div>
          <div className="text-xs text-gray-400">{desc}</div>
        </button>
      ))}
    </div>
  );
}
