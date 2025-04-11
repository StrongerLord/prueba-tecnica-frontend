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
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            localStorage.setItem("token", data.token);
            window.location.href = "/";
          });
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
