import { ColumnDef } from "@tanstack/react-table";
import { Todo } from "../types/todo";

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "completed",
    header: "Completed",
    cell: ({ row }) => (row.original.completed ? "✅ Yes" : "❌ No"),
  },
];
