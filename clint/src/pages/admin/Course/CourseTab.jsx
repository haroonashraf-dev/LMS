// import RichTextEditor from '@/components/RichTextEditor';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/apis/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
// import { couch } from "globals";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch} =
    useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

    const[publishCourse, {}] = usePublishCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course; // destructure course data
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
    const [deleteCourse, {}] = useDeleteCourseMutation();
  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };
  const handleDelete = async () => {
    if (window.confirm("you want to delete this course?")) {
      try {
        await deleteCourse(courseId).unwrap();
        alert("Course deleted successfully!");
      } catch (err) {
        console.error("Failed to delete course:", err);
        alert("Failed to delete course");
      }
    }
  };
  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated ");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

 

  return (
    <Card className="max-w-4xl mx-auto px-2">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
          disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          > 
            {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button onClick={handleDelete} className="bg-black text-white">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="write your course title here.."
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="write your subtitle here.."
            />
          </div>
          <div>
            <Label>Description</Label>
            {/* <RichTextEditor  input={input} setInput={setInput}/> */}
            <textarea
              type="textarea"
              name="description"
              className="h-20 w-205 px-3 outline rounded-md"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Write your Description here.."
            />
          </div>
          <div className="flex items-center gap-5">
            {/* <div>
              <Label>Category</Label>
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="absolute z-50 bg-white shadow-lg rounded-md w-[180px]">
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="React Js">React Js</SelectItem>
                    <SelectItem value="Node Js">Node Js</SelectItem>
                    <SelectItem value="Express Js">Express Js</SelectItem>
                    <SelectItem value="PHP">PHP</SelectItem>
                    <SelectItem value="HTML/CSS">HTML/CSS</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Tailwind Css">Tailwind Css</SelectItem>
                    <SelectItem value="Bootstrap">Bootstrap</SelectItem>
                    <SelectItem value="FrontEnd">
                      FrontEnd Web Development
                    </SelectItem>
                    <SelectItem value="BackEnd">
                      Backend Web Development
                    </SelectItem>
                    <SelectItem value="FullStack">
                      FullStack Web Development
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
            <div>
              <Label>Course Level</Label>
              <Select
                defaultValue={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent className="absolute z-50 bg-white shadow-lg rounded-md w-[180px]">
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (PKR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="Rs. 0.00"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="e-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={updateCourseHandler}
              className="bg-black text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading..
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
