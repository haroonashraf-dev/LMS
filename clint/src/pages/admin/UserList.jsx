import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user", {
          withCredentials: true,
        });
        setStudents(res.data);
      } catch (err) {
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/user/${id}`, {
        withCredentials: true,
      });
      setStudents((prev) => prev.filter((student) => student._id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setSelectedRole(user.role);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/user/${editingUserId}`,
        { role: selectedRole },
        { withCredentials: true }
      );
      setStudents((prev) =>
        prev.map((user) =>
          user._id === editingUserId ? { ...user, role: selectedRole } : user
        )
      );
      setEditingUserId(null);
      alert("User role updated successfully!");
    } catch (err) {
      alert("Failed to update role");
    }
  };

  const saveOrderToBackend = async (updatedUsers) => {
    try {
      const ids = updatedUsers.map((user) => user._id);
      console.log("🔢 Sending these IDs to backend:", ids);
     await axios.put("http://localhost:8080/api/v1/user/update-order", { ids }, { withCredentials: true });

    } catch (err) {
      console.error("Backend error:", err.response?.data || err.message);
      alert("Failed to update user order");
    }
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updatedUsers = [...students];
    [updatedUsers[index - 1], updatedUsers[index]] = [updatedUsers[index], updatedUsers[index - 1]];
    setStudents(updatedUsers);
    saveOrderToBackend(updatedUsers);
  };

  const moveDown = (index) => {
    if (index === students.length - 1) return;
    const updatedUsers = [...students];
    [updatedUsers[index + 1], updatedUsers[index]] = [updatedUsers[index], updatedUsers[index + 1]];
    setStudents(updatedUsers);
    saveOrderToBackend(updatedUsers);
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-4 p-6 bg-gray-50 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Registered Users</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-20 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((user, index) => (
            <tr
              key={user._id}
              className={`border-b border-gray-200 transition ease-in-out duration-150 ${user.role === "admin" ? "bg-green-300 text-black font-bold" : ""}`}
            >
              <td className="px-6 py-2">{user.name}</td>
              <td className="px-6 py-2">{user.email}</td>
              <td className="px-6 py-2">
                {editingUserId === user._id ? (
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                ) : (
                  <span
                    className={
                      user.role === "instructor" ? "text-green-600 font-semibold" : ""
                    }
                  >
                    {user.role}
                  </span>
                )}
              </td>
              <td className="px-6 py-2 flex gap-4 flex-wrap items-center">
                {editingUserId === user._id ? (
                  <>
                    <button
                      onClick={handleEditSave}
                      className={`py-2 px-6 rounded-lg transition duration-200 ${user.role === "admin"
                        ? "bg-green-300 text-white cursor-not-allowed"
                        : "bg-green-500 text-white"
                        }`}
                      disabled={user.role === "admin"}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUserId(null)}
                      className="bg-gray-300 text-white py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(user)}
                      className={`py-2 px-6 rounded-lg transition duration-200 ${user.role === "admin"
                        ? "bg-blue-300 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      disabled={user.role === "admin"}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className={`py-2 px-6 rounded-lg transition duration-200 ${user.role === "admin"
                        ? "bg-red-300 text-white cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      disabled={user.role === "admin"}
                    >
                      Delete
                    </button>
                  </>
                )}

                <div className="flex flex-col items-center ml-10 text-xs leading-none">
                  <button
                    onClick={() => moveUp(index)}
                    title="Move Up"
                    className="mb-1"
                  >
                    ▲
                  </button>
                  <button onClick={() => moveDown(index)} title="Move Down">
                    ▼
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
