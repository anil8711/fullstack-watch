// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col p-6">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/" className="text-2xl font-bold text-white">
          Admin Panel
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded"
            >
              <DashboardIcon /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded"
            >
              <PeopleIcon /> Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded"
            >
              <InventoryIcon /> Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded"
            >
              <SettingsIcon /> Settings
            </Link>
          </li>
          <li>
            <Link
              to="/admin/contact"
              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded"
            >
              <ContactMailIcon /> Contact
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
