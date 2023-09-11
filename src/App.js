import SignIn from './Pages/SignIn/SignIn';
import LogIn from './Pages/LogIn/LogIn';
import Home from './Pages/Home/homePage';
import UserProfile from './Pages/User_Profile/userProfile';
import NavBar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import ReservationPage from './Pages/Reservation Page/reservationPage';
import React, { useState } from 'react';
import { ReactNotifications } from 'react-notifications-component'
import { Route, Routes } from 'react-router-dom';

import './App.css';
import 'react-notifications-component/dist/theme.css'


export const userContext = React.createContext()

function App() {
  const [user, setUser] = useState(null)

  const setUserData = (user) => {
    setUser(user)
  }

  return (
    <div className="App">
      <ReactNotifications />

      <userContext.Provider value={user} >

        <NavBar />

        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/signin' element={<SignIn />} />
          <Route path='/login' element={<LogIn setUserData={setUserData} />} />

          <Route path='/reservationPage/:id' element={<ReservationPage />} />

          <Route path='/userProfile' element={<UserProfile />} />
        </Routes>

      </userContext.Provider>

      <Footer />
    </div>
  );
}

export default App;
