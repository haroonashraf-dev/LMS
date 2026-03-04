import React, { useEffect } from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/apis/authApi";

const MyLearning = () => { 
   const {data, isLoading, refetch} = useLoadUserQuery();
   const myLearningCourses = (data?.user?.enrolledCourses || []).filter(
  (course) => course && course.isPublished
);
useEffect(() => {
  refetch(); // This forces fresh data after login
}, []);
 
  return (
     <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-2xl">MY LEARNING</h1>
        <span className="text-sm text-green-500  ">
          Active Courses
        </span>
      </div> <div className="mb-6">
  <div className="flex items-center gap-2">
    <h2 className="text-xl font-semibold text-gray-800">📚 Courses You're Enrolled In</h2>
    <div className="flex-1 h-px bg-gray-200"></div>
  </div>
  <p className="text-sm text-gray-500 mt-1">Continue learning from where you left off</p>
</div>


      <div className="my-5">
        {
        isLoading ? (
          <MyLearningSkeleton />
        ) : myLearningCourses.length === 0 ? (<p>You are not enrolled in any course.</p>) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myLearningCourses.map((course, index) => (
            <Course key={index} course={course}/>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
