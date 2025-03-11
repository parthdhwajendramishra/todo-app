import { Todo } from "@/types/todo";
import React from "react";

interface MyDataTableProps {
  data: Todo[];
}

const MyDataTable: React.FC<MyDataTableProps> = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Todo List</h1>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">
                User ID
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Title
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Completed
              </th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDataTable;
