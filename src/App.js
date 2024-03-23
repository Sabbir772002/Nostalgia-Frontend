import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import FriendsId from './Pages/FriendsId/FriendsId';
import Notification from './Pages/Notification/Notification';
import Login from './Pages/RegisterPage/Login';
import SignUp from './Pages/RegisterPage/SignUp';
import Medi from './Pages/Medication/Medi';
import { UserProvider } from './context/UserContext';

const App = () => {
  // Define state for friendProfile
  const [friendProfile, setFriendsProfile] = useState([]);

  return (
      <UserProvider>
        <div className='App'>
          <Routes>
            <Route path='/home' element={<Home setFriendsProfile={setFriendsProfile} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/friendsId' element={<FriendsId friendProfile={friendProfile} />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/medication' element={<Medi />} />
          </Routes>
        </div>
      </UserProvider>
  );
};

export default App;
