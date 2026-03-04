import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/apis/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <h1 className="text-center text-lg font-semibold text-gray-700 mt-6">
        Loading...
      </h1>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gray-50 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Courses</h2>
        <Button
          onClick={() => navigate("create")}
          className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-neutral-900 transition"
        >
          + New Course
        </Button>
      </div>

      <Table className="w-full table-auto border-collapse">
        <TableCaption className="text-gray-500 mt-2">
          A list of your recent courses.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
            <TableHead className="px-6 py-4">Title</TableHead>
            <TableHead className="px-6 py-4">Price</TableHead>
            <TableHead className="px-6 py-4">Status</TableHead>

            <TableHead className="px-6 py-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((course) => (
            <TableRow
              key={course._id}
              className="border-b border-gray-200 hover:bg-gray-100 transition ease-in-out duration-150"
            >
              <TableCell className="px-6 py-4 text-gray-700">
                {course.courseTitle}
              </TableCell>
              <TableCell className="px-6 py-4 font-medium text-gray-800">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge
                  className={`py-1 px-3 text-sm rounded-md ${
                    course.isPublished
                      ? "bg-green-600 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>

              <TableCell className="px-6 py-4 text-right">
                <button
                  onClick={() => navigate(`${course._id}`)}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <Edit size={18} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
