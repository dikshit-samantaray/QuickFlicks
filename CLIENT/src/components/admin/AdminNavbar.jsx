import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to={'/admin'} className="shrink-0 z-50">
        <img src={assets.logo} alt="Website Logo" className="h-8 w-auto" />
      </Link>
    </nav>
  );
};

export default AdminNavbar;
