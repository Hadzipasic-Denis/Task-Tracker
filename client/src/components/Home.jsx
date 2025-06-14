import Sidebar from "./Sidebar";
import checklist from "../assets/checklist.png";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col gap-4 w-full items-center py-6 px-4 overflow-y-auto h-[100vh] py-10">
        <img
          className="hidden lg:inline-block"
          src={checklist}
          width={350}
          alt="checklist"
        />
        <img
          className="inline-block lg:hidden"
          src={checklist}
          width={200}
          alt="checklist"
        />
        <div>
          <div className="w-full text-center sm:px-6">
            <h2 className="text-black dark:text-white">
              <span className="text-base font-semibold leading-6 text-teal-500 uppercase">
                All in One tracker
              </span>
              <span className="block max-w-3xl text-xl font-semibold tracking-wide text-gray-700 dark:text-gray-300 sm:text-2xl sm:mt-3">
                From smart To-Do checklists to weekly planners for recurring
                tasks and perfectly organized shopping lists
              </span>

              <span className="block tracking-wide max-w-3xl mt-2 font-bolder tracking-tight text-teal-600 dark:text-white sm:text-4xl sm:leading-tight">
                Track it all effortlessly.
              </span>
            </h2>

            <div className="flex justify-center gap-2 mt-5">
              <NavLink
                to={"/toDo"}
                className="w-40 py-3 text-base font-semibold text-center text-white transition duration-200 ease-in bg-teal-500 rounded-lg shadow-md hover:bg-teal-600"
              >
                Create tasks
              </NavLink>
              <NavLink
                to={"/shoppingList"}
                className="border-[1px] border-teal-500 w-40 py-3 text-base font-semibold text-center text-teal-500 transition duration-200 ease-in rounded-lg shadow-md hover:bg-teal-600 hover:text-white"
              >
                Go shopping
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
