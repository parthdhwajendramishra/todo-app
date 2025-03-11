import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { DataTable } from "../components/DataTable"; // Shadcn UI Data Table
import { columns } from "../components/Columns"; // Columns for the data table
import { Todo } from "../types/todo";
import MyDataTable from "@/components/MyDataTable";
import { useGetTodosQuery, useSearchTodosQuery } from "@/services/todoApi";
import ReactPaginate from "react-paginate";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, error, isLoading, isSuccess, isError } = useGetTodosQuery({
    page: currentPage,
    limit: 10,
    sortOrder: "desc",
  });

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useSearchTodosQuery(debouncedSearch, {
    skip: !debouncedSearch,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  console.log("Data", data);
  console.log("Search Data", searchData);

  // Handler for adding a new task
  const handleAddTask = () => {
    // Logic to add a new task
    console.log("Add Task button clicked");
  };

  // Handler for page change
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddTask}
      >
        Add Task
      </button>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos by title"
        className="border p-2 mb-4 w-full"
      />
      {/* <DataTable columns={columns} data={todos} /> */}
      <MyDataTable data={debouncedSearch ? searchData : data} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        containerClassName="flex space-x-2"
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={9}
        pageClassName="px-3 py-1 bg-gray-200 rounded"
        activeClassName="bg-blue-500 text-white"
        nextClassName="px-3 py-1 bg-gray-200 rounded"
        breakClassName="px-3 py-1 bg-gray-200 rounded"
        previousClassName="px-3 py-1 bg-gray-200 rounded"
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
