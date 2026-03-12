import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/apis/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  const [showAll, setShowAll] = useState(false);

  if (isError) return <h1>Error occurred while fetching courses</h1>;

  const courses = data?.courses || [];
  const displayedCourses = showAll ? courses : courses.slice(0, 6);

  return (
    <div className="bg-white mt-10">
      <div className="max-w-8xl mx-auto p-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Learn from the best
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-16">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <CourseSkeleton key={index} />)
            : displayedCourses.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>

        {!isLoading && courses.length > 6 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-600 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
            >
              {showAll ? "Show Less" : "Show All Courses"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
