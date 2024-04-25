import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';
import FriendsId from './Pages/FriendsId/FriendsId';
import Notification from './Pages/Notification/Notification';
import Login from './Pages/RegisterPage/Login';
import ImgBox from './Pages/Ex/Ex';
import SignUp from './Pages/RegisterPage/SignUp';
import Medi from './Pages/Medication/Medi';
import MediHome from './Pages/Medication/MediHome';
import Friend from './Pages/Friend/Friend';
import Ex from './Pages/Ex/Ex';
import DD from './Pages/Ex/DD';
import Recovered from './Pages/RegisterPage/ForgetPassword/Recovered';
import Reset from './Pages/RegisterPage/ForgetPassword/Reset';
import OTPInput from './Pages/RegisterPage/ForgetPassword/OTPInput';
import Compare from './Pages/Compare/Compare';
import NHome from './Pages/NHome/NHome';
import Caregiver from './Pages/Caregiver/Caregiver';
import EmailVerificationForm from './Pages/RegisterPage/ForgetPassword/OTPInput';
import { UserProvider } from './context/UserContext';
import Buddy from './Pages/WalkingBuddy/Buddy';
import Trip from './Pages/Trip/Trip';
import Event from './Pages/Event/Event';
import FindFriendlist from './Pages/FindFriend/FindFriendlist';
import GroupHome from './Pages/Groups/GroupHome/GroupHome';
import GroupProfile from './Pages/Groups/Profile/GroupProfile';
const App = () => {
  // Define state for friendProfile
  const [friendProfile, setFriendsProfile] = useState([]);

  return (
      <UserProvider>
        <div className='App'>
          <Routes>
            <Route path='/home' element={<Home setFriendsProfile={setFriendsProfile} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/edit/:username' element={<EditProfile />} />
            <Route path='/profile/:username' element={<Profile />} />
            {/* <Route path='/friendsId/:id' element={<FriendsId friendProfile={friendProfile} />} /> */}
            <Route path='/friendsId' element={<FriendsId friendProfile={friendProfile} />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/med' element={<Medi />} />
            <Route path='/medication' element={<MediHome />} />
            <Route path='/caregiver' element={<Caregiver />} />
            <Route path='/friend' element={<Friend />} />
            <Route path='/image' element={<ImgBox />} />
            <Route path='/ex' element={<Ex />} />
            <Route path='/forget' element={<Recovered />} />
            <Route path='/Reset' element={<Reset />} />
            <Route path='/OTP' element={<OTPInput />} />
            <Route path='/OTPP' element={<OTPInput />} />
            <Route path='/walk' element={<Buddy />} />
            <Route path='/comparebox' element={<Compare />} />
            <Route path='/compare/:username' element={<Compare />} />
            <Route path='/nhome' element={<NHome />} />
            <Route path='/findfrined' element={<FindFriendlist />} />
            <Route path='/groups' element={<GroupHome />} />
            <Route path='/group/:username' element={<GroupProfile />} />
            <Route path='/DD' element={<DD />} />
            <Route path='/event' element={<Event />} />
            <Route path='/trip' element={<Trip />} />
          </Routes>
        </div>
      </UserProvider>
  );
};
export default App;
