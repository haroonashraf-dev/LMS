import { Menu, School, Store } from "lucide-react";
import { Button } from "./button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import DarkMode from "@/darkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/apis/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/features/authSlice";

const navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };
  console.log(user);

 const dispatch = useDispatch();

useEffect(() => {
  if (isSuccess) {
    dispatch(userLoggedOut()); // ✅ Clear Redux state
    toast.success(data.message || "Logout successfully");
    navigate("/login");
  }
}, [isSuccess]);


  return (
    <div className="h-16 bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-[60] shadow-md">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full ml-7">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl color:white">
            <Link to="/">E-Learning Hub</Link>
          </h1>
        </div>
        {/* User-icon and dark mode icon  */}
        <div className="flex items-center gap-10 mx-30">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-11 h-11  rounded-full shadow-sm">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white  border dark:border-gray-700 shadow-xl rounded-md p-2">
                <DropdownMenuLabel className="text-gray-900 dark:text-gray-300 px-2 py-1">
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuGroup>
                  <DropdownMenuItem className="rounded-md hover:bg-gray-100">
                    <Link to="edit-profile">MY Profile</Link>{" "}
                  </DropdownMenuItem>
                   <DropdownMenuItem className="rounded-md hover:bg-gray-100">
                    {" "}
                    <Link to="my-learning">My Learning</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={
                      "cursor-pointer text-red-600 rounded-md hover:bg-gray-100 mb-3"
                    }
                    onClick={logoutHandler}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {(user.role === "instructor" || user.role === "admin") && (
                  <>
                    <DropdownMenuItem className="bg-gray-700 py-2 text-white rounded-md flex justify-center items-center">
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                <Link to="/login">Login</Link>
              </Button>
              <Button>
                <Link to="/login">Signup</Link>
              </Button>
            </div>
          )}
<div className="flex items-center gap-3">
  <Link to="/about">
    <Button
      variant="ghost"
      className="text-sm font-medium text-gray-700 hover:text-blue-600"
    >
      About Us
    </Button>
  </Link>
  <Link to="/contact">
    <Button
      variant="ghost"
      className="text-sm font-medium text-gray-700 hover:text-blue-600"
    >
      Contact Us
    </Button>
  </Link>
  <Link to="/courses">
    <Button
      variant="ghost"
      className="text-sm font-medium text-gray-700 hover:text-blue-600"
    >
      All Courses
    </Button>
  </Link>
</div>

          {/* <DarkMode /> */}
        </div>
      </div>
      {/* Mobile Navbar */}

      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-bold text-2xl">E-learning Hub</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default navbar;

const MobileNavbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(userLoggedOut());
      toast.success(data.message || "Logout successfully");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>

     <SheetContent className="flex flex-col bg-white text-black shadow-lg rounded-lg p-5 space-y-6 mt-16">

        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold">E-learning Hub</SheetTitle>
          {/* <DarkMode /> */}
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 text-base font-medium">
          {user ? (
            <>
              <Link to="/edit-profile" className="hover:text-blue-600">
                My Profile
              </Link>

              <Link to="/my-learning" className="hover:text-blue-600">
                My Learning
              </Link>

              {(user.role === "instructor" || user.role === "admin") && (
                <Link to="/admin/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="text-red-600 hover:text-red-700 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>

              <Link to="/login" className="hover:text-blue-600">
                Signup
              </Link>
            </>
          )}
        </nav>

        {/* Footer Button */}
        <SheetFooter className="mt-auto">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close Menu
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

