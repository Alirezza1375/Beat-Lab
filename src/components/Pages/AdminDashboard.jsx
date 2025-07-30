import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Music,
  ListMusic,
  FileText,
  File,
  FilePlus,
  LogOut,
  PlusSquare,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function AdminDashboard() {
  const { user, setUser, setToken } = useAuthContext();

  function logOut() {
    setToken(undefined);
    setUser(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const menuItems = [
    {
      label: "Create Beat",
      icon: <PlusSquare size={20} />,
      path: "create-beat",
    },
    { label: "Beats", icon: <ListMusic size={20} />, path: "beats" },
    { label: "Create Text", icon: <FilePlus size={20} />, path: "create-text" },
    { label: "Texts", icon: <FileText size={20} />, path: "texts" },
    { label: "Create Page", icon: <FilePlus size={20} />, path: "create-page" },
    { label: "Pages", icon: <File size={20} />, path: "pages" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div className="p-6 font-bold text-xl border-b">Admin Panel</div>

        <nav className="flex-1 p-4 space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={`/admin-dashboard/${item.path}`}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 w-full cursor-pointer"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logOut}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full cursor-pointer"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome {user?.username || "Admin"}!
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <Outlet /> {/* Nested routes will render here */}
        </div>
      </main>
    </div>
  );
}
