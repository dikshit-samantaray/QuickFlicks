import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import { Film, Calendar, Clock, DollarSign, Users, Search, TrendingUp } from 'lucide-react';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$';

  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getShows = async () => {
    try {
      // Simulating API call - Replace with actual API
      setTimeout(() => {
        setShows([
          {
            id: 1,
            movie: dummyShowsData[0],
            showDateTime: "2024-07-15T18:30:00",
            showPrice: 180,
            occupiedSeats: {
              A1: "John Doe",
              A2: "Jane Smith",
              B5: "Mike Johnson",
              C3: "Sarah Williams"
            }
          },
          {
            id: 2,
            movie: dummyShowsData[0],
            showDateTime: "2024-07-16T20:00:00",
            showPrice: 200,
            occupiedSeats: {
              A1: "David Brown",
              A3: "Emma Davis",
              B2: "Chris Wilson",
              C1: "Lisa Anderson",
              D5: "Tom Martinez"
            }
          },
          {
            id: 3,
            movie: dummyShowsData[0],
            showDateTime: "2024-07-17T15:30:00",
            showPrice: 150,
            occupiedSeats: {
              A1: "Robert Taylor",
              B2: "Jennifer White"
            }
          },
          {
            id: 4,
            movie: dummyShowsData[0],
            showDateTime: "2024-07-18T21:00:00",
            showPrice: 220,
            occupiedSeats: {
              A1: "Michael Scott",
              A2: "Pam Beesly",
              B3: "Jim Halpert",
              C4: "Dwight Schrute",
              D5: "Stanley Hudson",
              E6: "Angela Martin"
            }
          }
        ]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      fullDateTime: `${date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })} at ${date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })}`
    };
  };

  // Prepare table data
  const getTableData = () => {
    return shows.map((show) => {
      const totalBookings = Object.keys(show.occupiedSeats).length;
      const totalEarning = totalBookings * show.showPrice;
      const { fullDateTime, date, time } = formatDateTime(show.showDateTime);

      return {
        id: show.id,
        movieName: show.movie?.title || "Unknown Movie",
        moviePoster: show.movie?.poster,
        showDateTime: fullDateTime,
        showDate: date,
        showTime: time,
        totalBookings,
        totalEarning,
        pricePerSeat: show.showPrice
      };
    });
  };

  const tableData = getTableData();

  // Filter data based on search
  const filteredData = tableData.filter(row => 
    row.movieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.showDateTime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate overall stats
  const totalShows = tableData.length;
  const totalBookings = tableData.reduce((sum, row) => sum + row.totalBookings, 0);
  const totalRevenue = tableData.reduce((sum, row) => sum + row.totalEarning, 0);

  useEffect(() => {
    getShows();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Loading Header */}
          <div className="mb-8">
            <div className="h-10 bg-gray-700 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-96 animate-pulse"></div>
          </div>

          {/* Loading Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-24 mb-3"></div>
                <div className="h-8 bg-gray-700 rounded w-16"></div>
              </div>
            ))}
          </div>

          {/* Loading Table */}
          <div className="bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-700 rounded"></div>
              ))}
            </div>
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Film className="w-8 h-8 text-red-500" />
                List <span className="text-red-500">Shows</span>
              </h1>
              <p className="text-gray-400">Manage all your movie shows and performance</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all font-medium shadow-lg shadow-red-500/30 flex items-center gap-2">
              <Film className="w-5 h-5" />
              Add New Show
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Shows</p>
                <p className="text-white text-3xl font-bold">{totalShows}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Film className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
                <p className="text-white text-3xl font-bold">{totalBookings}</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                <p className="text-white text-3xl font-bold">{currency}{totalRevenue}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by movie name or show time..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Movie Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Show Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Total Bookings
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Earning
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <Film className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-lg">No shows found</p>
                      <p className="text-gray-500 text-sm mt-1">Try adjusting your search</p>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row, index) => (
                    <tr 
                      key={row.id} 
                      className="hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                            <img 
                              src={row.moviePoster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&h=100&fit=crop"} 
                              alt={row.movieName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-white font-semibold">{row.movieName}</p>
                            <p className="text-gray-500 text-sm">{currency}{row.pricePerSeat} per seat</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 text-white font-medium mb-1">
                            <Clock className="w-4 h-4 text-purple-400" />
                            {row.showTime}
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            {row.showDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Users className="w-5 h-5 text-purple-400" />
                          </div>
                          <span className="text-white font-bold text-lg">{row.totalBookings}</span>
                          <span className="text-gray-500 text-sm">seats</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-bold text-xl">
                            {currency}{row.totalEarning}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredData.length > 0 && (
            <div className="bg-gray-900/50 border-t border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between flex-wrap gap-4 text-sm">
                <span className="text-gray-400">
                  Showing <span className="text-white font-semibold">{filteredData.length}</span> show{filteredData.length !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-6">
                  <span className="text-gray-400">
                    Total Bookings: <span className="text-purple-400 font-bold">{filteredData.reduce((sum, row) => sum + row.totalBookings, 0)}</span>
                  </span>
                  <span className="text-gray-400">
                    Total Revenue: <span className="text-green-400 font-bold">{currency}{filteredData.reduce((sum, row) => sum + row.totalEarning, 0)}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListShows;