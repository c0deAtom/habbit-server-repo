"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any>([]); // replace 'any' with your user type if available
  

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
   
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
  
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
  
    if (res.ok) {
      alert("User deleted!");
      window.location.reload();
      // refresh data or remove from local state
    } else {
      alert("Error deleting user.");
    }
  };
  

  

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Users</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user: any) => (
          <div
            key={user.id}
            className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
          >
            <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
            <p className="text-sm text-gray-300 mb-2">{user.email}</p>
            <small className="text-xs text-gray-400">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </small>

            <button
              onClick={() => handleDelete(user.id)}
              className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
              title="Delete user"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
