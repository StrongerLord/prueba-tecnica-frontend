import { Task } from "@/utils/tasks";
import { formatDate } from "@/utils/date";
import Trash from "@assets/trash.svg";

type TableTasksProps = {
  task: Task[];
  deletingID: number | null;
  submitDeleteTask: (id: number) => Promise<void>;
};

export const TableTasks = ({
  task,
  deletingID,
  submitDeleteTask,
}: TableTasksProps) => {
  return (
    <table className="h-auto w-auto divide-y">
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
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            Eliminar
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {task.map((task) => (
          <tr
            key={task.id}
            className={`${deletingID === task.id ? "bg-red-300" : "hover:bg-gray-50"}`}
          >
            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 uppercase">
              {task.title}
            </td>
            <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-500">
              {task.description}
            </td>
            <td className="flex items-center justify-between px-6 py-4">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {task.status}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">{task.priority}</td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {formatDate(task.creation_time ? task.creation_time : "")}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {formatDate(task.expiration_time)}
            </td>
            <td>
              <button
                className="px-6 py-4 text-sm text-gray-500"
                onClick={() => submitDeleteTask(task.id)}
                title="Eliminar tarea"
              >
                <img
                  src={Trash}
                  alt={`Delete: ${task.id}`}
                  className="h-5 w-5"
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
