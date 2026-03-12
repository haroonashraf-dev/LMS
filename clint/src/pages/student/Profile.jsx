import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/apis/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      error,
      isError,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  // useEffect(() => {
  //   refetch();
  // }, []);
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile.");
    }
  }, [error, updateUserData, isSuccess, isError]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    updateUser(formData);
    await updateUser(formData);
  };

  if (isLoading || !data?.user) return <h1>Profile Loading...</h1>;

const user = data.user;

  return (
    <div className="max-w-4xl mx-auto my-20 px-4 md:px-0">
      <h1 className="font-bold text-2xl text-center md:text-left">
        User-Profile
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-bold text-gray-900  ">
              Name:
              <span className="font-semibold text-black ml-2">
                {user.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-bold text-gray-900  ">
              Email:
              <span className="font-semibold text-black  ml-2">
                {user.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-bold text-gray-900  ">
              Role:
              <span className="font-s text-gray-700  ml-2">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-gray-600 text-white hover:bg-gray-500  mt-2"
              >
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black shadow-lg rounded-lg">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                  className="bg-black text-white hover:bg-gray-800 active:scale-95 transition-transform duration-150"
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses
  .filter(course => course && course.isPublished) // ✅ only show valid, published courses
  .map((course) => (
    <Course course={course} key={course._id} />
  ))

          )}
        </div>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
  <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-xl shadow-lg p-6">
    <h2 className="text-xl font-semibold">Courses Enrolled</h2>
    <p className="text-3xl mt-2">{user.enrolledCourses.length}</p>
  </div>

  <div className="bg-white border rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold text-gray-700">Member Since</h2>
    <p className="text-gray-500 mt-2">
      {new Date(user.createdAt).toLocaleDateString()}
    </p>
  </div>

  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6">
    <h2 className="text-xl font-semibold">Account Type</h2>
    <p className="mt-2">{user.role.toUpperCase()}</p>
  </div>
</div>
{/* Motivational Learning Goals */}
<div className="mt-10 bg-gray-50 border rounded-xl p-6 shadow-sm">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">🎯 Learning Goals</h2>
  <ul className="list-disc pl-6 text-gray-600 space-y-2">
    <li>Complete 3 new courses this month</li>
    <li>Study consistently for at least 30 mins/day</li>
    <li>Engage in 2 discussions or peer reviews</li>
    <li>Track your progress weekly</li>
  </ul>
</div>

    </div>
  );
};

export default Profile;
