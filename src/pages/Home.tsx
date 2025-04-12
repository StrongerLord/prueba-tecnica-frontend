import { useState, useEffect } from "react";
import { getTasks, deleteTask } from "@/utils/tasks";
import { Task } from "@/utils/tasks";
import { toast } from "react-toastify";
import { TableTasks } from "@/components/TableTasks";

export const Home = () => {
  const [deletingID, setDeletingID] = useState<number | null>(null);
  const [task, setTask] = useState<Task[]>([]);

  const submitDeleteTask = async (id: number) => {
    setDeletingID(id);
    try {
      const response = await deleteTask(id);
      if (response) {
        setTask((prevTasks) => prevTasks.filter((task) => task.id !== id));
        toast.success("Tarea eliminada con éxito");
        console.log("Holaa");
      } else {
        toast.error("Error al eliminar la tarea");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        if (tasks) setTask(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex max-h-[calc(100vh-12rem)] max-w-[90%] overflow-auto rounded-2xl bg-gray-200 p-4">
      <TableTasks
        task={task}
        deletingID={deletingID}
        submitDeleteTask={submitDeleteTask}
      />
    </div>
  );
};

export default Home;
