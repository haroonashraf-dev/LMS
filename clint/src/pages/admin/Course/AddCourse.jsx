import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/apis/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const [createCourse, { data, error, isSuccess, isLoading }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    const selectedCategory = isCustomCategory
      ? customCategory.trim()
      : category;
    if (!courseTitle.trim() || !selectedCategory) {
      toast.error("Please enter both course title and category.");
      return;
    }
    await createCourse({ courseTitle, category: selectedCategory });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course created");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, error]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-gray-50 rounded-xl shadow-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Add a New Course
        </h1>
        <p className="text-gray-600 text-sm">
          Enter basic details to get started with your course creation.
        </p>
      </div>

      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <Label className="block text-sm font-semibold mb-1 text-gray-700">
            Title
          </Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter course title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category Selection or Custom Input */}
        <div>
          <Label className="block text-sm font-semibold mb-1 text-gray-700">
            Category
          </Label>
          <div className="space-y-3">
            {!isCustomCategory ? (
              <>
                <Select onValueChange={getSelectedCategory}>
                  <SelectTrigger className="w-full max-w-sm p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-white shadow-lg rounded-lg w-full max-w-sm">
                    <SelectGroup>
                      <SelectLabel className="font-bold text-gray-700 px-3 py-1">
                        Categories
                      </SelectLabel>
                      <hr className="my-2" />
                      <SelectItem value="Javascript">Javascript</SelectItem>
                      <SelectItem value="React Js">React Js</SelectItem>
                      <SelectItem value="Node Js">Node Js</SelectItem>
                      <SelectItem value="Express Js">Express Js</SelectItem>
                      <SelectItem value="PHP">PHP</SelectItem>
                      <SelectItem value="HTML/CSS">HTML/CSS</SelectItem>
                      <SelectItem value="Bootstrap">Bootstrap</SelectItem>
                      <SelectItem value="Tailwind Css">Tailwind Css</SelectItem>
                      <SelectItem value="Next Js">Next Js</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="FrontEnd">
                        FrontEnd Web Development
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <p
                  className="text-sm text-blue-600 cursor-pointer underline"
                  onClick={() => {
                    setIsCustomCategory(true);
                    setCustomCategory(""); // Reset input
                  }}
                >
                  Can't find your category? Add custom
                </p>
              </>
            ) : (
              <>
                <Input
                  type="text"
                  placeholder="Enter custom category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full max-w-sm p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <p
                  className="text-sm text-blue-600 cursor-pointer underline"
                  onClick={() => {
                    setIsCustomCategory(false);
                    setCategory(""); // Reset selection
                  }}
                >
                  Choose from existing categories
                </p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex gap-4">
          <Button
            variant="outline"
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            onClick={() => navigate("/admin/course")}
          >
            Back
          </Button>
          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-neutral-900 transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
