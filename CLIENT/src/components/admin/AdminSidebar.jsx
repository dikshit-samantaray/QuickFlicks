import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Plus, List, BookOpen } from 'lucide-react';
import { assets } from '../../assets/assets';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = {
    firstName: "Admin",
    lastName: "User",
    imgURL: assets.profile
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin'
    },
    {
      id: 'add-shows',
      label: 'Add Shows',
      icon: Plus,
      path: '/admin/add-shows'
    },
    {
      id: 'list-shows',
      label: 'List Shows',
      icon: List,
      path: '/admin/list-shows'
    },
    {
      id: 'list-booking',
      label: 'List Booking',
      icon: BookOpen,
      path: '/admin/list-booking'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-20 lg:w-64 min-h-screen pt-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-r border-gray-800 flex flex-col transition-all duration-300">
      {/* User Profile Section - Hidden on mobile */}
      <div className="p-6 border-b border-gray-800 hidden lg:block">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={user.imgURL}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-20 h-20 rounded-full border-4 border-red-500 shadow-lg shadow-red-500/30 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900"></div>
          </div>
          <h3 className="text-white font-bold text-lg">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-400 text-sm mt-1">Administrator</p>
        </div>
      </div>

      {/* Mobile Profile Icon */}
      <div className="p-4 border-b border-gray-800 lg:hidden flex justify-center">
        <div className="relative">
          <img
            src={user.imgURL}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-10 h-10 rounded-full border-2 border-red-500 shadow-lg shadow-red-500/30 object-cover"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-2 lg:px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full cursor-pointer flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 px-2 lg:px-4 py-3.5 rounded-lg transition-all duration-200 group ${
                    active
                      ? 'bg-primary text-white shadow-lg shadow-red-500/50'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  title={item.label}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      active ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                  />
                  <span className="font-medium hidden lg:block">{item.label}</span>
                  
                  {active && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse hidden lg:block"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Section - Hidden on mobile */}
      <div className="p-4 border-t border-gray-800 hidden lg:block">
        <div className="bg-gradient-to-r from-red-600/10 to-red-700/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-gray-300 text-sm font-medium mb-1">Quick Access</p>
          <p className="text-gray-500 text-xs">Manage your shows & bookings</p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;