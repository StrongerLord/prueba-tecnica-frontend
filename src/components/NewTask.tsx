import { createTask } from "@/utils/tasks";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const NewTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    expiration_time: new Date(),
  });

  const handleSubmit = async (e: ReactFormEventHandler<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createTask({
        ...formData,
        expiration_time: formData.expiration_time.toISOString(),
      });
      if (response) {
        console.log("Tarea creada:", response);
        // Aquí puedes cerrar el modal o hacer algo más
      } else {
        console.error("Error al crear la tarea");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-blue-600">Nueva Tarea</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Título *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="Revisar reporte mensual"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="h-24 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="Detalles adicionales..."
          />
        </div>

        {/* Estado y Prioridad */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Estado *
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Cancelada</option>
              <option value={1}>Pendiente</option>
              <option value={2}>Abierta</option>
              <option value={3}>En progreso</option>
              <option value={4}>En revisión</option>
              <option value={5}>Rechazada</option>
              <option value={6}>Aprovada</option>
              <option value={7}>Finalizada</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Prioridad *
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Trivial</option>
              <option value={2}>Menor</option>
              <option value={3}>Muy baja</option>
              <option value={4}>Baja</option>
              <option value={5}>Media</option>
              <option value={6}>Alta</option>
              <option value={7}>Muy alta</option>
              <option value={8}>Superior</option>
              <option value={9}>Crítica</option>
              <option value={10}>Inmediata</option>
            </select>
          </div>
        </div>

        {/* DatePicker */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Fecha Límite *
          </label>
          <DatePicker
            selected={formData.expiration_time}
            onChange={(date) =>
              setFormData({ ...formData, expiration_time: date })
            }
            minDate={new Date()}
            dateFormat="dd/MM/yyyy HH:mm"
            showTimeSelect
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={() => {
              /* Lógica para cerrar modal */
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Crear Tarea
          </button>
        </div>
      </form>
    </div>
  );
};
