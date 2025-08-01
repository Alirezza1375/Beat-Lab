import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Music, FileText, FilePlus, BookPlus, LogOut } from "lucide-react";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function AdminDashboard() {
  const { user, setToken, setUser } = useAuthContext();

  function logOut() {
    setToken(undefined);
    setUser(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const menuItems = [
    { label: "Create Beat", path: "create-beat", icon: <Music size={20} /> },
    { label: "Beats", path: "beats", icon: <Music size={20} /> },
    { label: "Create Text", path: "create-text", icon: <FilePlus size={20} /> },
    { label: "Texts", path: "texts", icon: <FileText size={20} /> },
    { label: "Create Page", path: "create-page", icon: <BookPlus size={20} /> },
    { label: "Pages", path: "pages", icon: <FileText size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div className="p-6 font-bold text-xl text-[#2a6496] border-b border-gray-200">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={`/admin-dashboard/${item.path}`}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-500 w-full cursor-pointer"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
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
        <h1 className="text-2xl text-[#2a6496] font-semibold mb-4">
          Welcome {user?.username || "Admin"}!
        </h1>

        {/* Remove background & padding wrapper */}
        <Outlet />
      </main>
    </div>
  );
}
