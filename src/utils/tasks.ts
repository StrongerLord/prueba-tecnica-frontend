export type Fecha =
  `${number}-${number}-${number} ${number}:${number}:${number}`;

export interface NewTask {
  id: number;
  title: string;
  description?: string;
  priority: number;
  status: number;
  expiration_time: string | Date;
  creation_time?: string | Date;
}

export interface UpdateTask {
  title: string;
  description?: string;
  priority: number;
  status: number;
  expiration_time: string | Date;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: string;
  priority_id: number;
  status_id: number;
  status: string;
  expiration_time: string | Date;
  creation_time?: string | Date;
}

const API_HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME;
const URL = `${API_HOSTNAME}/tareas`;
// This function fetches all tasks from the API and returns them as a JSON object.
export const getTasks = async () => {
  try {
    const token = localStorage.getItem("token");
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
    if (response.status === 200) return response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
};

// This function fetches tasks by their status from the API and returns a backend message.
export const createTask = async (task: UpdateTask) => {
  const URL = `${API_HOSTNAME}/tareas`;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Error creating task");
    }
    if (response.status === 422 || response.status === 401) {
      window.location.href = "/login";
    }
    if (response.status === 200) return response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

// This function fetches a single task by its ID from the API and returns it as a JSON object.
export const getTask = async (id: number) => {
  const URL = `${API_HOSTNAME}/tareas/${id}`;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching task");
    }
    if (response.status === 422 || response.status === 401) {
      window.location.href = "/login";
    }
    if (response.status === 200) return response.json();
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
};

// This function updates a task by its ID in the API and returns a backend message.
export const updateTask = async (task: Task) => {
  const URL = `${API_HOSTNAME}/tareas/${task.id}`;
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Error updating task");
    }
    if (response.status === 422 || response.status === 401) {
      window.location.href = "/login";
    }
    if (response.status === 200) return response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};

// This function deletes a task by its ID from the API and returns a backend message.
export const deleteTask = async (id: number) => {
  const URL = `${API_HOSTNAME}/tareas/${id}`;
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error deleting task");
    }
    if (response.status === 422 || response.status === 401) {
      window.location.href = "/login";
    }
    if (response.status === 200) return response.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    return null;
  }
};
