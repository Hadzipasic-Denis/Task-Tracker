import { Route, Routes } from "react-router-dom";
import ToDo from "./components/ToDo";
import ImportantTasks from "./components/ImportantTasks";
import { ToastContainer, Bounce } from "react-toastify";
import Home from "./components/Home";
import WeeklyTasks from "./components/WeeklyTasks";
import ShoppingList from "./components/ShoppingList";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

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

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/importantTasks" element={<ImportantTasks />} />
        <Route path="/toDo" element={<ToDo />} />
        <Route path="/weeklyTasks" element={<WeeklyTasks />} />
        <Route path="/shoppingList" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;
