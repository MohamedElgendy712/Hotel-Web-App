import SignIn from './Pages/SignIn/SignIn';
import LogIn from './Pages/LogIn/LogIn';
import Home from './Pages/Home/homePage';
import UserProfile from './Pages/User_Profile/userProfile';
import NavBar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import ProtectRoute from './Components/ProtectRoute/protectRoute'
import ReservationPage from './Pages/Reservation Page/reservationPage';
import React, { useEffect, useState } from 'react';
import { ReactNotifications } from 'react-notifications-component'
import { Route, Routes } from 'react-router-dom';

import './App.css';
import 'react-notifications-component/dist/theme.css'
import AllReservations from './Pages/All Reservations/allReservations';
import axios from 'axios';
import { AuthProvider, useAuth } from './Components/Authorization/auth';


function App() {

  let auth = useAuth() // control user data & login & logout

  return (
    <div className="App">
      <ReactNotifications />

      <AuthProvider>

        <NavBar />

        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/signin' element={<SignIn />} />
          <Route path='/login' element={<LogIn />} />

          <Route path='/allReservations' element={<AllReservations />} />
          <Route path='/reservationPage/:id' element={<ReservationPage />} />

          <Route path='/userProfile' element={<ProtectRoute>
                                                <UserProfile />
                                              </ProtectRoute>} />
        </Routes>
      </AuthProvider>

      <Footer />
    </div>
  );
}

export default App;
