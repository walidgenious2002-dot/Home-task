import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import AddTaskPage from "@/pages/AddTaskPage"
import HomePage from "@/pages/HomePage"
import NotFoundPage from "@/pages/NotFoundPage"
import type { Priority, Task } from "@/types"

const STORAGE_KEY = "taskly.tasks"

const seedTasks: Task[] = [
  {
    id: "seed-1",
    title: "Finish the React + Vite + shadcn/ui challenge",
    priority: "high",
    done: false,
    createdAt: Date.now(),
  },
  {
    id: "seed-2",
    title: "Push the project to GitHub",
    priority: "medium",
    done: false,
    createdAt: Date.now(),
  },
]

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : seedTasks
  } catch {
    return seedTasks
  }
}

export default function App() {
  // useState: the list of tasks lives here and is shared with the pages.
  // The initial value is read lazily from localStorage.
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  // useEffect #1: save the tasks whenever they change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  // useEffect #2: keep the browser tab title in sync with the open task count.
  useEffect(() => {
    const open = tasks.filter((t) => !t.done).length
    document.title = open > 0 ? `(${open}) Taskly` : "Taskly"
  }, [tasks])

  function addTask(title: string, priority: Priority) {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      priority,
      done: false,
      createdAt: Date.now(),
    }
    setTasks((prev) => [task, ...prev])
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-svh bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="size-5" />
            Taskly
          </Link>
          <Button asChild size="sm">
            <Link to="/add">New task</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            }
          />
          <Route path="/add" element={<AddTaskPage onAdd={addTask} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
