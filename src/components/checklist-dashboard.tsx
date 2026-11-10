"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
  DEFAULT_TASKS,
  isChecklistTask,
} from "@/lib/checklist";

import type { ChecklistTask } from "@/lib/checklist";
import { ChecklistItem } from "./checklist-item";

const STORAGE_KEY = "devops-release-checklist:v1";

export function ChecklistDashboard() {
  const [tasks, setTasks] = useState<ChecklistTask[]>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_TASKS;
    }

    try {
      const savedTasks = window.localStorage.getItem(STORAGE_KEY);

      if (!savedTasks) {
        return DEFAULT_TASKS;
      }

      const parsedTasks: unknown = JSON.parse(savedTasks);

      if (!Array.isArray(parsedTasks)) {
        return DEFAULT_TASKS;
      }

      return parsedTasks.filter(isChecklistTask);
    } catch (error) {
      console.error("[storage] Failed to load checklist", error);
      return DEFAULT_TASKS;
    }
  });
  const [newTask, setNewTask] = useState("");

  // Save tasks whenever the list changes
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.error("[storage] Failed to save checklist", error);
    }
  }, [tasks]);

  // Calculate dashboard statistics
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingCount = tasks.length - completedCount;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  // Add a new task
  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTask.trim();
    if (!title) {
      return;
    }
    const task: ChecklistTask = {
      id: crypto.randomUUID(),
      title,
      category: "Custom",
      completed: false,
    };

    setTasks((currentTasks) => [task, ...currentTasks]);
    setNewTask("");
  }

  // Toggle task completion
  function handleToggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Delete a task
  function handleDeleteTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  // Remove all completed tasks
  function handleClearCompleted() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Deployment workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Production Release Checklist
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Track your deployment tasks and make sure everything is
            ready before releasing your application.
          </p>
        </div>

        <span className="w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
          Personal workspace
        </span>
      </section>

      <section
        aria-label="Checklist statistics"
        className="mb-8 grid gap-4 sm:grid-cols-3"
      >
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total tasks</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {tasks.length}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Completed</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {completedCount}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Remaining</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {remainingCount}
          </p>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Deployment tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your release activities.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearCompleted}
              disabled={completedCount === 0}
              className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear completed
            </button>
          </div>

          <form onSubmit={handleAddTask} className="mb-6 flex gap-2">
            <label htmlFor="new-task" className="sr-only">
              New task
            </label>
            <input
              id="new-task"
              type="text"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="Add a new deployment task..."
              maxLength={80}
              required
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Add task
            </button>
          </form>

          {tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
              <p className="font-semibold text-slate-700">
                No tasks yet.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Add your first deployment task above.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <ChecklistItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </ul>
          )}
          <p className="mt-5 text-xs text-slate-400">
            Your checklist is saved in this browser.
          </p>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Release readiness
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Completion progress for your current deployment checklist.
          </p>
          <div className="my-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Progress
              </span>
              <span className="text-sm font-bold text-blue-600">
                {progress}%
              </span>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Checklist completion"
            >
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">
              {progress === 100 && tasks.length > 0
                ? "All tasks completed!"
                : "Keep making progress"}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {progress === 100 && tasks.length > 0
                ? "Your checklist is complete. Review the application before release."
                : `${remainingCount} task(s) remaining in your checklist.`}
            </p>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="text-sm font-semibold text-slate-800">
              Release tips
            </h3>
            <ul className="mt-3 space-y-3 text-xs leading-5 text-slate-500">
              <li>• Verify the production build before deployment.</li>
              <li>• Check environment variables and secrets.</li>
              <li>• Verify container health after deployment.</li>
              <li>• Review application logs for errors.</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
