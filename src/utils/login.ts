const API_HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME;

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
          window.location.href = "/";
        } else {
          console.error("No token received");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        return null;
      });
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};
