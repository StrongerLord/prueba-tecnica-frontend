import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router";

export const App = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
