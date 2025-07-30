import DailyTasksCard from "./DailyTaskCard";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const WeeklyTasks = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const resetWeeklyTasks = () => {
    daysOfWeek.forEach((d) => {
      const key = `tasks_${d.toLowerCase()}`;
      const storedTasks = JSON.parse(localStorage.getItem(key)) || [];
      const updatedTasks = storedTasks.map((task) => ({
        ...task,
        completed: false,
      }));
      localStorage.setItem(key, JSON.stringify(updatedTasks));
    });

    window.dispatchEvent(new Event("tasksReset"));
    toast.info("All tasks reset for the whole week!");
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex gap-2 px-2 space-y-6 overflow-x-auto">
        <div>
          <div className="mt-2 ml-2 w-96">
            <button
              onClick={resetWeeklyTasks}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
            >
              Start new week
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {daysOfWeek.map((day) => (
              <DailyTasksCard key={day} day={day} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTasks;
