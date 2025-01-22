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
  const [submit, setSubmit] = useState(false);
  const { setUserData } = useUser();


  const [showModal, setShowModal] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [serverOtp, setServerOtp] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
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
    setError(validationLogin(data));
    setSubmit(true);
    // let tt=localStorage.getItem('token');
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem('deviceId', deviceId);
    }
    let tot=deviceId;

    console.log("this is code");
    console.log(tot);
    setData(prevState => ({
      ...prevState,
      tt: tot || ''
    }));
    try {
      const response = await axios.post(`${api.url}:8000/login`, data);
      if (response.status === 200) {
        console.log('login done!');
        console.log(response.data.otp);
        setServerOtp(response.data.otp);
        // setUserData(response.data.user);
        console.log("this is logged user");
        console.log(response.data.user);
        console.log("this is end of userdata");

        setUser(response.data.user);
        console.log(response.data.token);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        exampleUsage(response.data.user);
        setShowModal(true); 
        // setOtpInput("1234");
        // setServerOtp("1234");
        
      } else {
        console.log('Invalid Username or Password');
        setError({ ...error, username: 'Invalid Username or Password' });
        setError({ ...error, password: 'Invalid Username or Password' });

      }
    } catch (error) {
      console.error('Failed to login:', error.message);
      setError({ ...error, username: 'Invalid Username or Password' });
      setError({ ...error, password: 'Invalid Username or Password' });
    }
  };

  const handleOtpSubmit = () => {
    if (otpInput === serverOtp) {
      console.log('OTP matched!');
      setUserData(user);
      navigate(`/home`);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const validationLogin = (data) => {
    const error = {};
    const passwordPattern = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{1,12}$/g;

    if (data.password === '') {
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
