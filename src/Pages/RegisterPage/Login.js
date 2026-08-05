import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import api from '../../util/api';
import './login.css';
// import { set } from 'mongoose';

const Login = () => {
  const setLocalStorageItem = (key, value) => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
  const getLocalStorageItem = (key) => {
    return new Promise((resolve, reject) => {
      try {
        const item = localStorage.getItem(key);
        resolve(item ? JSON.parse(item) : null);
      } catch (error) {
        reject(error);
      }
    });
  };

  async function exampleUsage(userdata) {
    try {
      await setLocalStorageItem('userData', userdata);
      console.log('Item set successfully.');
      const userData = await getLocalStorageItem('userData');
      console.log('Retrieved item:', userData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const navigate = useNavigate();
  const [error, setError] = useState({});
  const { setUserData } = useUser();
  
  const [showModal, setShowModal] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [serverOtp, setServerOtp] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    username: '',
    password: '',
    tt:''
  });
  const handleChange = (e) => {
    const newObj = { ...data, [e.target.name]: e.target.value };
    setData(newObj);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = validationLogin(data);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);
    }
    const loginPayload = { ...data, tt: deviceId };

    try {
      const response = await axios.post(`${api.url}:8001/login`, loginPayload);
      if (response.status === 200 && response.data) {
        console.log('Login successful:', response.data.user);
        setUser(response.data.user);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        await exampleUsage(response.data.user);
        if (response.data.otp) {
          setServerOtp(response.data.otp);
          setShowModal(true);
        } else {
          setUserData(response.data.user);
          if (response.data.user.username && response.data.user.username.includes("@")) {
            navigate(`/caregiver`);
          } else {
            navigate(`/home`);
          }
        }
      } else {
        setError({ username: 'Invalid Username or Password', password: 'Invalid Username or Password' });
      }
    } catch (error) {
      console.error('Failed to login:', error.message);
      setError({ username: 'Invalid Username or Password', password: 'Invalid Username or Password' });
    }
  };

  const handleOtpSubmit = () => {
    if (otpInput === serverOtp) {
      console.log('OTP matched!');
      setUserData(user);
      if (user && user.username && user.username.includes("@")) {
        navigate(`/caregiver`);
      } else {
        navigate(`/home`);
      }
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const validationLogin = (data) => {
    const error = {};
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*_=+-]{1,30}$/;

    if (!data.password || data.password === '') {
      error.password = '* Password is Required';
    } else if (!passwordPattern.test(data.password)) {
      error.password = '* Password not valid';
    }
    return error;
  };

  return (
    <div className="container_log">
      <div className="container-form">
        <form onSubmit={handleSignUp}>
          <h1>
            Login to <span className="highlight">Nos</span>talgia
          </h1>
          <p>Please sign in to continue.</p>
          <div className="inputBox">
            <FiMail className="mail" />
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          {error.username && (
            <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>
              {error.username}
            </span>
          )}

          <div className="inputBox">
            <RiLockPasswordLine className="password" />
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          {error.password && (
            <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>
              {error.password}
            </span>
          )}

          <div className="divBtn">
            <Link to="/forget" className="btn">
              <small className="FG">Forgot Password?</small>
            </Link>
            <button type="submit" className="loginBtn">
              LOGIN
            </button>
          </div>
        </form>

        <div className="dont">
          <p>
            Don't have an account? <Link to="/signup"><span>Sign up</span></Link>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter OTP</h3>
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleOtpSubmit}>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
