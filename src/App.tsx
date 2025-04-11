import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router";

export const App = () => {
  return (
    <>
      <div className="mt-16 flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white">
        <Navbar />
        <div className="flex w-full flex-col items-center justify-center overflow-scroll">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
