import React from "react";

export default function BookmarkCard({ item, onEdit, onDelete }) {
  const openLink = () => {
    if (!item?.url) return;
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLink();
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openLink}
      onKeyDown={handleKeyDown}
      className="card-shadow flex flex-col justify-between w-full overflow-hidden cursor-pointer"
      aria-label={`Open ${item.title || item.url}`}
    >
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-slate-800 mb-1 break-words">
          {item.title || item.url}
        </h3>

        {/* FIXED URL OVERFLOW */}
        <div className="text-sm text-sky-600 mb-3 break-all">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:underline break-all"
          >
            {item.url}
          </a>
        </div>

        <p className="text-sm text-slate-600 mb-3 break-words">
          {item.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-700">
          {item.category || "Uncategorized"}
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded-md text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
          >
            Edit
          </button>

          <button
            className="px-3 py-1 rounded-md bg-red-600 text-white text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
