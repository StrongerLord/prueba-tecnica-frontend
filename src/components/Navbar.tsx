import { NavLink } from "react-router";
import Home from "@assets/home.svg";
import Form from "@assets/form.svg";
import Edit from "@assets/edit.svg";
import { clearLocalStorage } from "@utils/localStorage.ts";
import Exit from "@assets/exit.svg";

export const Navbar = () => {
  const buttonsStyle =
    "group flex items-center justify-center rounded p-2 text-center text-xs text-gray-700 sm:hover:bg-blue-600 transition-colors hover:text-white sm:text-lg rounded-xl px-1 sm:px-4";

  return (
    <div className="fixed top-0 left-0 h-16 w-full">
      <nav className="flex h-full w-full items-center justify-between bg-white px-1 shadow-md sm:px-4">
        <div className="hidden text-xl font-bold text-gray-700 lg:flex">
          Prueba técnica
        </div>
        <div className="flex w-[70%] justify-around space-x-4 md:space-x-2 lg:w-1/2">
          <NavLink to="/" className={buttonsStyle}>
            <img
              src={Home}
              alt="Home"
              className="inline-block h-8 w-8 invert-75 transition-all group-hover:invert-25 sm:mr-2 sm:h-6 sm:w-6 sm:group-hover:invert-75"
            />
            <div className="hidden sm:flex">Menú</div>
          </NavLink>
          <NavLink to="/new-task" className={buttonsStyle}>
            <img
              src={Form}
              alt="Form"
              className="inline-block h-8 w-8 py-0.5 invert-75 transition-all group-hover:invert-25 sm:mr-2 sm:h-6 sm:w-6 sm:group-hover:invert-75"
            />
            <div className="hidden sm:flex">Nueva tarea</div>
          </NavLink>
          <NavLink to="/edit-task" className={buttonsStyle}>
            <img
              src={Edit}
              alt="Edit"
              className="inline-block h-8 w-8 py-0.5 invert-75 transition-all group-hover:invert-25 sm:mr-2 sm:h-6 sm:w-6 sm:group-hover:invert-75"
            />
            <div className="hidden sm:flex">Editar tarea</div>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/login"
            className={buttonsStyle}
            onClick={clearLocalStorage()}
          >
            <img
              src={Exit}
              alt="Exit"
              className="inline-block h-8 w-8 invert-75 transition-all group-hover:invert-25 sm:mr-2 sm:h-6 sm:w-6 sm:group-hover:invert-75"
            />
            <div className="hidden sm:flex">Cerrar sesión</div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
