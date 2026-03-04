import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  ShoppingCart,
  Users,
  LineChart,
} from "lucide-react";
import { useGetPublishedCourseQuery } from "@/features/apis/courseApi";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Tooltip,
  LineChart as RechartsLineChart,
} from "recharts";
import { useGetPurchasedCoursesQuery } from "@/features/apis/purchaseApi";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white p-2 border border-gray-200 rounded shadow text-sm">
      <p className="text-gray-700 font-semibold">{label}</p>
      <p className="text-gray-500">₹{payload[0].value}</p>
    </div>
  );
};

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } =
    useGetPurchasedCoursesQuery();

  const [activeUsersCount, setActiveUsersCount] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user", {
          withCredentials: true,
        });
        setActiveUsersCount(res.data.length);
      } catch (error) {
        setErrorUsers("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const {
    data: coursesData,
    isLoading: loadingCourses,
    isError: errorCourses,
  } = useGetPublishedCourseQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return <h1 className="text-red-500">Failed to get purchased course</h1>;

  const { purchasedCourse } = data || {};
  const courseData =
    purchasedCourse?.map((course) => {
      if (!course?.courseId) return null;
      return {
        name: course.courseId.courseTitle,
        price: course.courseId.coursePrice,
      };
    }).filter(Boolean) || [];

  const totalRevenue =
    purchasedCourse?.reduce((acc, element) => acc + (element?.amount || 0), 0) || 0;

  const totalSales = purchasedCourse?.filter(p => p?.courseId).length || 0;

  return (
    <div className="px-6 py-8 space-y-10 my-7">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Link to="/courses" className="cursor-pointer">
          <Card className="shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active Courses
              </CardTitle>
              <LineChart className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              {loadingCourses ? (
                <p className="text-gray-400">Loading...</p>
              ) : errorCourses ? (
                <p className="text-red-500">Failed to load courses</p>
              ) : (
                <p className="text-2xl font-bold text-gray-800">
                  {coursesData?.courses?.length || 0}
                </p>
              )}
              <p className="text-xs text-gray-500">Click to view all Courses</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/users" className="cursor-pointer">
          <Card className="shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active Users
              </CardTitle>
              <Users className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              {loadingUsers ? (
                <p className="text-gray-400">Loading...</p>
              ) : errorUsers ? (
                <p className="text-red-500">{errorUsers}</p>
              ) : (
                <p className="text-2xl font-bold text-gray-800">
                  {activeUsersCount}
                </p>
              )}
              <p className="text-xs text-gray-500">Click to view Active Users</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/sales" className="cursor-pointer">
          <Card className="shadow-md hover:shadow-xl transition duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Sales
              </CardTitle>
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-800">{totalSales}</p>
              <p className="text-xs text-gray-500">Click to view all sales</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="shadow-md hover:shadow-xl transition duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-800">Rs. {totalRevenue}</p>
            <p className="text-xs text-gray-500">Total Revenue Shown Here</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Prices Chart */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Sales & Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <RechartsLineChart
              data={(() => {
                const map = new Map();
                purchasedCourse?.forEach((purchase) => {
                  const course = purchase?.courseId;
                  if (!course) return;
                  const id = course._id;
                  const name = course.courseTitle;
                  const amount = purchase.amount || 0;
                  if (map.has(id)) {
                    const existing = map.get(id);
                    existing.totalRevenue += amount;
                    existing.salesCount += 1;
                  } else {
                    map.set(id, {
                      name,
                      totalRevenue: amount,
                      salesCount: 1,
                    });
                  }
                });
                return Array.from(map.values());
              })()}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                interval={0}
                tick={({ x, y, payload }) => {
                  const label =
                    payload.value.length > 12
                      ? payload.value.slice(0, 12) + "..."
                      : payload.value;
                  return (
                    <text
                      x={x}
                      y={y + 10}
                      textAnchor="middle"
                      fill="#6b7280"
                      fontSize={10}
                    >
                      {label}
                    </text>
                  );
                }}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border border-gray-200 rounded shadow text-sm">
                      <p className="text-gray-700 font-semibold">{label}</p>
                      <p className="text-gray-500">Sales: {data.salesCount}</p>
                      <p className="text-gray-500">Revenue: Rs. {data.totalRevenue}</p>
                    </div>
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ stroke: "#10b981", strokeWidth: 2 }}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="salesCount"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ stroke: "#3b82f6", strokeWidth: 2 }}
                name="Sales"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
