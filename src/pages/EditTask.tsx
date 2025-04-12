import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getTask, updateTask } from "@/utils/tasks";
import { toast } from "react-toastify";
import { UpdateTaskForm } from "@/components/UpdateTaskForm";

export const EditTask = () => {
  const [taskId, setTaskId] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: 0,
    status_message: "",
    priority_message: "",
    priority: 0,
    expiration_time: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [taskFound, setTaskFound] = useState(false);

  const handleSearch = async () => {
    if (!taskId) {
      toast.error("Por favor ingresa un ID de tarea");
      return;
    }

    setIsSearching(true);
    try {
      const task = await getTask(taskId);
      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          status_message: task.status,
          priority_message: task.priority,
          status: task.status_id,
          priority: task.priority_id,
          expiration_time: new Date(task.expiration_time),
        });
        setTaskFound(true);
        toast.success("Tarea encontrada en la base de datos!");
      } else {
        toast.error("Tarea no encontrada en la base de datos");
        setTaskFound(false);
      }
    } catch (error) {
      console.error("Error al buscar la tarea:", error);
      toast.error("Tarea no encontrada");
      setTaskFound(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localDate = new Date(formData.expiration_time);
    const adjustedDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        localDate.getHours(),
        localDate.getMinutes(),
      ),
    );

    try {
      const updatedTask = {
        ...formData,
        id: taskId,
        status: formData.status,
        priority: formData.priority,
        expiration_time: adjustedDate.toISOString(),
      };

      const response = await updateTask(updatedTask);
      if (response) {
        toast.success("Tarea actualizada correctamente");
        setTaskId(0);
        setFormData({
          title: "",
          description: "",
          status_message: "",
          priority_message: "",
          status: 0,
          priority: 0,
          expiration_time: new Date(),
        });
        setTaskFound(false);
      }
    } catch (error) {
      console.log("Error al actualizar la tarea:", error);
      toast.error("Error al actualizar la tarea");
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-xl">
      <div className="mb-6 text-2xl font-bold text-blue-600">
        Actualizar Tarea
      </div>
      <div className="mb-6 flex gap-2">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            ID de la Tarea *
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={taskId}
              onChange={(e) => setTaskId(parseInt(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el ID de la tarea"
              disabled={taskFound}
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={!taskId || isSearching || taskFound}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSearching ? (
                <span className="flex items-center">
                  <svg className="h-5 w-5 animate-spin ..." viewBox="0 0 24 24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                    />
                    <path
                      fill="currentColor"
                      d="M12.5,4.5A7.5,7.5,0,1,1,5,12H6A6.5,6.5,0,1,0,12.5,4.5Z"
                    />
                  </svg>
                </span>
              ) : (
                "Buscar"
              )}
            </button>
          </div>
        </div>
      </div>
      <UpdateTaskForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        taskFound={taskFound}
        setTaskFound={setTaskFound}
        setTaskId={setTaskId}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};
