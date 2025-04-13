import DatePicker from "react-datepicker";
import { NewTask } from "@/utils/tasks";
import { useNavigate } from "react-router";

interface NewFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formData: NewTask;
  setFormData: React.Dispatch<React.SetStateAction<NewTask>>;
}

export const NewForm = ({
  handleSubmit,
  formData,
  setFormData,
}: NewFormProps) => {
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Título */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Título *
        </label>
        <input
          type="text"
          required
          maxLength={30}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          maxLength={200}
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
              setFormData({ ...formData, status: parseInt(e.target.value) })
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
              setFormData({ ...formData, priority: parseInt(e.target.value) })
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
          selected={
            typeof formData.expiration_time === "string"
              ? new Date(formData.expiration_time)
              : formData.expiration_time
          }
          onChange={(date: Date | null) => {
            if (date) {
              setFormData({ ...formData, expiration_time: date });
            }
          }}
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
            navigate("/");
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
  );
};
