import { Todo } from "@/types/todo";
import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaEllipsisH } from "react-icons/fa";
import { useRouter } from "next/router";
import { useDeleteTodoMutation } from "@/services/todoApi";
import { ToastContainer, toast } from "react-toastify";

interface DataTableProps {
  data: Todo[];
  headers: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, headers }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id).unwrap();
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the todo: ", error);
    }
  };

  const handleUpdate = (id: number) => {
    router.push(`/editTask?id=${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-3 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <td className="py-4 px-6 text-sm text-gray-700">
                  {item.userId}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">{item.id}</td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {item.title}
                </td>
                <td className="py-4 px-6 text-sm">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      item.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.completed ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                        <FaEllipsisH className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={React.Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={() => handleUpdate(item.id)}
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } block px-4 py-2 text-sm cursor-pointer`}
                              >
                                Edit
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={() => handleDelete(item.id)}
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } block px-4 py-2 text-sm`}
                              >
                                Delete
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DataTable;
