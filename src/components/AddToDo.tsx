import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddTodoMutation } from "../services/todoApi";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner"; // Import the loader component
import { TodoFormData } from "../types/todo";
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["Low", "Medium", "High"], "Priority is required"),
  assignedTo: z.string().min(1, "Assigned to is required"),
  status: z.enum(["Pending", "In Progress", "Completed"], "Status is required"),
});

const AddTodo = () => {
  const [addTodo] = useAddTodoMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to track loading status
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: TodoFormData) => {
    setLoading(true); // Set loading to true when the form is submitted
    try {
      await addTodo({
        ...data,
        completed: data.status === "Completed",
      }).unwrap();
      toast.success("Todo added successfully!");
      setTimeout(() => {
        router.push("/");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast.error("Failed to add todo.");
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading && (
        <div className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-50">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Add New Todo</h1>
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
            } text-white px-4 py-2 rounded w-full transition duration-200`}
          >
            {loading ? "Submitting..." : "Add Todo"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTodo;
