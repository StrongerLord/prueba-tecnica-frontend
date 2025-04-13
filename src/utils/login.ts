const API_HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME;

import { toast } from "react-toastify";

export const login = (username: string, password: string) => {
  try {
    const URL = `${API_HOSTNAME}/login`;
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          const token = data.token;
          localStorage.setItem("token", token);
          toast.success("Inicio de sesión exitoso");
          window.location.href = "/";
        } else {
          toast.error("Inicio de sesión fallido. Verifica tus credenciales.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        toast.error("Error al iniciar sesión. Intenta nuevamente.");
        return null;
      });
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error("Error al iniciar sesión. Intenta nuevamente.");
    return null;
  }
};
