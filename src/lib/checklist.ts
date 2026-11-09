export type ChecklistTask = {
  id: string;
  title: string;
  category: string;
  completed: boolean;
};

export const DEFAULT_TASKS: ChecklistTask[] = [
  {
    id: "review",
    title: "Review code changes",
    category: "Git & Version Control",
    completed: true,
  },
  {
    id: "build",
    title: "Run production build",
    category: "Build",
    completed: true,
  },
  {
    id: "docker",
    title: "Build Docker image",
    category: "Containerization",
    completed: false,
  },
  {
    id: "health",
    title: "Verify health endpoint",
    category: "Monitoring",
    completed: false,
  },
  {
    id: "deploy",
    title: "Verify Render deployment",
    category: "Deployment",
    completed: false,
  },
];

export function isChecklistTask(
  value: unknown
): value is ChecklistTask {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.category === "string" &&
    typeof task.completed === "boolean"
  );
}
