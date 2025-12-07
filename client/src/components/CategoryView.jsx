import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableBookmarkRow from "./SortableBookmarkRow";

/**
 Props:
 - bookmarks: full bookmarks array
 - setBookmarks: setter function (required)
 - query, category, onEdit, onDelete
*/
export default function CategoryView({ bookmarks, setBookmarks, query, category, onEdit, onDelete }) {
  // visible list (filtered)
  const filtered = bookmarks.filter(b => {
    if (category && (b.category || "Uncategorized") !== category) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (b.title || "").toLowerCase().includes(q) || (b.description || "").toLowerCase().includes(q);
  });

  // convert ids to strings consistently
  const filteredIds = filtered.map(i => String(i.id));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || String(active.id) === String(over.id)) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const oldIndex = filteredIds.indexOf(activeId);
    const newIndex = filteredIds.indexOf(overId);
    if (oldIndex === -1 || newIndex === -1) return;

    // reorder the filtered array
    const reorderedFiltered = arrayMove(filtered, oldIndex, newIndex);

    // If no category filter -> reorder entire bookmarks array directly by indices in full list
    if (!category) {
      const fullIds = bookmarks.map(b => String(b.id));
      const fromIndex = fullIds.indexOf(activeId);
      const toIndex = fullIds.indexOf(overId);
      if (fromIndex === -1 || toIndex === -1) return;
      const newFull = arrayMove(bookmarks, fromIndex, toIndex);
      setBookmarks(newFull);
      return;
    }

    // Category filter active -> replace only the filtered items in the full list while preserving others
    const filteredIdSet = new Set(filteredIds);
    const iter = reorderedFiltered.slice(); // copy
    const merged = bookmarks.map(b => {
      if (filteredIdSet.has(String(b.id))) {
        return iter.shift();
      }
      return b;
    });

    setBookmarks(merged);
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Bookmarks</h2>

      <div className="bg-white rounded-lg shadow ">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredIds}
            strategy={verticalListSortingStrategy}
          >
            {filtered.map(item => (
              <SortableBookmarkRow
                key={String(item.id)}
                item={item}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
