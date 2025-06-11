import Sidebar from "./Sidebar";
import checklist from "../assets/checklist.png";

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
      </div>
    </div>
  );
}
