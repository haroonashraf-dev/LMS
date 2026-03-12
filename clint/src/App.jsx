import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// import Navbar from "./components/ui/navbar";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
// import Course from "./pages/student/Course";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/Course/CourseTable";
import AddCourse from "./pages/admin/Course/AddCourse";
import EditCourse from "./pages/admin/Course/EditCourse";
import CreateLecture from "./pages/admin/Lecture/CreateLecture";
import EditLecture from "./pages/admin/Lecture/EditLecture";
import UserList from "./pages/admin/UserList";
import InstructorRoute from "./components/InstructorRoute";
import Unauthorized from "./pages/Unauthorized";
import CourseDetail from "./pages/student/CourseDetail";
import Testimonials from "./pages/Testimonials";
import Footer from "./pages/Footer";
import CourseProgress from "./pages/student/courseProgress";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import SearchPage from "./pages/student/SearchPage";
import {
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import SalesList from "./pages/admin/SalesList";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Features from "./components/Features";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
             <Features />
            <Courses />
            <Testimonials />
            <Footer />
          </>
        ),
      },
      {
    path: "about",
    element: <AboutUs />,
  },
  {
    path: "contact",
    element: <ContactUs />,
  },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },

      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            {" "}
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            {" "}
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // admin routes start from here
      {
        path: "admin",
        element: (
          <RoleProtectedRoute allowedRoles={["admin", "instructor"]}>
            <Sidebar />
          </RoleProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <RoleProtectedRoute allowedRoles={["admin", "instructor"]}>
                <Dashboard />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "course",
            element: (
              <RoleProtectedRoute allowedRoles={["admin", "instructor"]}>
                <CourseTable />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "course/create",
            element: (
              <RoleProtectedRoute allowedRoles={["admin", "instructor"]}>
                <AddCourse />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <RoleProtectedRoute allowedRoles={["admin", "instructor"]}>
                <EditCourse />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "/admin/sales",
            element: <SalesList />, // Replace with your actual component
          },

          {
            path: "course/:courseId/lecture",
            element: (
              <RoleProtectedRoute allowedRoles={["admin", "instructor"]}>
                <CreateLecture />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: (
              <RoleProtectedRoute allowedRoles={["admin", "instructor"]}>
                <EditLecture />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "users",
            element: (
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <UserList />
              </RoleProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
]);

function App() {
  return (
    <main>
      {/* <Navbar/>
           <Login/>
         <HeroSection/>
         <Courses/> */}
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
