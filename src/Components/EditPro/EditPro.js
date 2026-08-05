import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../EditPro/EditPro.css";
import ServerUrl, { getImageUrl } from '../../api/serverUrl';
import { FaCamera, FaSave, FaCheckCircle, FaIdCard } from 'react-icons/fa';

const EditProfile = () => {
  const navigate = useNavigate();
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
    walk_type: 'General Walk',
    relation: '',
    location: '',
    is_overseer: false,
    verify: 0,
  });

  const [img, setimg] = useState(null);
  const [nid, setnid] = useState(null);
  const [nidimg, setnidimg] = useState(null);

  const fetchUserData = useCallback(async () => {
    if (!username) return;
    try {
      const response = await axios.get(`${ServerUrl.BASE_URL}profile/${username}`);
      if (response.status === 200) {
        const userData = { ...response.data };
        delete userData.id;
        setUser(userData);
        setimg(getImageUrl(userData.pp || userData.p_image));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [username]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handlenidchange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setnid(URL.createObjectURL(e.target.files[0]));
      setnidimg(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setimg(URL.createObjectURL(e.target.files[0]));
      setUser({ ...user, p_image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        if (key === 'p_image' && !(value instanceof File)) {
          return;
        }
        if (key === 'is_overseer' || key === 'relation' || key === 'location' || key === 'verify') {
          return;
        }
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (user.is_overseer) {
        formData.append('Relation', user.relation || '');
        formData.append('Location', user.location || '');
      }

      await axios.put(`${ServerUrl.BASE_URL}owner/${username}`, formData);
      alert('Profile updated successfully!');
      navigate(`/profile/${user.username}`);
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update profile. Please verify your data.');
    }
  };

  const handlenid = async () => {
    if (!nidimg) {
      alert("Please select an NID image first.");
      return;
    }
    setProcessing(true);
    try {
      const nidv = new FormData();
      nidv.append('nid', nidimg);
      nidv.append('username', username);

      const response = await axios.post(`${ServerUrl.BASE_URL}nidimg`, nidv);
      if (response.status === 201) {
        alert("NID verified successfully!");
        fetchUserData();
      } else {
        alert("Verification failed. Please try with a clearer image.");
      }
    } catch (error) {
      console.error('Error updating NID:', error);
      alert("Verification failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="edit-profile-wrapper" style={{ padding: '30px 15px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="row g-4">
        {/* Left Column: Avatar & NID Cards */}
        <div className="col-lg-4">
          {/* Avatar Card */}
          <div className="edit-card shadow-sm p-4 text-center mb-4">
            <h5 className="card-title fw-bold mb-3">Profile Picture</h5>
            <div className="avatar-edit-container position-relative d-inline-block mb-3">
              <img
                className="img-account-profile rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: 'cover', border: '4px solid #1877f2' }}
                src={img || "https://bootdey.com/img/Content/avatar/avatar1.png"}
                alt="profile"
              />
              <label
                htmlFor="profile-upload"
                className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 cursor-pointer shadow"
                style={{ cursor: 'pointer', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <FaCamera />
              </label>
              <input id="profile-upload" className="d-none" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <p className="text-muted small">JPG or PNG allowed. Click camera icon to upload.</p>
          </div>

          {/* NID Card */}
          {!user.is_overseer && (
            <div className="edit-card shadow-sm p-4 text-center">
              <h5 className="card-title fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
                <FaIdCard className="text-primary" /> NID Verification
              </h5>
              {user.verify === 1 ? (
                <div className="alert alert-success d-flex align-items-center justify-content-center gap-2 m-0 fw-bold">
                  <FaCheckCircle /> Account Verified
                </div>
              ) : (
                <div>
                  {nid && (
                    <img
                      className="img-account-profile rounded mb-3 border"
                      style={{ width: "100%", height: "120px", objectFit: 'contain' }}
                      src={nid}
                      alt="NID preview"
                    />
                  )}
                  <p className="text-muted small mb-3">Upload clear photo of your National ID Card</p>
                  <input className="form-control mb-3" type="file" accept="image/*" onChange={handlenidchange} />
                  <button
                    className="btn btn-outline-primary w-100 fw-bold"
                    type="button"
                    disabled={processing}
                    onClick={handlenid}
                  >
                    {processing ? "Verifying..." : "Verify NID"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Account Details Form */}
        <div className="col-lg-8">
          <div className="edit-card shadow-sm p-4">
            <h4 className="fw-bold mb-4 text-primary">Account Details</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input
                  className="form-control bg-light"
                  type="text"
                  name="username"
                  value={user.username || ''}
                  readOnly
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    className="form-control"
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    value={user.first_name || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    className="form-control"
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                    value={user.last_name || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={user.gender || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Address / Thana</label>
                  <input
                    className="form-control"
                    name="thana"
                    type="text"
                    placeholder="Location / Thana"
                    value={user.thana || user.address || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={user.email || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    className="form-control"
                    type="tel"
                    name="phone"
                    placeholder="+880..."
                    value={user.phone || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Date of Birth</label>
                  <input
                    className="form-control"
                    type="date"
                    name="dob"
                    value={user.dob || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {!user.is_overseer ? (
                <div className="mb-4">
                  <label className="form-label fw-semibold">Walk Preference</label>
                  <select
                    className="form-select"
                    name="walk_type"
                    value={user.walk_type || 'General Walk'}
                    onChange={handleInputChange}
                  >
                    <option value="Morning Walk">Morning Walk</option>
                    <option value="Evening Walk">Evening Walk</option>
                    <option value="General Walk">General Walk</option>
                  </select>
                </div>
              ) : (
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Relation to Owner</label>
                    <input
                      className="form-control"
                      name="relation"
                      type="text"
                      placeholder="e.g. Son / Caregiver"
                      value={user.relation || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Overseer Location</label>
                    <input
                      className="form-control"
                      name="location"
                      type="text"
                      placeholder="Location"
                      value={user.location || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <button
                className="btn btn-primary px-4 py-2 fw-bold d-flex align-items-center gap-2 shadow-sm"
                type="submit"
                style={{ borderRadius: '10px', background: 'linear-gradient(135deg, #1877f2, #0056b3)' }}
              >
                <FaSave /> Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;