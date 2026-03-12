import { ChartNoAxesColumn, SquareLibrary, Users2 } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
         <div className="flex">
      <div className="hidden bg-gray-100 lg:block w-[250px] sm:w-[300px] space-y-6 border-r border-gray-300 dark:border-gray-700  p-7 sticky top-0  h-screen ">
        <div className="mt-15 space-y-3 ">
          <Link to="dashboard" className="flex items-center gap-2 font-bold hover:bg-gray-200 p-2 rounded-md transition duration-200 ease-in-out">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2 font-bold hover:bg-gray-200 p-2 rounded-md transition duration-200 ease-in-out">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
          <Link to="users" className="flex items-center gap-2 font-bold hover:bg-gray-200 p-2 rounded-md transition duration-200 ease-in-out">
            <Users2 size={22} />
            <h1>Users</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-10 ">
        <Outlet />
      </div>
    </div>
  )
}

export default Sidebar