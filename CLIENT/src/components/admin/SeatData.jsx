import React from 'react';
// StatCard Component
const StatCard = ({ title, value, icon, color, trend }) => {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    orange: 'from-orange-600 to-orange-700',
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg hover:shadow-red-500/10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div className={`bg-gradient-to-br ${colorClasses[color]} p-2.5 rounded-lg shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        {trend && (
          <span className="text-green-400 text-sm font-medium">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;