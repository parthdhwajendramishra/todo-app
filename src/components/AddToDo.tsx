import React, { useState } from "react";
import { useAddTodoMutation } from "../services/todoApi";

const AddTodo = () => {
  const [addTodo] = useAddTodoMutation();
  const [title, setTitle] = useState("");

  const handleAddTodo = async () => {
    try {
      await addTodo({
        title,
        completed: false,
      }).unwrap();
      setTitle("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
