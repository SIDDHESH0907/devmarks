import { Trash } from "lucide-react";

export default function BookmarkRow({ item, onEdit, onDelete }) {
  // Open URL in new tab
  const openLink = () => {
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={openLink}
      className="flex items-center justify-between px-4 py-3 border-b border-slate-200 hover:bg-slate-50 rounded-md cursor-pointer"
    >
      {/* LEFT: Icon + Title */}
      <div className="flex items-center gap-3">
        <img
          src={`https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}`}
          alt="icon"
          className="w-6 h-6 rounded"
        />

        <p className="text-sm font-medium text-slate-800">{item.title}</p>
      </div>

      {/* RIGHT: Buttons */}
      <div
        className="flex items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onEdit}
          className="text-slate-600 hover:text-black text-sm flex items-center"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="text-slate-600 hover:text-red-600 flex items-center"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
