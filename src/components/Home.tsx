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
    <div className="flex min-h-[calc(100vh-12rem)] w-[90%] overflow-auto rounded-2xl bg-gray-200 p-4">
      <table className="h-auto w-full divide-y">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Título
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Prioridad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Creación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Expiración
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {task.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                {task.title}
              </td>
              <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-500">
                {task.description}
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {task.priority}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {task.creation_time}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {task.expiration_time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
