import React, { useEffect, useState } from "react";
import { Clock, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SeatLayout = () => {
  // State management for seat selection and show details
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // Date from URL params (you'll get this from useParams in actual implementation)
  const dateParam = "2025-07-24"; // Replace with actual date from params
  
  // Mock show data (replace with actual API call or props)
  const showData = {
    movie: {
      title: "Dhurandhar",
      theater: "District by Zomato",
      location: "RNS Inox 360°, Scheme Yari, Inayat Nagar, Cuttack, Odisha"
    },
    date: "Thursday, 08 Jan"
  };

  // Seat categories with pricing
  const seatCategories = [
    { name: "Royal Recliner", price: 350, rows: ["A"] },
    { name: "Royal", price: 180, rows: ["B", "C", "D", "E"] },
    { name: "Club", price: 180, rows: ["F", "G", "H", "I", "J", "K"] },
    { name: "Executive", price: 180, rows: ["L", "M"] }
  ];

  // Generate seat layout data with occupied seats
  const seatLayout = {
    A: { seats: [1, 2, 3, 4, 5, 6, 7, 8, 9], occupied: [] },
    B: { seats: [1, 2, 3, 4, 5, 6, 7], occupied: [] },
    C: { seats: [1, 2], occupied: [] },
    D: { seats: [1, 2, 3, 4, 5, 6, 7], occupied: [] },
    E: { seats: [1, 2, 3, 4, 5, 6, 7], occupied: [] },
    F: { seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], occupied: [] },
    G: { seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], occupied: [] },
    H: { seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], occupied: [] },
    I: { seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], occupied: [] },
    J: { seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], occupied: [] },
    K: { seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], occupied: [] },
    L: { seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], occupied: [] },
    M: { seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], occupied: [] }
  };

  // Format time from ISO string to readable format
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  
  // Get showtimes for the selected date from dummyDateTimeData
  // In real implementation, you'll import dummyDateTimeData and use the date from params
  const getShowtimesForDate = (date) => {
    // Mock data - replace with actual dummyDateTimeData[date]
    const mockDateTimeData = {
      "2025-07-24": [
        { "time": "2025-07-24T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd1" },
        { "time": "2025-07-24T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd2" },
        { "time": "2025-07-24T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd3" }
      ]
    };
    
    return mockDateTimeData[date] || [];
  };
  
  // Get formatted showtimes
  const showtimes = getShowtimesForDate(dateParam).map(item => ({
    time: formatTime(item.time),
    showId: item.showId,
    available: "Available"
  }));

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Handle seat selection/deselection
  const handleSeatClick = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`;
    
    // Check if seat is already occupied
    if (seatLayout[row].occupied.includes(seatNumber)) {
      return;
    }

    // Toggle seat selection
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId) // Deselect seat
        : [...prev, seatId] // Select seat
    );
  };

  // Handle show time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Calculate total price based on selected seats
  const calculateTotal = () => {
    let total = 0;
    selectedSeats.forEach((seatId) => {
      const row = seatId[0];
      const category = seatCategories.find((cat) => cat.rows.includes(row));
      if (category) {
        total += category.price;
      }
    });
    return total;
  };

  // Handle booking confirmation
  const handleProceedToPay = () => {
    if (selectedSeats.length === 0) {
      toast("Please select at least one seat");
      return;
    }
    if (!selectedTime) {
      toast("Please select a show time");
      return;
    }
    
    // Log booking details (replace with actual booking logic)
    console.log("Booking Details:", {
      movie: showData.movie.title,
      seats: selectedSeats,
      time: selectedTime,
      total: calculateTotal(),
      date: showData.date
    });

    navigate('/my-booking')
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-gray-400">Loading show details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      {/* Header Section - Movie Info */}
      {/* <div className="bg-gray-800 border-b border-gray-700 px-4 py-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{showData.movie.title}</h1>
          <p className="text-gray-400 text-sm md:text-base">
            {showData.movie.theater} | {showData.date}
          </p>
          <p className="text-gray-500 text-xs md:text-sm mt-1">
            {showData.movie.location}
          </p>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 lg:px-16 mt-20">
        {/* Show Time Selection Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-4xl font-semibold">Select Show Time</h2>
          </div>
          
          {/* Show time buttons */}
          <div className="flex flex-wrap gap-3">
            {showtimes.length > 0 ? (
              showtimes.map((showtime, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(showtime.time)}
                  className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 font-medium cursor-pointer ${
                    selectedTime === showtime.time
                      ? "bg-primary border-primary text-white"
                      : "border-gray-700 bg-black hover:border-primary hover:bg-gray-750"
                  }`}
                >
                  <div className="text-base">{showtime.time}</div>
                  <div className="text-xs text-gray-400 mt-1">{showtime.available}</div>
                </button>
              ))
            ) : (
              <p className="text-gray-400">No showtimes available for this date</p>
            )}
          </div>
        </div>

        {/* Screen Visualization Section with curved design */}
        <div className="mb-12">
          <div className="relative">
            <div className="w-full max-w-4xl mx-auto">
              {/* Curved screen representation */}
              <div className="relative">
                <svg viewBox="0 0 800 60" className="w-full h-auto mb-4" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#9ca3af', stopOpacity: 0.8}} />
                      <stop offset="100%" style={{stopColor: '#374151', stopOpacity: 0.2}} />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 50 50 Q 400 10, 750 50" 
                    stroke="url(#screenGradient)" 
                    strokeWidth="4" 
                    fill="none"
                    className="drop-shadow-lg"
                  />
                </svg>
              </div>
              <div className="text-center text-gray-400 text-sm mb-8">
                All eyes this way please!
              </div>
            </div>
          </div>
        </div>

        {/* Seat Layout Section with Legend in corner */}
        <div className="mb-12 relative">
          {/* Legend in top-right corner */}
          <div className="absolute top-0 right-0 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-700 z-10">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Legend</h3>
            </div>
            
            <div className="space-y-2">
              {/* Available seat indicator */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-800 border border-gray-600 rounded-t-lg flex-shrink-0"></div>
                <span className="text-xs text-gray-300">Available</span>
              </div>
              
              {/* Selected seat indicator */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-t-lg flex-shrink-0"></div>
                <span className="text-xs text-gray-300">Selected</span>
              </div>
              
              {/* Occupied seat indicator */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-700 opacity-50 rounded-t-lg flex-shrink-0"></div>
                <span className="text-xs text-gray-300">Occupied</span>
              </div>
            </div>
          </div>

          {/* Seat grid */}
          <div className="space-y-6 pr-0 md:pr-40">
            {/* Render seats by category */}
            {seatCategories.map((category, catIndex) => (
              <div key={catIndex}>
                {/* Category Header with price */}
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="text-sm font-semibold text-gray-300">
                    {category.name} - ₹{category.price}
                  </h3>
                </div>

                {/* Seat Rows for this category */}
                <div className="space-y-3">
                  {category.rows.map((row) => (
                    <div key={row} className="flex items-center justify-center gap-2">
                      {/* Row Label (A, B, C, etc.) */}
                      <div className="w-8 text-center font-semibold text-gray-400">
                        {row}
                      </div>

                      {/* Individual Seats with rounded tops */}
                      <div className="flex flex-wrap justify-center gap-2 flex-1 max-w-4xl">
                        {seatLayout[row]?.seats.map((seatNumber) => {
                          const seatId = `${row}${seatNumber}`;
                          const isOccupied = seatLayout[row].occupied.includes(seatNumber);
                          const isSelected = selectedSeats.includes(seatId);

                          return (
                            <button
                              key={seatNumber}
                              onClick={() => handleSeatClick(row, seatNumber)}
                              disabled={isOccupied}
                              title={isOccupied ? "Occupied" : isSelected ? "Selected" : "Available"}
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-t-xl text-xs font-medium transition-all cursor-pointer duration-200 ${
                                isOccupied
                                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                                  : isSelected
                                  ? "bg-blue-500 text-white shadow-lg scale-110"
                                  : "bg-gray-800 border border-gray-600 hover:border-blue-500 hover:scale-105"
                              }`}
                            >
                              {seatNumber}
                            </button>
                          );
                        })}
                      </div>

                      {/* Right spacer for visual symmetry */}
                      <div className="w-8"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Summary Footer - Fixed at bottom when seats selected */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 px-4 py-4 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Selection Summary - Shows selected seats and total */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              {/* Selected Seats Display */}
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">Selected Seats</p>
                <p className="font-semibold text-lg">
                  {selectedSeats.join(", ")}
                </p>
              </div>
              
              {/* Vertical divider for desktop */}
              <div className="hidden md:block w-px h-12 bg-gray-700"></div>
              
              {/* Total Amount Display */}
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="font-bold text-2xl text-primary">
                  ₹{calculateTotal()}
                </p>
              </div>
            </div>

            {/* Proceed to Payment Button */}
            <button
              onClick={handleProceedToPay}
              className="w-full md:w-auto cursor-pointer bg-primary hover:bg-primary text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-primary"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;