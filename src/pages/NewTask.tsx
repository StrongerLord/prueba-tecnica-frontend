import { NewForm } from "@components/NewTaskForm";
import { createTask } from "@/utils/tasks";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

export const NewTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: 0,
    priority: 0,
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
        toast.success("Tarea creada exitosamente!");
      } else {
        toast.error("Error al crear la tarea");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-blue-600">Nueva Tarea</h2>
      <NewForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default NewTask;
