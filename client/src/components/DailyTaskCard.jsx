import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const DailyTasksCard = ({ day }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const STORAGE_KEY = `tasks_${day.toLowerCase()}`;

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setTasks(storedTasks);
  }, [STORAGE_KEY]);

  const saveTasks = (updatedTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const handleReset = () => {
      const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      setTasks(storedTasks);
    };

    window.addEventListener("tasksReset", handleReset);
    return () => window.removeEventListener("tasksReset", handleReset);
  }, [STORAGE_KEY]);

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setInputValue("");
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast.success("Task deleted!");
  };

  const handleEditTask = (id, currentText) => {
    setEditTaskId(id);
    setEditValue(currentText);
  };

  const handleSaveEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editValue } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditTaskId(null);
    setEditValue("");
    toast.success("Task updated!");
  };

  const isSaturday = day.toLowerCase() === "saturday";
  const isSunday = day.toLowerCase() === "sunday";

  const borderColorClass = isSaturday
    ? "border-yellow-500"
    : isSunday
    ? "border-red-500"
    : "border-teal-500";

  const buttonColorClass = isSaturday
    ? "bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600"
    : isSunday
    ? "bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600"
    : "bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700";

  return (
    <div className="min-w-[350px] h-fit mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl">{day}</h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <div
          className={`flex items-center border-b-2 ${borderColorClass} py-2`}
        >
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className={`flex-shrink-0 ${buttonColorClass} text-sm border-4 text-white py-1 px-2 rounded`}
            type="submit"
          >
            Add
          </button>
        </div>
      </form>

      <ul className="divide-y divide-gray-200 px-4">
        {tasks.map((task) => (
          <li key={task.id} className="py-4 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded hover:cursor-pointer"
                />
                {editTaskId === task.id ? (
                  <input
                    type="text"
                    className="ml-3 px-2 py-1 border rounded w-full"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSaveEdit(task.id)
                    }
                  />
                ) : (
                  <span
                    className={`ml-3 text-lg font-medium ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                )}
              </div>
              <div
                className={`space-x-2 ${
                  editTaskId === task.id ? "flex" : "hidden group-hover:flex"
                }`}
              >
                {editTaskId === task.id ? (
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="text-green-600 hover:text-green-800"
                    title="Save"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
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
                ) : (
                  <button
                    onClick={() => handleEditTask(task.id, task.text)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
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
                )}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyTasksCard;
