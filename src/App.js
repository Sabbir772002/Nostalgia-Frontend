import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import Compare from './Pages/Compare/Compare';
import NHome from './Pages/NHome/NHome';
import Caregiver from './Pages/Caregiver/Caregiver';
import { UserProvider } from './context/UserContext';
import Buddy from './Pages/WalkingBuddy/Buddy';
import Trip from './Pages/Trip/Trip';
import Event from './Pages/Event/Event';
import FindFriendList from './Pages/FindFriend/FindFriendList';
import GroupHome from './Pages/Groups/GroupHome/GroupHome';
import GroupProfile from './Pages/Groups/Profile/GroupProfile';
import Chat from './Pages/Chat/ChatBox';
import SingleBlogPage from './Pages/Blog/SingleBlogPage';
const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const [friendProfile, setFriendsProfile] = useState([]);
  return (
    <UserProvider>
      <div className='App'>
        <Routes>
          <Route path='/home' element={<ProtectedRoute><Home setFriendsProfile={setFriendsProfile} /></ProtectedRoute>} />
          <Route path='/blog/:id' element={<ProtectedRoute><SingleBlogPage /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/profile/edit/:username' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path='/profile/:username' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/friendsId' element={<ProtectedRoute><FriendsId friendProfile={friendProfile} /></ProtectedRoute>} />
          <Route path='/notification' element={<ProtectedRoute><Notification /></ProtectedRoute>} />
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/med' element={<ProtectedRoute><Medi /></ProtectedRoute>} />
          <Route path='/medication' element={<ProtectedRoute><MediHome /></ProtectedRoute>} />
          <Route path='/caregiver' element={<ProtectedRoute><Caregiver /></ProtectedRoute>} />
          <Route path='/friend' element={<ProtectedRoute><Friend /></ProtectedRoute>} />
          <Route path='/image' element={<ProtectedRoute><ImgBox /></ProtectedRoute>} />
          <Route path='/ex' element={<ProtectedRoute><Ex /></ProtectedRoute>} />
          <Route path='/walk' element={<ProtectedRoute><Buddy /></ProtectedRoute>} />
          <Route path='/comparebox' element={<ProtectedRoute><Compare /></ProtectedRoute>} />
          <Route path='/compare/:username' element={<ProtectedRoute><Compare /></ProtectedRoute>} />
          <Route path='/nhome' element={<ProtectedRoute><NHome /></ProtectedRoute>} />
          <Route path='/findfrined' element={<ProtectedRoute><FindFriendList /></ProtectedRoute>} />
          <Route path='/findfriend' element={<ProtectedRoute><FindFriendList /></ProtectedRoute>} />
          <Route path='/groups' element={<ProtectedRoute><GroupHome /></ProtectedRoute>} />
          <Route path='/group/:username' element={<ProtectedRoute><GroupProfile /></ProtectedRoute>} />
          <Route path='/event' element={<ProtectedRoute><Event /></ProtectedRoute>} />
          <Route path='/trip' element={<ProtectedRoute><Trip /></ProtectedRoute>} />
          <Route path='/chat/:fnd' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path='/chat' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
