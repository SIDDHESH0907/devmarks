import React from "react";
import BookmarkCard from "./BookmarkCard";

export default function CategoryView({ bookmarks, query, category, onEdit, onDelete }) {
  const filtered = bookmarks.filter(b => {
    if (category && (b.category || "Uncategorized") !== category) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (b.title || "").toLowerCase().includes(q) || (b.description || "").toLowerCase().includes(q);
  });

  const groups = {};
  filtered.forEach(b => {
    const k = b.category || "Uncategorized";
    if (!groups[k]) groups[k] = [];
    groups[k].push(b);
  });

  return (
    <>
      {Object.keys(groups).length === 0 && <div className="card-shadow">No bookmarks found.</div>}
      {Object.entries(groups).map(([cat, items]) => (
        <div key={cat} className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <BookmarkCard key={item.id} item={item} onEdit={onEdit} onDelete={()=>onDelete(item.id)} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
