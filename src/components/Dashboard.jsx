import React, { useMemo, useState } from "react";
import CategoryView from "./CategoryView";
import BookmarkForm from "./BookmarkForm";

export default function Dashboard({ bookmarks, setBookmarks, onLogout }) {
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editing, setEditing] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(bookmarks.map((b) => b.category || "Uncategorized"));
    return Array.from(set);
  }, [bookmarks]);

  function addBookmark(item) {
    const id = item.id ?? Date.now();
    setBookmarks((prev) => [{ ...item, id }, ...prev]);
  }
  function updateBookmark(updated) {
    setBookmarks((prev) =>
      prev.map((b) => (String(b.id) === String(updated.id) ? updated : b))
    );
  }
  function removeBookmark(id) {
    if (!confirm("Delete bookmark?")) return;
    setBookmarks((prev) => prev.filter((b) => String(b.id) !== String(id)));
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(bookmarks, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookmarks-export.json";
    a.click();
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Bookmark Dashboard
          </h1>
          <div className="text-sm text-slate-500">Welcome, admin</div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input-shadow w-80"
            placeholder="Search title or description"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-shadow"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setEditing({})}
          >
            New Bookmark
          </button>
          <button
            className="border px-3 py-2 rounded-lg"
            onClick={downloadJSON}
          >
            Download JSON
          </button>
          <button className="px-3 py-2 rounded-lg" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <aside className="w-64 card-shadow">
          <h4 className="font-semibold text-slate-700 mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between items-center">
              <button
                className="text-left w-full"
                onClick={() => setSelectedCategory("")}
              >
                All
              </button>
              <span className="text-slate-500">{bookmarks.length}</span>
            </li>
            {categories.map((c) => (
              <li key={c} className="flex justify-between items-center">
                <button
                  className="text-left w-full"
                  onClick={() => setSelectedCategory(c)}
                >
                  {c}
                </button>
                <span className="text-slate-500">
                  {
                    bookmarks.filter(
                      (b) => (b.category || "Uncategorized") === c
                    ).length
                  }
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1">
          <CategoryView
            bookmarks={bookmarks}
            setBookmarks={setBookmarks} // IMPORTANT: pass setter
            query={q}
            category={selectedCategory}
            onEdit={(b) => setEditing(b)}
            onDelete={removeBookmark}
          />
        </main>
      </div>

      {editing !== null && (
        <BookmarkForm
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={(data) => {
            if (typeof data.id !== "undefined" && data.id !== null)
              updateBookmark(data);
            else addBookmark(data);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
