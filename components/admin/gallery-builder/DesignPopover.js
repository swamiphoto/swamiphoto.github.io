// components/admin/gallery-builder/DesignPopover.js
import { useRef, useEffect } from "react";

const VARIANT_OPTIONS = {
  photo: [
    { value: 1, label: "Edge to edge" },
    { value: 2, label: "Centered 72%" },
  ],
  text: [
    { value: 1, label: "Sans-serif" },
    { value: 2, label: "Serif" },
  ],
  video: [
    { value: 1, label: "Edge to edge" },
    { value: 2, label: "85% centered" },
    { value: 3, label: "Video + caption" },
  ],
};

export default function DesignPopover({ blockType, value, onClose, onChange }) {
  const ref = useRef(null);
  const options = VARIANT_OPTIONS[blockType];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  if (!options) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-3 w-48"
    >
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Layout</div>
      <div className="flex flex-col gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { onChange(opt.value); onClose(); }}
            className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${
              value === opt.value
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
