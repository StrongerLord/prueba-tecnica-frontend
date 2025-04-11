import { Task } from "@utils/task.d.ts";

const API_HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME;
const URL = `${API_HOSTNAME}/tareas`;
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";
// This function fetches all tasks from the API and returns them as a JSON object.
export const getTasks = async () => {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 422 || response.status === 401) {
      console.log("Token expired, redirecting to login");
      window.location.href = "/login";
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
};

// This function fetches tasks by their status from the API and returns a backend message.
export const createTask = async (task: Task) => {
  const URL = `${API_HOSTNAME}/tareas`;
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (response.status === 422 || response.status === 401) {
      window.location.href = "/login";
    }
    return response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

// This function fetches a single task by its ID from the API and returns it as a JSON object.
export const getTask = async (id: string) => {
  const URL = `${API_HOSTNAME}/tareas/${id}`;
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 422 || response.status === 401) {
      window.location.href = "/login";
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
};

// This function updates a task by its ID in the API and returns a backend message.
export const updateTask = async (task: Task) => {
  const URL = `${API_HOSTNAME}/tareas/${task.id}`;
  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (response.status === 422 || response.status === 401) {
      window.location.href = "/login";
    }
    return response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};

// This function deletes a task by its ID from the API and returns a backend message.
export const deleteTask = async (id: string) => {
  const URL = `${API_HOSTNAME}/tareas/${id}`;
  try {
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 422 || response.status === 401) {
      window.location.href = "/login";
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    return null;
  }
};
