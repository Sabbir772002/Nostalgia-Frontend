import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import { AiOutlineUser } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { FaGenderless, FaRegCalendarAlt, FaMapMarkerAlt, FaPhone, FaIdCard } from "react-icons/fa";
import api from '../../util/api';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [role, setRole] = useState('owner'); // 'owner' or 'overseer'
    const [owners, setOwners] = useState([]);
    const [p_image, setPImage] = useState(null);

    const divisions = [
        "Dhaka",
        "Rajshahi",
        "Khulna",
        "Barishal",
        "Chattogram",
        "Sylhet",
        "Mymensingh"
    ];
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    
    const [data, setData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        walk_type: 'Morning Walk',
        gender: '',
        phone: '',
        dob: '1970-01-01', // Pre-fill with older default DOB for seniors
        address: '',
        nid: '',
        thana: '',
        division: '',
        district: '',
        relation: '',
        location: '',
        target_owner: '',
        confirm_password: ''
    });

    useEffect(() => {
        // Fetch all owners to populate the Overseer's target owner list
        axios.get(`${api.url}:8001/owners`)
            .then(response => {
                setOwners(response.data);
            })
            .catch(error => console.error('Error fetching owners:', error));
    }, []);

    const findThana = (district) => {
        axios.get(`${api.url}:8001/findthana`, { params: { district } })
            .then(response => {
                setUpazilas(response.data);
            })
            .catch(error => console.error('Error:', error));
    };

    const findDistrict = (division) => {
        axios.get(`${api.url}:8001/finddistrict`, { params: { division } })
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

    const handleImageChange = (e) => {
        setPImage(e.target.files[0]);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Confirm password validation
        if (data.password !== data.confirm_password) {
            setError({ confirm_password: "Passwords do not match" });
            return;
        }

        // Age validation for Owner (must be older than 50)
        if (role === 'owner') {
            const currentDate = new Date();
            const birthDate = new Date(data.dob);
            const age = currentDate.getFullYear() - birthDate.getFullYear() -
                (currentDate.getMonth() < birthDate.getMonth() || 
                (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) ? 1 : 0);

            if (age < 50) {
                setError({ dob: "You must be older than 50 years to register as an Owner." });
                return;
            }
        }

        try {
            const formData = new FormData();
            
            // Build overseer username with @ prefix
            let finalUsername = data.username;
            if (role === 'overseer') {
                if (!data.target_owner) {
                    alert("Please select a target Owner to manage.");
                    return;
                }
                finalUsername = `${data.username}@${data.target_owner}`;
            }

            formData.append('username', finalUsername);
            formData.append('password', data.password);
            formData.append('email', data.email);
            formData.append('first_name', data.first_name);
            formData.append('last_name', data.last_name);
            formData.append('gender', data.gender);
            formData.append('phone', data.phone);
            formData.append('dob', data.dob);
            formData.append('address', data.address);
            formData.append('nid', data.nid);

            if (p_image) {
                formData.append('p_image', p_image);
            }

            let endpoint = `${api.url}:8001/sign`;

            if (role === 'owner') {
                if (!data.thana) {
                    setError({ thana: "Thana/Upazila is required for Owner accounts." });
                    return;
                }
                formData.append('thana', data.thana);
                formData.append('walk_type', data.walk_type);
            } else {
                formData.append('Location', data.location);
                formData.append('Relation', data.relation);
                endpoint = `${api.url}:8001/add_overseer`;
            }

            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                alert('Registration successful!');
                navigate("/");
            } else {
                alert('Registration failed, please verify inputs.');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                alert('An error occurred during registration.');
            }
        }
    };

    return (
        <div className="container_log">
            <div className="container-form" style={{ maxWidth: '650px' }}>
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <p>Please select a role and fill in your details:</p>

                    {/* Role Selection Switcher */}
                    <div className="inputBox d-flex justify-content-around align-items-center mb-3 p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.08)', gap: '15px' }}>
                        <span className="text-white font-weight-bold">Role:</span>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="role" id="roleOwner" value="owner" checked={role === 'owner'} onChange={() => setRole('owner')} style={{ cursor: 'pointer' }} />
                            <label className="form-check-label text-white" htmlFor="roleOwner" style={{ cursor: 'pointer' }}>Owner (Senior Citizen)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="role" id="roleOverseer" value="overseer" checked={role === 'overseer'} onChange={() => setRole('overseer')} style={{ cursor: 'pointer' }} />
                            <label className="form-check-label text-white" htmlFor="roleOverseer" style={{ cursor: 'pointer' }}>Overseer (Caregiver/Family)</label>
                        </div>
                    </div>

                    <div className="signup-grid">
                        {/* Username */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <AiOutlineUser className='username' />
                                <input className='form-control' type='text' name="username" value={data.username} onChange={handleChange} placeholder='Username' required />
                            </div>
                            {error.username && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.username}</span>}
                        </div>

                        {/* Email */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <FiMail className='mail' />
                                <input className='form-control' type="email" name="email" value={data.email} onChange={handleChange} placeholder='Email' required />
                            </div>
                            {error.email && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.email}</span>}
                        </div>

                        {/* First Name */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <AiOutlineUser className='first_name' />
                                <input className='form-control' type='text' name="first_name" value={data.first_name} onChange={handleChange} placeholder='First Name' required />
                            </div>
                            {error.first_name && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.first_name}</span>}
                        </div>

                        {/* Last Name */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <AiOutlineUser className='last_name' />
                                <input className='form-control' type='text' name="last_name" value={data.last_name} onChange={handleChange} placeholder='Last Name' required />
                            </div>
                            {error.last_name && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.last_name}</span>}
                        </div>

                        {/* Phone */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <FaPhone className='phone' />
                                <input className='form-control' type="text" name="phone" value={data.phone} onChange={handleChange} placeholder='Phone Number' required />
                            </div>
                            {error.phone && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.phone}</span>}
                        </div>

                        {/* NID */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <FaIdCard className='nid' />
                                <input className='form-control' type="text" name="nid" value={data.nid} onChange={handleChange} placeholder='NID Number' required />
                            </div>
                            {error.nid && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.nid}</span>}
                        </div>

                        {/* Gender */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <FaGenderless className='gender' />
                                <input className='form-control' type="text" name="gender" value={data.gender} onChange={handleChange} placeholder='Gender (e.g. Male, Female)' required />
                            </div>
                            {error.gender && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.gender}</span>}
                        </div>

                        {/* Date of Birth */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <FaRegCalendarAlt className='dob' />
                                <input className='form-control' type="date" name="dob" value={data.dob} onChange={handleChange} required />
                            </div>
                            {error.dob && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.dob}</span>}
                        </div>

                        {/* Address */}
                        <div className="grid-item full-width">
                            <div className="inputBox">
                                <FaMapMarkerAlt className='address' />
                                <input className='form-control' type="text" name="address" value={data.address} onChange={handleChange} placeholder='Full Street Address' required />
                            </div>
                            {error.address && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.address}</span>}
                        </div>

                        {/* Profile Image Upload */}
                        <div className="grid-item full-width">
                            <div className="inputBox">
                                <input className="form-control" type="file" accept="image/*" onChange={handleImageChange} style={{ background: 'rgba(255,255,255,0.85)' }} />
                                <span className="text-white-50 small mt-1 d-block">Upload Profile Picture (optional)</span>
                            </div>
                            {error.p_image && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.p_image}</span>}
                        </div>

                        {/* Owner Specific Fields */}
                        {role === 'owner' && (
                            <>
                                <div className="grid-item">
                                    <div className="inputBox">
                                        <select className='form-control text-dark' name="walk_type" value={data.walk_type} onChange={handleChange}>
                                            <option value="Morning Walk">Morning Walk</option>
                                            <option value="Evening Walk">Evening Walk</option>
                                            <option value="General Walk">General Walk</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid-item">
                                    <div className="inputBox">
                                        <select className='form-control text-dark' name="division" value={data.division} onChange={handleChange} required>
                                            <option value="">Select Division</option>
                                            {divisions.map((div) => (
                                                <option key={div} value={div}>{div}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {districts.length > 0 && (
                                    <div className="grid-item">
                                        <div className="inputBox">
                                            <select className='form-control text-dark' name="district" value={data.district} onChange={handleChange} required>
                                                <option value="">Select District</option>
                                                {districts.map((dist) => (
                                                    <option key={dist} value={dist}>{dist}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {upazilas.length > 0 && (
                                    <div className="grid-item">
                                        <div className="inputBox">
                                            <select className='form-control text-dark' name="thana" value={data.thana} onChange={handleChange} required>
                                                <option value="">Select Thana/Upazila</option>
                                                {upazilas.map((upz) => (
                                                    <option key={upz} value={upz}>{upz}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Overseer Specific Fields */}
                        {role === 'overseer' && (
                            <>
                                <div className="grid-item">
                                    <div className="inputBox">
                                        <input className='form-control' type='text' name="relation" value={data.relation} onChange={handleChange} placeholder='Relation (e.g. Son, Daughter, Nurse)' required />
                                    </div>
                                    {error.Relation && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.Relation}</span>}
                                </div>

                                <div className="grid-item">
                                    <div className="inputBox">
                                        <input className='form-control' type='text' name="location" value={data.location} onChange={handleChange} placeholder='Location (e.g. Dhaka)' required />
                                    </div>
                                    {error.Location && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.Location}</span>}
                                </div>

                                <div className="grid-item full-width">
                                    <div className="inputBox">
                                        <select className='form-control text-dark' name="target_owner" value={data.target_owner} onChange={handleChange} required>
                                            <option value="">Select Target Owner to Manage</option>
                                            {owners.map(o => (
                                                <option key={o.username} value={o.username}>
                                                    {o.first_name} {o.last_name} (@{o.username})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {error.target_owner && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.target_owner}</span>}
                                </div>
                            </>
                        )}

                        {/* Password */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <RiLockPasswordLine className='password' />
                                <input className='form-control' type="password" name="password" value={data.password} onChange={handleChange} placeholder='Password' required />
                            </div>
                            {error.password && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.password}</span>}
                        </div>

                        {/* Confirm Password */}
                        <div className="grid-item">
                            <div className="inputBox">
                                <RiLockPasswordLine className='password' />
                                <input className='form-control' type="password" name="confirm_password" value={data.confirm_password} onChange={handleChange} placeholder='Confirm Password' required />
                            </div>
                            {error.confirm_password && <span style={{ color: "red", fontSize: '0.85rem' }}>{error.confirm_password}</span>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='divBtn mt-4'>
                        <small className='FG'><Link to="/">Sign In instead</Link></small>
                        <button type="submit" className='loginBtn'>SIGN UP</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
