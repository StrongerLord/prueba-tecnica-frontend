import { Task } from "@/utils/tasks";
import { formatDate } from "@/utils/date";
import { useState, useMemo } from "react";
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
  const [sortConfig, setSortConfig] = useState<{
    field: keyof Task | null;
    direction: "asc" | "desc";
  }>({
    field: null,
    direction: "asc",
  });

  const handleSort = (field: keyof Task) => {
    if (sortConfig.field === field) {
      setSortConfig((prev) => ({
        field,
        direction: prev.direction === "asc" ? "desc" : "asc",
      }));
    } else {
      setSortConfig({ field, direction: "asc" });
    }
  };

  const sortedTasks = useMemo(() => {
    const tasksCopy = [...task];

    if (!sortConfig.field) return tasksCopy;

    return tasksCopy.sort((a, b) => {
      const valueA = sortConfig.field ? a[sortConfig.field] : null;
      const valueB = sortConfig.field ? b[sortConfig.field] : null;

      const comparison =
        typeof valueA === "number"
          ? Number(valueA) - Number(valueB)
          : typeof valueA === "string" && typeof valueB === "string"
            ? valueA.localeCompare(valueB)
            : 0;

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [task, sortConfig]);

  return (
    <table className="h-auto w-auto divide-y">
      <thead className="select-none">
        <tr>
          <th
            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            onClick={() => handleSort("id")}
          >
            Id
            {sortConfig.field === "id" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            onClick={() => handleSort("title")}
          >
            Título
            {sortConfig.field === "title" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            onClick={() => handleSort("description")}
          >
            Descripción
            {sortConfig.field === "description" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            onClick={() => handleSort("status_id")}
          >
            Estado
            {sortConfig.field === "status_id" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            onClick={() => handleSort("priority_id")}
          >
            Prioridad
            {sortConfig.field === "priority_id" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            onClick={() => handleSort("creation_time")}
          >
            Creación
            {sortConfig.field === "creation_time" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            onClick={() => handleSort("expiration_time")}
          >
            Expiración
            {sortConfig.field === "expiration_time" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            Eliminar
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {sortedTasks.map((task) => (
          <tr
            key={task.id}
            className={`${deletingID === task.id ? "bg-red-300" : "hover:bg-gray-50"}`}
          >
            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 uppercase">
              {task.id}
            </td>
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
