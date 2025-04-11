import { NavLink } from "react-router";
import Home from "@assets/home.svg";
import Form from "@assets/form.svg";
import Edit from "@assets/edit.svg";

export const Navbar = () => {
  const buttonsStyle =
    "flex items-center justify-center rounded bg-gray-100 p-2 text-center text-xs text-gray-700 hover:text-blue-500 sm:text-lg";
  return (
    <div className="fixed top-0 left-0 h-16 w-full border-b-2 border-gray-200">
      <nav className="flex h-full items-center justify-between bg-white px-1 shadow-md sm:px-4">
        <div className="hidden text-xl font-bold sm:flex">Prueba técnica</div>
        <ul className="flex space-x-8">
          <li>
            <NavLink to="/" className={buttonsStyle}>
              <img src={Home} alt="Home" className="mr-1 h-6 w-6 invert-75" />
              Menú
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={buttonsStyle}>
              <img
                src={Form}
                alt="Form"
                className="mr-1 inline-block h-6 w-6 py-0.5 invert-75"
              />
              Nueva tarea
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={buttonsStyle}>
              <img
                src={Edit}
                alt="Home"
                className="mr-1 inline-block h-6 w-6 py-0.5 invert-75"
              />
              Editar tarea
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
