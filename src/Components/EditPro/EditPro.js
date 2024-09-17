import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams,Link,useNavigate } from 'react-router-dom';
import "../EditPro/EditPro.css"
import api from '../../util/api';
const Notification = ({ message }) => {
  return (
    <div className="notification">
      {message}
    </div>
  );
};
const EditProfile = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const { username } = useParams();
  const [processing, setProcessing] = useState(false);
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
    console.log("yo bat");
    fetchUserData();
  }, []);
  const [img, setimg] = useState(null);
  const [nid,setnid] = useState(null);
const [nidimg,setnidimg] = useState(null);  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${api.url}:8000/profile/${username}`);
      if (response.status === 200) {
        const userData ={...response.data};
        delete userData.id;
        //delete userData.p_image;
       // delete userData.walk_type;
        setUser(userData);
        console.log("demon what the helll......");
        console.log(userData);
        setimg(userData.pp ? `${api.url}:8000/${userData.pp}` : "http://bootdey.com/img/Content/avatar/avatar1.png");
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handlenidchange = (e) => {
    setnid(URL.createObjectURL(e.target.files[0]));
    setnidimg(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setimg(URL.createObjectURL(e.target.files[0]));
    //console.log(e.target.files[0]);
    setUser({ ...user, p_image: e.target.files[0] });
    console.log(user.p_image);
   // console.log(user.p_image);
  };
   const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      //console.log(user);
      const formData = new FormData();
      console.log("ye kya hai");
      console.log(user);
      Object.entries(user).forEach(([key, value]) => {
        if (key === 'p_image' && !(value instanceof File)) {
          console.log("No image provided.");
          return;
        }
        if(key == 'walk_type'){
          console.log("walk type");
          console.log(value);

        }
        formData.append(key, value);
      });
      console.log("ye kya hai, update karte time");
      console.log(formData);
     //setimg(`http://localhost:8000/${user.p_image}`);
      const response = await axios.put(`${api.url}:8000/owner/${username}`, formData);
      //console.log('User data updated:', response.data);
      setNotification('Profile updated');
      navigate(`/profile/${user.username}`);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }
  , [username]);
  const handlenid = async (e) => {
    //e.preventDefault();
    setProcessing(true); 
    try {
      //console.log(user);
      const nidv = new FormData();
      nidv.append('nid',nidimg);
      nidv.append('username',username);
      console.log(nidv.get('nid'));

  const response = await axios.post(`${api.url}:8000/nidimg`, nidv);
  if (response.status === 201) {
    setProcessing(false); // Hide processing indicator
    alert("NID verified");
    // Call fetchUserData() or do whatever you want to do next
    fetchUserData();
      }else{
        setProcessing(false);

        alert("Try with Clear Image or Correct Information");
      }
    }catch (error) {
      setProcessing(false);
      console.error('Error updating user data:', error);
      alert("Try with Clear image or Correct Information")
    }
    finally {
      setProcessing(false);
    }
  }
  return (
            <div className="container-xl px-4 mt-4">
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4">
                    <div className="card mb-4 mb-xl-0">
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                            <img className="img-account-profile rounded-circle mb-2" style={{ width: "140px", height: "200px" }} src={img} alt="" />
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            <input type="file" accept="image/*"  onChange={handleImageChange} />

                            </div>
                        </div>  
                        <div className="card mb-4 mb-xl-0 mt-2">
                         
              {user && user.verify === 1 ? (
                  <button className="btn btn-primary" type="button">Verified</button>
              ) : (
                  <div>
                      <div className="card-header">Verify Account</div>
                      <div className="card-body text-center">
                          <img className="img-account-profile rounded-circle mb-2" style={{ width: "140px", height: "200px" }} src={nid} alt="" />
                          <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                          <input type="file" accept="image/*" onChange={handlenidchange} />
                          <button className="btn btn-primary mt-2" type="button" onClick={() => handlenid('Save changes')}>Verify</button>
                      </div>
                  </div>
              )}
                  </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="username">Username </label>
                                        <input className="form-control" onChange={handleInputChange} id="username" type="text" name="username" placeholder="Enter your username" value={user.username} />
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="first_name">First name</label>
                                            <input className="form-control" onChange={handleInputChange} id="first_name" name="first_name" type="text" placeholder="Enter your first name" value={user.first_name} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="last_name">Last name</label>
                                            <input className="form-control" onChange={handleInputChange}  id="last_name" name="last_name" type="text" placeholder="Enter your last name" value={user.last_name}/>
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="gender">Gender</label>
                                            <input className="form-control" onChange={handleInputChange}  id="gender" type="text" name="gender" placeholder="Enter your organization name" value={user.gender} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="address">Address</label>
                                            <input className="form-control" onChange={handleInputChange}  id="address" name="address" type="text" placeholder="Enter your location" value={user.address} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                        <input className="form-control" onChange={handleInputChange}  id="inputEmailAddress" type="email" name="email" placeholder="Enter your email address" value={user.email} />
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                            <input className="form-control" onChange={handleInputChange}  id="inputPhone" type="tel" name="phone" placeholder="Enter your phone number" value={user.phone} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="dob">DOB</label>
                                            <input className="form-control" onChange={handleInputChange}   id="inputDOB" type="text" name="dob" placeholder="Enter your birthday" value={user.dob} />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" type="button" onClick={() => handleSubmit('Save changes')}>Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                {processing && (
        <div className="modal text-center bg-transparent fade-in" style={{ left: '48%', width: '200px' }}>
          <div className="modal-content">
            <div className="processing-circle"></div>
          </div>
        </div>
      )}
    </div>
  </div>
            
  );
};

export default EditProfile;

// {'id': 17, 'username': 'Sabbir11', 'email': 'sabbir@bro.com', 'first_name': 'Sabbir', 'last_name': 'Selim', 'gender': 'male', 'phone': '0188884564', 'dob': '1990-01-01', 'address': 'Dhaka', 'nid': '001995', 'p_image': '/media/image/1.png', 'thana': 1, 'walk_type': '99'}