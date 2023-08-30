import logo from './logo.svg';
import SignIn from './Pages/SignIn/SignIn';
import LogIn from './Pages/LogIn/LogIn';
import { ReactNotifications, Store } from 'react-notifications-component'

import './App.css';
import 'react-notifications-component/dist/theme.css'
import UserProfile from './Pages/User_Profile/userProfile';

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      {/* <SignIn /> */}
      {/* <LogIn /> */}

      <UserProfile />
    </div>
  );
}

export default App;
