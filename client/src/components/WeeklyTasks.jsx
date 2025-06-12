import DailyTasksCard from "./DailyTaskCard";
import Sidebar from "./Sidebar";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklyTasks = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex gap-2 px-2 space-y-6 overflow-x-auto">
        {daysOfWeek.map((day) => (
          <DailyTasksCard key={day} day={day} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyTasks;
