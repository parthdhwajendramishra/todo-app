import { useState, useEffect } from "react";
import MyDataTable from "@/components/MyDataTable";
import { useGetTodosQuery, useSearchTodosQuery } from "@/services/todoApi";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import "../styles/index.css"; // Import the CSS file

export default function Home() {
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showSignOut, setShowSignOut] = useState(false);
  const router = useRouter();

  console.log("Session", session);
  const tableHeaders = ["User ID", "ID", "Title", "Completed", "Actions"];

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

  // Handler for adding a new task
  const handleAddTask = () => {
    router.push("/addTask");
  };

  // Handler for page change
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome to Todo App
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Please sign in to view your todos
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 cursor-pointer flex items-center justify-center w-full"
            onClick={() => signIn("google")}
          >
            <img
              src={process.env.NEXT_PUBLIC_GOOGLE_LOGO}
              alt="Google Logo"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center flex-grow">Todo App</h1>
        <div className="relative flex items-center">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="User Image"
              className="w-10 h-10 rounded-full mr-4 cursor-pointer"
              onClick={() => setShowSignOut(!showSignOut)}
            />
          )}
          <span className="mr-4">{session.user?.name}</span>
          {showSignOut && (
            <button
              className="absolute top-12 right-0 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          )}
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 cursor-pointer"
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
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p>
          Error:{" "}
          {error && "status" in error
            ? `Status ${error.status}`
            : error?.message}
        </p>
      )}
      {isSuccess && (
        <>
          <MyDataTable
            data={debouncedSearch ? searchData ?? [] : data ?? []}
            headers={tableHeaders}
          />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageChange}
            containerClassName="pagination-container"
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={9}
            pageClassName="pagination-page"
            activeClassName="pagination-active"
            nextClassName="pagination-next"
            breakClassName="pagination-break"
            previousClassName="pagination-previous"
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </>
      )}
      {searchLoading && <p>Loading search results...</p>}
      {searchError && (
        <p>
          Error:{" "}
          {"status" in searchError
            ? `Status ${searchError.status}`
            : searchError.message}
        </p>
      )}
    </div>
  );
}
