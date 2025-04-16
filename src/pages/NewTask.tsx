import { NewForm } from "@/components/NewTaskForm";
import { createTask } from "@/utils/tasks";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { NewTask as NewTaskType } from "@/types/tasks";

export const NewTask = () => {
  const [formData, setFormData] = useState<NewTaskType>({
    title: "",
    description: "",
    status: 0,
    priority: 1,
    expiration_time: new Date(),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localDate = new Date(formData.expiration_time || new Date());
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
      const response = await createTask({
        ...formData,
        expiration_time: adjustedDate.toISOString(),
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
