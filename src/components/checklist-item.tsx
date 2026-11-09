import type { ChecklistTask } from "@/lib/checklist";

type ChecklistItemProps = {
  task: ChecklistTask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ChecklistItem({
  task,
  onToggle,
  onDelete,
}: ChecklistItemProps) {
  return (
    <li className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
      <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 size-4 cursor-pointer accent-blue-600"
          aria-label={`Mark ${task.title} as ${
            task.completed ? "incomplete" : "complete"
          }`}
        />

        <span className="min-w-0 flex-1">
          <span
            className={`block text-sm font-semibold ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-800"
            }`}
          >
            {task.title}
          </span>

          <span className="mt-1 block text-xs text-slate-500">
            {task.category}
          </span>
        </span>
      </label>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
      >
        Delete
      </button>
    </li>
  );
}
