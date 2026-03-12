import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/apis/courseApi.js";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;

  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 px-6 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add Lectures to Your Course
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Fill out the title below to add a new lecture to your course.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-5 border border-gray-200">
        <div>
          <Label className="mb-1 block text-gray-700 text-sm font-medium">Lecture Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="e.g., Introduction to React"
            className="text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Back to Course
          </Button>

          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="bg-black hover:bg-gray-900 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>

      {/* Lecture List */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Existing Lectures</h2>
        <div className="space-y-4">
          {lectureLoading ? (
            <p className="text-gray-600">Loading lectures...</p>
          ) : lectureError ? (
            <p className="text-red-500">Failed to load lectures.</p>
          ) : lectureData?.lectures?.length === 0 ? (
            <p className="text-gray-500">No lectures available yet.</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
