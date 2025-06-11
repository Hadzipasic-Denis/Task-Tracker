import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [checklistInput, setChecklistInput] = useState("");
  const [tempChecklist, setTempChecklist] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const STORAGE_KEY = "task_manager_data";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setTasks(stored);
  }, []);

  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addChecklistItem = () => {
    if (!checklistInput.trim()) return;
    setTempChecklist([
      ...tempChecklist,
      { id: Date.now(), text: checklistInput.trim(), completed: false },
    ]);
    setChecklistInput("");
  };

  const createTask = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      status: "normal",
      checklist: tempChecklist,
      isImportant: false,
      createdAt: new Date().toISOString(),
    };
    saveTasks([...tasks, newTask]);
    setTitle("");
    setTempChecklist([]);
    toast.success("New task created!");
  };

  const toggleChecklistItem = (taskId, itemId) => {
    const updated = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          checklist: task.checklist.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        };
      }
      return task;
    });
    saveTasks(updated);
  };

  const toggleTaskStatus = (taskId) => {
    const updated = tasks.map((task) => {
      if (task.id === taskId) {
        const isFinished = task.status === "finished";
        return {
          ...task,
          status: isFinished ? "normal" : "finished",
          checklist: task.checklist.map((item) => ({
            ...item,
            completed: !isFinished,
          })),
        };
      }
      return task;
    });
    saveTasks(updated);
  };

  const deleteTask = (taskId) => {
    const updated = tasks.filter((task) => task.id !== taskId);
    saveTasks(updated);
    toast.success("Task deleted!");
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  };

  const saveTaskTitle = (taskId) => {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, title: editedTitle } : task
    );
    saveTasks(updated);
    setEditingTaskId(null);
    setEditedTitle("");
    toast.success("Task updated!");
  };

  const markAsImportant = (taskId) => {
    const taskToMove = tasks.find((task) => task.id === taskId);
    if (!taskToMove) return;

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);

    const importantStorageKey = "important_task_manager_data";
    const existingImportantTasks =
      JSON.parse(localStorage.getItem(importantStorageKey)) || [];

    const updatedImportantTasks = [
      ...existingImportantTasks,
      { ...taskToMove, status: "important" },
    ];
    localStorage.setItem(
      importantStorageKey,
      JSON.stringify(updatedImportantTasks)
    );
    toast.success("Task moved to important!");
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto py-6 px-4">
        <div className="bg-white shadow-md rounded-lg p-4 max-w-xl mx-auto w-full">
          <h2 className="text-xl font-bold mb-4">Create New Task</h2>
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          />
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Checklist item..."
              value={checklistInput}
              onChange={(e) => setChecklistInput(e.target.value)}
              className="flex-grow border border-gray-300 rounded px-3 py-2"
            />
            <button
              onClick={addChecklistItem}
              className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <ul className="mb-4 list-disc pl-5 text-sm text-gray-700">
            {tempChecklist.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
          <button
            onClick={createTask}
            className="w-full bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-white py-2 rounded"
          >
            Create Task
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">To Do's</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 italic">No tasks created yet.</p>
          ) : (
            [...tasks]
              .sort(
                (a, b) => (a.status === "finished") - (b.status === "finished")
              )
              .map((task) => (
                <div
                  key={task.id}
                  className={`group border rounded p-4 mb-4 relative ${
                    task.status === "finished"
                      ? "bg-gray-100 text-gray-500 border-gray-300"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    {editingTaskId === task.id ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          className="border px-2 py-1 rounded w-full"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && saveTaskTitle(task.id)
                          }
                        />
                        <button
                          onClick={() => saveTaskTitle(task.id)}
                          title="Save"
                          className="text-green-600 hover:text-green-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={26}
                            height={26}
                            viewBox="0 0 32 32"
                          >
                            <path
                              fill="currentColor"
                              d="m14 21.414l-5-5.001L10.413 15L14 18.586L21.585 11L23 12.415z"
                            ></path>
                            <path
                              fill="currentColor"
                              d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <h3
                          className={`text-lg font-semibold ${
                            task.status === "finished" ? "line-through" : ""
                          }`}
                        >
                          {task.title}
                        </h3>
                        <p className="text-xs font-medium mb-1">
                          Status:{" "}
                          <span
                            className={
                              task.status === "finished"
                                ? "text-green-600"
                                : "text-blue-600"
                            }
                          >
                            {task.status === "normal"
                              ? "To Do"
                              : task.status === "important"
                              ? "Important"
                              : task.status.charAt(0).toUpperCase() +
                                task.status.slice(1)}
                          </span>
                        </p>
                        <p className="text-xs font-medium mb-2">
                          Created at:{" "}
                          <span className="text-gray-600">
                            {new Date(task.createdAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </p>
                      </div>
                    )}

                    <div className="flex items-center items-end ml-4 group-hover:flex hidden">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`text-sm ${
                          task.status === "finished"
                            ? "w-full hover:bg-emerald-600 hover:text-white p-1 rounded"
                            : "w-full hover:bg-emerald-600 hover:text-white p-1 rounded"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="currentColor"
                            d="M280.768 753.728L691.456 167.04a32 32 0 1 1 52.416 36.672L314.24 817.472a32 32 0 0 1-45.44 7.296l-230.4-172.8a32 32 0 0 1 38.4-51.2zM736 448a32 32 0 1 1 0-64h192a32 32 0 1 1 0 64zM608 640a32 32 0 0 1 0-64h319.936a32 32 0 1 1 0 64zM480 832a32 32 0 1 1 0-64h447.936a32 32 0 1 1 0 64z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => markAsImportant(task.id)}
                        className="text-red-600 p-1 hover:text-yellow-800"
                        title="Mark as Important"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={26}
                          height={26}
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="currentColor"
                            d="M8.201 8.833a.205.205 0 0 1-.402 0l-.855-4.56a1.075 1.075 0 1 1 2.112 0zM8 2C6.7 2 5.721 3.18 5.96 4.457l.856 4.56a1.205 1.205 0 0 0 2.368 0l.855-4.56A2.075 2.075 0 0 0 8 2m0 11a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                          ></path>
                        </svg>
                      </button>

                      <button
                        onClick={() => startEditingTask(task)}
                        className="text-blue-600 p-1 hover:text-blue-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 2048 2048"
                        >
                          <path
                            fill="currentColor"
                            d="M2048 335q0 66-25 128t-73 110L633 1890L0 2048l158-633L1475 98q48-48 110-73t128-25q69 0 130 26t106 72t72 107t27 130M326 1428q106 35 182 111t112 183L1701 640l-293-293zm-150 444l329-82q-10-46-32-87t-55-73t-73-54t-87-33zM1792 549q25-25 48-47t41-46t28-53t11-67q0-43-16-80t-45-66t-66-45t-81-17q-38 0-66 10t-53 29t-47 41t-47 48z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 p-1 hover:text-red-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 28 28"
                        >
                          <path
                            fill="currentColor"
                            d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zM7.772 21.978a2.75 2.75 0 0 0 2.74 2.522h6.976a2.75 2.75 0 0 0 2.74-2.522L21.436 7.5H6.565zM11.75 11a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 .75-.75m5.25.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <ul className="list-disc pl-5">
                    {task.checklist.map((item) => (
                      <li key={item.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleChecklistItem(task.id, item.id)}
                          className="h-4 w-4"
                        />
                        <span
                          className={
                            item.completed ? "line-through text-gray-400" : ""
                          }
                        >
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
