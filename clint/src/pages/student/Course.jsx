import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";


const Course = ({course}) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
    <Card className="w-full max-w-xs bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-3 transition-all duration-300 p-0">
      <div className="relative">
        <img
          src={course.courseThumbnail}
          alt="course"
          className="w-full h-40 object-cover rounded-t-xl "
        />
      </div>
      <CardContent className="px-2 py-3 space-y-2 ">
        <h1 className="text-sm font-semibold text-gray-800 hover:underline leading-snug line-clamp-2">
          {course.courseTitle}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
           <h1 className="text-sm font-semibold text-gray-800 hover:underline ">{course.creator?.name}</h1>
          </div>
          <Badge className="bg-blue-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full">
            {course.courseLevel}
          </Badge>
        </div>
        <div className="text-base font-bold text-indigo-600">
        Rs. {course.coursePrice}
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default Course;
