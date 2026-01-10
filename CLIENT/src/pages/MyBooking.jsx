import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets"; // adjust path if needed
import { Film } from "lucide-react";
import BlurCircle from "../components/BlurCircle.jsx";

const MyBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBookings(dummyBookingData);
      setIsLoading(false);
    }, 800);
    console.log(bookings.map((b) => b));
  }, []);

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
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
    <div className="mt-32 px-4 md:px-10 min-h-screen">
      <div className="w-full relative top-14 z-10">
        <BlurCircle top="-80px" left="280px" />
        <BlurCircle top="340px" right="380px" />
      </div>
      <h1 className="text-3xl font-bold mb-8 text-white flex gap-2 items-center"><span className="text-primary text-3xl"><Film /></span> My Bookings</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-black rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-500"
          >
            {/* Movie Image */}
            <img
              src={booking.show.movie.backdrop_path}
              alt={booking.show.movie.title}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              {/* Movie Title */}
              <h2 className="text-xl font-bold text-white">
                {booking.show.movie.title}
              </h2>

              {/* Date & Time */}
              <p className="text-sm text-gray-500 mt-1">
                📅 {formatDateTime(booking.show.showDateTime)}
              </p>

              {/* Seats */}
              <p className="mt-3 text-sm text-white">
                <span className="font-semibold">Seats:</span>{" "}
                {booking.bookedSeats.join(", ")}
              </p>

              {/* Price & Status */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold text-white">
                  {currency}
                  {booking.amount}
                </p>

                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full
                  ${
                    booking.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Pending"}
                </span>
              </div>

              {/* Action */}
              {!booking.isPaid && (
                <button className="w-full mt-3 cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-slate-100 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:from-green-400 hover:to-green-500 hover:shadow-lg hover:shadow-green-500/50 active:scale-95">
                  Complete Payment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
