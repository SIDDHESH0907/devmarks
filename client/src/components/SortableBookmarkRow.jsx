import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash } from "lucide-react";

export default function SortableBookmarkRow({ item, onEdit, onDelete }) {
  // use string id for consistency
  const id = String(item.id);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : "auto",
  };

  const openLink = () => {
    if (item.url) window.open(item.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-lg cursor-pointer select-none ${
        isDragging ? "opacity-90" : ""
      }`}
      onClick={openLink}
    >
      <div className="flex items-center gap-3">
        {/* Drag handle: attach listeners & attributes here so only handle starts drag */}
        <div
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()} // prevent row open when using handle
          className="p-1 rounded hover:bg-slate-100 cursor-grab active:cursor-grabbing text-slate-400"
          title="Drag to reorder"
        >
          <GripVertical size={16} />
        </div>

        <img
          src={`https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}`}
          alt="icon"
          className="w-6 h-6 rounded"
        />

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">
            {item.title || item.url}
          </p>
          <div className="text-xs text-slate-500 truncate">{item.url}</div>
        </div>
      </div>

      <div
        className="flex items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onEdit(item)}
          className="text-slate-600 hover:text-slate-900 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="text-slate-600 hover:text-red-600"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
