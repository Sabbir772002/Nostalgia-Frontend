import React, { useState } from 'react';
import axios from 'axios';
// import "../RegisterPage/RegisterPage.css";
import { AiOutlineUser } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { FaGenderless, FaRegCalendarAlt, FaMapMarkerAlt, FaPhone, FaIdCard } from "react-icons/fa";
import api from '../../util/api';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [divisions, setDivisions] = useState([
        "Dhaka",
        "Rajshahi",
        "Khulna",
        "Barishal",
        "Chattogram",
        "Sylhet",
        "Mymensingh"
    ]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
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
        division: '',
        district: '',
        confirm_password: ''
    });

    const findThana = (district) => {
        axios.get(`${api.url}:8000/findthana`, { params: { district } })
            .then(response => {
                setUpazilas(response.data);
            })
            .catch(error => console.error('Error:', error));
    };

    const findDistrict = (division) => {
        axios.get(`${api.url}:8000/finddistrict`, { params: { division } })
            .then(response => {
                setDistricts(response.data);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleChange = (e) => {
        setError({});
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        if (name === "division") {
            findDistrict(value);
        } else if (name === "district") {
            findThana(value);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Age validation
        const currentDate = new Date();
        const birthDate = new Date(data.dob);
        const age = currentDate.getFullYear() - birthDate.getFullYear() -
            (currentDate.getMonth() < birthDate.getMonth() || 
            (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) ? 1 : 0);

        if (age < 50) {
            setError({ dob: "You must be more than 50 years old to register." });
            return;
        }

        if (data.password !== data.confirm_password) {
            setError({ confirm_password: "Passwords do not match" });
            return;
        }

        try {
            const response = await axios.post(`${api.url}:8000/sign`, data);
            if (response.status === 201) {
                console.log('Registration successful!');
                navigate("/");
            } else if (response.status === 400) {
                setError(response.data);
            }
        } catch (error) {
            console.error('Failed to register:', error.message);
        }
    };

    return (
        <div className="container">
            <div className="container-form">
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <p>Please fill in the inputs below:</p>

                    {/* Username */}
                    <div className="inputBox">
                        <AiOutlineUser className='username' />
                        <input className='form-control' type='text'
                            name="username"
                            onChange={handleChange}
                            placeholder='Username'
                        />
                    </div>
                    {error.username && <span style={{ color: "red" }}>{error.username}</span>}

                    {/* First Name */}
                    <div className="inputBox">
                        <AiOutlineUser className='first_name' />
                        <input className='form-control' type='text'
                            name="first_name"
                            onChange={handleChange}
                            placeholder='First Name'
                        />
                    </div>
                    {error.first_name && <span style={{ color: "red" }}>{error.first_name}</span>}

                    {/* Last Name */}
                    <div className="inputBox">
                        <AiOutlineUser className='last_name' />
                        <input className='form-control' type='text'
                            name="last_name"
                            onChange={handleChange}
                            placeholder='Last Name'
                        />
                    </div>
                    {error.last_name && <span style={{ color: "red" }}>{error.last_name}</span>}

                    {/* Email */}
                    <div className="inputBox">
                        <FiMail className='mail' />
                        <input className='form-control' type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder='Email'
                        />
                    </div>
                    {error.email && <span style={{ color: "red" }}>{error.email}</span>}

                    {/* Address */}
                    <div className="inputBox">
                        <FaMapMarkerAlt className='address' />
                        <input className='form-control' type="text"
                            name="address"
                            onChange={handleChange}
                            placeholder='Address'
                        />
                    </div>
                    {error.address && <span style={{ color: "red" }}>{error.address}</span>}

                    {/* NID */}
                    <div className="inputBox">
                        <FaIdCard className='nid' />
                        <input className='form-control' type="text"
                            name="nid"
                            onChange={handleChange}
                            placeholder='NID'
                        />
                    </div>
                    {error.nid && <span style={{ color: "red" }}>{error.nid}</span>}

                    {/* Phone */}
                    <div className="inputBox">
                        <FaPhone className='phone' />
                        <input className='form-control' type="text"
                            name="phone"
                            onChange={handleChange}
                            placeholder='Phone'
                        />
                    </div>
                    {error.phone && <span style={{ color: "red" }}>{error.phone}</span>}

                    {/* Division */}
                    <div className="inputBox">
                        <select className='form-control' name="division" onChange={handleChange}>
                            <option value="">Select Division</option>
                            {divisions.map((division) => (
                                <option key={division} value={division}>
                                    {division}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error.division && <span style={{ color: "red" }}>{error.division}</span>}

                    {/* District */}
                    {districts.length > 0 && (
                        <div className="inputBox">
                            <select className='form-control' name="district" onChange={handleChange}>
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {error.district && <span style={{ color: "red" }}>{error.district}</span>}

                    {/* Thana */}
                    {upazilas.length > 0 && (
                        <div className="inputBox">
                            <select className='form-control' name="thana" onChange={handleChange}>
                                <option value="">Select Thana/Upazila</option>
                                {upazilas.map((upazila) => (
                                    <option key={upazila} value={upazila}>
                                        {upazila}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {error.thana && <span style={{ color: "red" }}>{error.thana}</span>}

                    {/* Gender */}
                    <div className="inputBox">
                        <FaGenderless className='gender' />
                        <input className='form-control' type="text"
                            name="gender"
                            onChange={handleChange}
                            placeholder='Gender'
                        />
                    </div>
                    {error.gender && <span style={{ color: "red" }}>{error.gender}</span>}

                    {/* Date of Birth */}
                    <div className="inputBox">
                        <FaRegCalendarAlt className='dob' />
                        <input className='form-control' type="date"
                            name="dob"
                            onChange={handleChange}
                        />
                    </div>
                    {error.dob && <span style={{ color: "red" }}>{error.dob}</span>}

                    {/* Password */}
                    <div className="inputBox">
                        <RiLockPasswordLine className='password' />
                        <input className='form-control' type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder='Password'
                        />
                    </div>
                    {error.password && <span style={{ color: "red" }}>{error.password}</span>}

                    {/* Confirm Password */}
                    <div className="inputBox">
                        <RiLockPasswordLine className='password' />
                        <input className='form-control' type="password"
                            name="confirm_password"
                            onChange={handleChange}
                            placeholder='Confirm Password'
                        />
                    </div>
                    {error.confirm_password && <span style={{ color: "red" }}>{error.confirm_password}</span>}

                    {/* Submit Button */}
                    <div className='divBtn'>
                        <small className='FG'><Link to="/forget">Forgot Password?</Link></small>
                        <button className='loginBtn'>SIGN UP</button>
                    </div>
                </form>

                {/* Already have an account */}
                <div className='dont'>
                    <p>Already have an account? <Link to="/"><span>Sign in</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
