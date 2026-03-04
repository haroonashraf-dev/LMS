import BuyCourseButton from "@/components/BuyCourseButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/apis/purchaseApi";

import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;

  // Fetch course data
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  // Initialize state for selected lecture
  const [selectedLecture, setSelectedLecture] = useState(null);

  // This effect runs once when data is loaded
  useEffect(() => {
    if (data?.course && data.course.lectures.length > 0) {
      setSelectedLecture(data.course.lectures[0]); // Set the first lecture by default
    }
  }, [data]);

  // Loading or error states
  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !data?.course) return <h1>Failed to load course details</h1>;

  const { course } = data;

 const purchasedCourse = data?.purchased;


  // Check if the selected lecture exists and prevent rendering the video if not
  if (!selectedLecture) {
    return <h1>Select a lecture to view.</h1>;
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#2D2F31] text-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 flex flex-col gap-2 ml-14">
          <h1 className="font-bold text-2xl md:text-3xl mt-10">{course?.courseTitle}</h1>
          <p className="text-sm">
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">{course?.creator.name}</span>
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <BadgeInfo size={14} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p className="text-sm">Students Enrolled: {course?.enrolledStudents.length} </p>  
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-4 px-4 md:px-16 flex flex-col lg:flex-row justify-between gap-6">
        <div className="w-full lg:w-1/2 space-y-4 ml-6">
          <h1 className="font-bold text-xl md:text-2xl text-gray-800">Description</h1>
          <p className="text-sm text-gray-700 leading-snug whitespace-pre-line">
            {course?.description}
          </p>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Course Content</CardTitle>
              <CardDescription className="text-xs">All lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {course.lectures.map((lecture, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedLecture(lecture)} // Update selected lecture
                  className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded transition cursor-pointer"
                >
                  <span>
                    <span>
  {(lecture.isPreviewFree || purchasedCourse) ? (
    <PlayCircle size={14} />
  ) : (
    <Lock size={14} />
  )}
</span>

                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-1/3">
          <Card className="shadow-sm">
            <CardContent className="p-4 flex flex-col">
              <div className="relative w-full aspect-video mb-3 rounded overflow-hidden">
                <ReactPlayer
                  url={selectedLecture.videoUrl}
                  playing={false}
                  controls={true}
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
                {!selectedLecture.isPreviewFree && !purchasedCourse && (
  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-semibold">
    Purchase the course to unlock this lecture
  </div>
)}

              </div>

              <h1 className="text-base font-medium text-gray-800">{selectedLecture.lectureTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 mt-2">Course Price</h1>
            </CardContent>

            <CardFooter className="flex justify-center p-3">
  {purchasedCourse ? (
    <a href={`/course-progress/${courseId}`} className="w-full">
      <button className="bg-[#2D2F31] w-full text-white px-4 py-2 rounded-md cursor-pointer">
        Continue Course
      </button>
    </a>
  ) : (
    <BuyCourseButton courseId={courseId} />
  )}
</CardFooter>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
