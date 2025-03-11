// types/todo.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
}

export interface AddTodoData {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
  sample?: string;
}

export interface TodoFormData {
    id?: number;
    title: string;
    completed?: boolean;
    description: string;
    dueDate: string;
    priority: "Low" | "Medium" | "High";
    assignedTo: string;
    status: "Pending" | "In Progress" | "Completed";
  }