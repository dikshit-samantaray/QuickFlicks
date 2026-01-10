import React from 'react'
import Navbar from './components/Navbar'
import Footer from "./components/Footer"
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBooking from './pages/MyBooking'
import Favorite from './pages/Favorite'
import { Toaster } from "react-hot-toast"
import Layout from './pages/admin/Layout'
import DashBoard from './pages/admin/DashBoard'
import ListBooking from './pages/admin/ListBooking'
import ListShows from './pages/admin/ListShows'
import AddShows from './pages/admin/AddShows'

const App = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      <Toaster />

      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movie />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-booking' element={<MyBooking />} />
        <Route path='/favorites' element={<Favorite />} />
        <Route path='/admin/*' element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path='list-booking' element={<ListBooking />} />
          <Route path='list-shows' element={<ListShows />} />
          <Route path='add-shows' element={<AddShows />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
