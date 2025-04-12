import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <div className="mt-16 flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white">
        <Navbar />
        <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
