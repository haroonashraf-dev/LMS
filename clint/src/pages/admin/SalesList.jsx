import React from "react";
import { useGetPurchasedCoursesQuery } from "@/features/apis/purchaseApi";
import { format } from "date-fns";

const SalesList = () => {
  const { data, isLoading, isError } = useGetPurchasedCoursesQuery();

  if (isLoading) return <p className="text-center py-10 text-gray-500">Loading course sales...</p>;
  if (isError) return <p className="text-center text-red-500 py-10">Failed to load course sales.</p>;

  const { purchasedCourse } = data;

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Course Sales</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-sm text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">Courses</th>
              <th className="px-6 py-4 text-center">User ID</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {purchasedCourse.map((sale) => (
              <tr
                key={sale._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3">
                  {sale.courseId?.courseThumbnail ? (
                    <img
                      src={sale.courseId.courseThumbnail}
                      alt="Course Thumbnail"
                      className="h-12 w-20 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">{sale.userId}</td>
                <td className="px-6 py-3 font-medium text-green-600">₹{sale.amount}</td>
                <td className="px-6 py-3">
                  <span className="font-semibold capitalize text-blue-700">{sale.status}</span>
                </td>
                <td className="px-6 py-3">
                  {format(new Date(sale.createdAt), "dd MMM yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {purchasedCourse.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No course sales found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesList;
