import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddTodoMutation, useUpdateTodoMutation } from "../services/todoApi";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { TodoFormData } from "../types/todo";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["Low", "Medium", "High"]),
  assignedTo: z.string().min(1, "Assigned to is required"),
  status: z
    .enum(["Pending", "In Progress", "Completed"])
    .refine((val) => val !== undefined, {
      message: "Status is required",
    }),
});

interface AddTodoProps {
  initialData?: TodoFormData;
  mode: "add" | "edit";
}

const AddTodo: React.FC<AddTodoProps> = ({ initialData, mode }) => {
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description);
      setValue("dueDate", initialData.dueDate);
      setValue("priority", initialData.priority);
      setValue("assignedTo", initialData.assignedTo);
      setValue("status", initialData.status);
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: TodoFormData) => {
    setLoading(true);
    try {
      if (mode === "add") {
        await addTodo({
          ...data,
          completed: data.status === "Completed",
        }).unwrap();
        toast.success("Todo added successfully!");
      } else {
        if (initialData?.id) {
          await updateTodo({
            id: initialData.id,
            ...data,
            completed: data.status === "Completed",
          }).unwrap();
          toast.success("Todo updated successfully!");
        } else {
          throw new Error("Todo ID is missing for update");
        }
      }
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error(
        `Failed to ${mode === "add" ? "add" : "update"} todo:`,
        error
      );
      toast.error(`Failed to ${mode === "add" ? "add" : "update"} todo.`);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <ClipLoader color="#00BFFF" size={80} />
        </div>
      )}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          {mode === "add" ? "Add New Todo" : "Edit Todo"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter todo title"
            className="border p-2 mb-4 w-full rounded"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <input
            type="text"
            {...register("description")}
            placeholder="Enter description"
            className="border p-2 mb-4 w-full rounded"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <input
            type="date"
            {...register("dueDate")}
            className="border p-2 mb-4 w-full rounded"
          />
          {errors.dueDate && (
            <p className="text-red-500">{errors.dueDate.message}</p>
          )}

          <select
            {...register("priority")}
            className="border p-2 mb-4 w-full rounded"
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500">{errors.priority.message}</p>
          )}

          <input
            type="text"
            {...register("assignedTo")}
            placeholder="Assigned to"
            className="border p-2 mb-4 w-full rounded"
          />
          {errors.assignedTo && (
            <p className="text-red-500">{errors.assignedTo.message}</p>
          )}

          <select
            {...register("status")}
            className="border p-2 mb-4 w-full rounded"
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500">{errors.status.message}</p>
          )}

          <button
            disabled={loading}
            type="submit"
            className={`${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded w-full transition duration-200 cursor-pointer`}
          >
            {loading
              ? "Submitting..."
              : mode === "add"
              ? "Add Todo"
              : "Update Todo"}
          </button>
        </form>
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded w-full mt-4 transition duration-200 cursor-pointer"
        >
          Back
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTodo;
