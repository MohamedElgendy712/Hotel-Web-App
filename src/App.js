import logo from './logo.svg';
import SignIn from './Pages/SignIn/SignIn';
import LogIn from './Pages/LogIn/LogIn';
import Home from './Pages/Home/Home';
import UserProfile from './Pages/User_Profile/userProfile';
import NavBar from './Components/NavBar/Navbar';

import { ReactNotifications} from 'react-notifications-component'
import { Route, Routes } from 'react-router-dom';

import './App.css';
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      
      <NavBar />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/signin' element={<SignIn />} />
        <Route path='/login' element={<LogIn />} />

      </Routes>
    </div>
  );
}

export default App;
