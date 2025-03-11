import { useRouter } from "next/router";
import AddTodo from "@/components/AddToDo";
import { useGetTodoByIdQuery } from "@/services/todoApi";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const { data: todo, error, isLoading } = useGetTodoByIdQuery(Number(id));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todo</p>;

  return <div>{todo && <AddTodo initialData={todo} mode="edit" />}</div>;
}
