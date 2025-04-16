import { useState, useEffect } from "react";
import { getTasks, deleteTask } from "@/utils/tasks";
import { Task } from "@/types/tasks";
import { toast } from "react-toastify";
import { TableTasks } from "@/components/TableTasks";

export const Home = () => {
  const [deletingID, setDeletingID] = useState<number | null>(null);
  const [task, setTask] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const submitDeleteTask = async (id: number) => {
    setDeletingID(id);
    try {
      const response = await deleteTask(id);
      if (response) {
        setTask((prevTasks) => prevTasks.filter((task) => task.id !== id));
        toast.success("Tarea eliminada con éxito");
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
        if (tasks) {
          setTask(tasks);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Error fetching tasks:");
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <svg
            className="animate-spin fill-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 24 24"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            />
          </svg>
        </div>
      ) : (
        <div
          className={`overflow flex max-h-[calc(100vh-12rem)] max-w-[90%] rounded-2xl ${loading ? " " : "overflow-auto bg-gray-200 p-4"}`}
        >
          <TableTasks
            task={task}
            deletingID={deletingID}
            submitDeleteTask={submitDeleteTask}
          />
        </div>
      )}
    </>
  );
};

export default Home;
