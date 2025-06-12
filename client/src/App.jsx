import { Route, Routes } from "react-router-dom";
import ToDo from "./components/ToDo";
import ImportantTasks from "./components/ImportantTasks";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import WeeklyTasks from "./components/WeeklyTasks";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/importantTasks" element={<ImportantTasks />} />
        <Route path="/toDo" element={<ToDo />} />
        <Route path="/weeklyTasks" element={<WeeklyTasks />} />
      </Routes>
    </div>
  );
}

export default App;
