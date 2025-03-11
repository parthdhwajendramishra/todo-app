import { Todo } from "@/types/todo";

// components/TodoItem.tsx
const TodoItem = ({ todo }: { todo: Todo }) => (
  <div className="p-4 border rounded-lg shadow-sm">
    <h3 className="text-lg font-semibold">{todo.title}</h3>
    <p className="text-gray-600">{todo.completed ? "Completed" : "Pending"}</p>
  </div>
);
