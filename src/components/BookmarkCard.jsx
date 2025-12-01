import React from "react";

export default function BookmarkCard({ item, onEdit, onDelete }) {
  return (
    <div className="card-shadow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1 break-words">
          {item.title || item.url}
        </h3>

        {/* FIXED URL OVERFLOW */}
        <div className="text-sm text-sky-600 mb-3 break-all">
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
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
            onClick={() => onEdit(item)}
          >
            Edit
          </button>

          <button
            className="px-3 py-1 rounded-md bg-red-600 text-white text-sm"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
