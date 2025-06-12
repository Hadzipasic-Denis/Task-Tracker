import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="hidden lg:inline relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[100vh] w-full max-w-[16rem] shadow-xl shadow-blue-gray-900/5">
        <nav className="flex flex-col mt-6 gap-1 p-2 font-sans text-base font-normal text-gray-700">
          <NavLink
            to={"/toDo"}
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4" to={"/toDo"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="m14 20.18l-3.59-3.59L9 18l5 5l9-9l-1.41-1.42z"
                ></path>
                <path
                  fill="currentColor"
                  d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"
                ></path>
              </svg>
            </div>
            To Do's
          </NavLink>
          <NavLink
            to={"/importantTasks"}
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4" to={"/important"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M12 8a4 4 0 0 1 8 0c0 1.45-.421 3.348-1.046 5.315c-.613 1.932-1.372 3.776-1.942 5.066c-.158.356-.532.619-1.012.619s-.854-.263-1.012-.62c-.57-1.289-1.329-3.133-1.942-5.065C12.42 11.348 12 9.45 12 8m4-6a6 6 0 0 0-6 6c0 3.523 1.986 8.536 3.16 11.19C13.654 20.31 14.773 21 16 21s2.345-.69 2.84-1.81C20.015 16.536 22 11.522 22 8a6 6 0 0 0-6-6m1.5 24.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0m2 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"
                ></path>
              </svg>
            </div>
            Important
          </NavLink>
          <NavLink
            to={"/weeklyTasks"}
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4" to={"/weeklyTasks"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 16 16"
              >
                <g fill="currentColor">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path>
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"></path>
                </g>
              </svg>
            </div>
            Weekly Plan
          </NavLink>
        </nav>
      </div>
    </>
  );
}
