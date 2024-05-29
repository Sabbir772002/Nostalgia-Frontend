import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../RegisterPage/RegisterPage.css";
import { AiOutlineUser } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import validation from './Validation';
import api from '../../util/api';
const SignUp = () => {

    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false);
    const [data, setData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        walk_type: 'alone',
        gender: '',
        phone: '',
        dob: '2022-01-01',
        address: '',
        nid: '',
        thana: '',
        // p_image: '',
    });

    const handleChange = (e) => {
        const newObj = { ...data, [e.target.name]: e.target.value };
        setData(newObj);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(validation(data));
        setSubmit(true);

        try {
            const response = await axios.post(`${api.url}:8000/sign`, data);
            if (response.status === 201) {
                console.log('Registration successful!');
                navigate("/");
            }
        } catch (error) {
            console.error('Failed to register:', error.message);
        }
    };
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

  const handleEmailVerification = async () => {
    try {
      const response = await axios.post('http://your-backend-api-url/send-verification-email', {
        email: email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending verification email');
      console.error(error);
    }
  };

   
    // <div>
    //    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
    //   <button onClick={handleEmailVerification}>Send Verification Email</button>
    //   <p>{message}</p>
    // </div>
  
    return (
        <div className="container">
            <div className="container-form">
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <p>Please fill in the inputs below:</p>

                    <div className="inputBox">
                        <AiOutlineUser className='username'/>
                        <input type='text' 
                            name="username" 
                            id="username" 
                            onChange={handleChange}
                            placeholder='Username'
                        /> 
                    </div>
                    {error.username && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.username}</span>}

                    <div className="inputBox">
                        <AiOutlineUser className='first_name'/>
                        <input type='text' 
                            name="first_name" 
                            id="first_name" 
                            onChange={handleChange}
                            placeholder='First Name'
                        /> 
                    </div>
                    {error.first_name && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.first_name}</span>}

                    <div className="inputBox">
                        <AiOutlineUser className='last_name'/>
                        <input type='text' 
                            name="last_name" 
                            id="last_name" 
                            onChange={handleChange}
                            placeholder='Last Name'
                        /> 
                    </div>
                    {error.last_name && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.last_name}</span>}

                    <div className="inputBox">
                        <FiMail className='mail'/>
                        <input type="email"
                            name="email" 
                            id="email" 
                            onChange={handleChange}
                            placeholder='Email'
                        /> 
                    </div>
                    {error.email && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.email}</span>}

                    <div className="inputBox">
                        <FiMail className='address'/>
                        <input type="text"
                            name="address" 
                            id="address" 
                            onChange={handleChange}
                            placeholder='Address'
                        /> 
                    </div>
                    {error.address && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.address}</span>}

                    <div className="inputBox">
                        <FiMail className='nid'/>
                        <input type="text"
                            name="nid" 
                            id="nid" 
                            onChange={handleChange}
                            placeholder='NID'
                        /> 
                    </div>
                    {error.nid && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.nid}</span>}

                    <div className="inputBox">
                        <FiMail className='phone'/>
                        <input type="text"
                            name="phone" 
                            id="phone" 
                            onChange={handleChange}
                            placeholder='Phone'
                        /> 
                    </div>
                    {error.phone && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.phone}</span>} <div className="inputBox">
                        <FiMail className='thana'/>
                        <input type="text"
                            name="thana" 
                            id="thana" 
                            onChange={handleChange}
                            placeholder='thana'
                        /> 
                    </div>
                    {error.thana && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.thana}</span>} <div className="inputBox">
                        <FiMail className='gender'/>
                        <input type="text"
                            name="gender" 
                            id="gender" 
                            onChange={handleChange}
                            placeholder='gender'
                        /> 
                    </div>
                    {error.gender && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.gender}</span>}

                    <div className="inputBox">
                        <FiMail className='dob'/>
                        <input 
                            type="date"
                            name="dob"
                            id="dob"
                            onChange={handleChange}
                            placeholder="Date of Birth"
                        />
                    </div>
                    {error.dob && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.dob}</span>}
            
                    <div className="inputBox">
                        <RiLockPasswordLine className='password'/>
                        <input type="password" 
                            name="password" 
                            id="password" 
                            onChange={handleChange}
                            placeholder='Password'
                        />
                    </div>
                    {error.password && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.password}</span>}

                    <div className="inputBox">
                        <RiLockPasswordLine className='password'/>
                        <input type="password" 
                            name="password" 
                            id="password" 
                            onChange={handleChange}
                            placeholder='Confirm Password'
                        />
                    </div>
                    {error.password && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.password}</span>}

                    <div className='divBtn'>
                        <small className='FG'><Link to="/forget">Forgot Password?</Link></small>
                        <button className='loginBtn'>SIGN UP</button>
                    </div>
                </form>

                <div className='dont'>
                    <p>Already have an account? <Link to="/"><span>Sign in</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
