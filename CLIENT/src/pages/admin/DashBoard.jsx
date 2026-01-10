import React, { useState, useEffect } from 'react';
import { Film, DollarSign, Users, TrendingUp, Star, Calendar, Clock } from 'lucide-react';
import StatCard from '../../components/admin/SeatData';

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - Replace with your actual backend endpoint
    const fetchDashboardData = async () => {
      try {
        // Simulating API delay
        setTimeout(() => {
          setDashboardData({
            stats: {
              totalBookings: 73,
              totalRevenue: 1060,
              activeMovies: 8,
              totalUsers: 43
            },
            movies: [
              {
                id: 1,
                title: "Alita Battle Angel 4k 2019 Movies",
                price: 29,
                rating: 4.5,
                poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
                showTime: "7:00 PM",
                bookings: 24
              },
              {
                id: 2,
                title: "Avengers: Endgame 2019 Movies",
                price: 29,
                rating: 4.5,
                poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop",
                showTime: "9:30 PM",
                bookings: 31
              },
              {
                id: 3,
                title: "Spider-Man: No Way Home 2021",
                price: 29,
                rating: 4.5,
                poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
                showTime: "6:00 PM",
                bookings: 18
              }
            ],
            recentBookings: [
              { id: 1, user: "John Doe", movie: "Alita Battle Angel", seats: 3, time: "2 hours ago" },
              { id: 2, user: "Jane Smith", movie: "Avengers: Endgame", seats: 2, time: "4 hours ago" },
              { id: 3, user: "Mike Johnson", movie: "Spider-Man", seats: 4, time: "5 hours ago" },
              { id: 4, user: "Sarah Williams", movie: "Alita Battle Angel", seats: 2, time: "6 hours ago" }
            ]
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Loading Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-700 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-48 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
                <div className="h-8 bg-gray-700 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Admin <span className="text-red-500">Dashboard</span>
          </h1>
          <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <StatCard
            title="Total Bookings"
            value={dashboardData.stats.totalBookings}
            icon={<Film className="w-6 h-6" />}
            color="blue"
            trend="+12%"
          />
          <StatCard
            title="Total Revenue"
            value={`$${dashboardData.stats.totalRevenue}`}
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
            trend="+8%"
          />
          <StatCard
            title="Active Movies"
            value={dashboardData.stats.activeMovies}
            icon={<TrendingUp className="w-6 h-6" />}
            color="purple"
            trend="+2"
          />
          <StatCard
            title="Total Users"
            value={dashboardData.stats.totalUsers}
            icon={<Users className="w-6 h-6" />}
            color="orange"
            trend="+5"
          />
        </div>

        {/* Active Movies Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-white">Active Movies</h2>
              <Film className="w-6 h-6 text-red-500" />
            </div>
            <button className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

        {/* Recent Bookings Section */}
         <div>
          <div className="flex items-center space-x-3 mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Bookings</h2>
            <Users className="w-6 h-6 text-red-500" />
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Movie
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Seats
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {dashboardData.recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold">
                            {booking.user.charAt(0)}
                          </div>
                          <span className="ml-3 text-white font-medium">{booking.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {booking.movie}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
                          {booking.seats} seats
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                        {booking.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

// MovieCard Component
const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all hover:shadow-xl hover:shadow-red-500/20 group">
      <div className="relative overflow-hidden h-64">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        
        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-white">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{movie.showTime}</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-900/80 px-2 py-1 rounded-lg backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm font-medium">{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-3 line-clamp-2 min-h-[56px]">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-500">${movie.price}</span>
          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{movie.bookings} bookings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;