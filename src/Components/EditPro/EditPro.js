import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    gender: '',
    phone: '',
    dob: '',
    address: '',
    nid: '',
    p_image: null,
    thana: '',
  });

  useEffect(() => {
    // Fetch user data from the server when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/profile/${username}`);
      if (response.status === 200) {
        const userData ={...response.data};
        delete userData.id;
        delete userData.p_image;
       // delete userData.walk_type;
        setUser(userData);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setUser({ ...user, p_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await axios.put(`http://127.0.0.1:8000/owner/${username}`, formData);
      console.log('User data updated:', response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="mt-4 edit-profile-container">
  <div className="edit-profile-header">
    <h1>Edit Profile</h1>
  </div>
  <div className="edit-profile-form">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          name="first_name"
          value={user.first_name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          name="last_name"
          value={user.last_name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          className="form-control"
          id="gender"
          name="gender"
          value={user.gender}
          onChange={handleInputChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="walk_type">Walk Type</label>
        <select
          className="form-control"
          id="walk_type"
          name="walk_type"
          value={user.walk_type}
          onChange={handleInputChange}
        >
          <option value="Alone">Alone</option>
          <option value="Company">Company</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          className="form-control"
          id="dob"
          name="dob"
          value={user.dob}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={user.address}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="nid">NID</label>
        <input
          type="text"
          className="form-control"
          id="nid"
          name="nid"
          value={user.nid}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="thana">Thana</label>
        <input
          type="text"
          className="form-control"
          id="thana"
          name="thana"
          value={user.thana}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="p_image">Profile Image</label>
        <input
          type="file"
          className="ml-2 form-control-file"
          id="p_image"
          onChange={handleImageChange}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Save Changes
      </button>
    </form>
  </div>
</div>

  );
};

export default EditProfile;

// {'id': 17, 'username': 'Sabbir11', 'email': 'sabbir@bro.com', 'first_name': 'Sabbir', 'last_name': 'Selim', 'gender': 'male', 'phone': '0188884564', 'dob': '1990-01-01', 'address': 'Dhaka', 'nid': '001995', 'p_image': '/media/image/1.png', 'thana': 1, 'walk_type': '99'}