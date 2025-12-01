import React, { useState, useEffect } from "react";

export default function BookmarkForm({ initial = {}, onCancel, onSave }) {
  const [title, setTitle] = useState(initial.title || "");
  const [url, setUrl] = useState(initial.url || "");
  const [description, setDescription] = useState(initial.description || "");
  const [category, setCategory] = useState(initial.category || "");

  useEffect(() => {
    setTitle(initial.title || "");
    setUrl(initial.url || "");
    setDescription(initial.description || "");
    setCategory(initial.category || "");
  }, [initial]);

  function submit(e) {
    e.preventDefault();
    if (!url) return alert("URL is required!");

    onSave({
      id: initial.id,
      title,
      url,
      description,
      category,
    });
  }

  const isEdit = Boolean(initial && initial.id);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="w-full max-w-2xl bg-white rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Bookmark" : "Add Bookmark"}
        </h3>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">URL</label>
            <input
              className="input-shadow w-full"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Title</label>
            <input
              className="input-shadow w-full"
              placeholder="Bookmark Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Description
            </label>
            <textarea
              className="input-shadow w-full min-h-[110px]"
              placeholder="Short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Category
            </label>
            <input
              className="input-shadow w-full"
              placeholder="e.g., Coding, Docs, Learning"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* BUTTON AREA */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              className="px-4 py-2 border rounded-md"
              onClick={onCancel}
            >
              Cancel
            </button>

            {/* Main Action: Add or Update */}
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white ${
                isEdit ? "bg-amber-600" : "bg-green-600"
              }`}
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
