import { useState, useEffect } from "react";
import { getTasks } from "@utils/tasks";
import { Task } from "@utils/tasks.d.ts";

export const Home = () => {
  const [task, setTask] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTask(tasks);
    };

    fetchTasks();
  }, []);

  return (
    <>
      {task.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.status}</p>
          <p>{task.priority}</p>
          <p>{task.creation_date}</p>
          <p>{task.expiration_date}</p>
        </div>
      ))}
    </>
  );
};
