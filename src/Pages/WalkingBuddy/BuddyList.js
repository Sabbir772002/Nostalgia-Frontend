import React, { useState, useEffect, useCallback } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import RequestList from './Request';
import MemberList from './Walkmembers';
import PageHeader from '../../Components/Common/PageHeader';
import ModernDrawer from '../../Components/Common/ModernDrawer';
import api from '../../util/api';
import '../styles/ModernUI.css';

const BuddyList = () => {
  const [showUserInfoDrawer, setShowUserInfoDrawer] = useState(false);
  const [showInputBoxDrawer, setShowInputBoxDrawer] = useState(false);
  const [showEditBoxDrawer, setShowEditBoxDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userlist, setUserlist] = useState([]);
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const userData = { ...rawUser, username: activeUsername };

  const [formData, setFormData] = useState({
    walk_name: '',
    type: "Done",
    w_creator: userData.username,
    address: '',
    walk_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    time: '07:00',
    privacy: 'Bondhu'
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${api.url}:8001/walk`, {
        params: { username: userData.username }
      });
      setUserlist(response.data || []);
    } catch (error) {
      console.error('Error fetching walk list:', error);
    }
  }, [userData.username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowInputBoxDrawer(false);
    try {
      await axios.post(`${api.url}:8001/walk`, formData);
      fetchData();
      setFormData({
        walk_name: '',
        type: "Done",
        w_creator: userData.username,
        address: '',
        walk_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        time: '07:00',
        privacy: 'Bondhu'
      });
    } catch (error) {
      console.error('Error creating walk:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updateData = { ...formData, type: "Update" };
    try {
      await axios.post(`${api.url}:8001/walk`, updateData);
      fetchData();
      setShowEditBoxDrawer(false);
    } catch (error) {
      console.error('Error updating walk:', error);
    }
  };

  const formatDateString = (dateString) => {
    if (!dateString) return new Date().toISOString().split('T')[0];
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toISOString().split('T')[0];
  };

  const handleEditButtonClick = (user) => {
    setFormData({
      walk_name: user.walk_name,
      w_creator: user.w_creator,
      address: user.location,
      walk_date: formatDateString(user.date),
      end_date: formatDateString(user.end),
      time: user.time,
      privacy: user.privacy,
      id: user.id
    });
    setShowEditBoxDrawer(true);
  };

  const [members, setMembers] = useState([]);
  const fetchmembers = async (user) => {
    try {
      const response = await axios.get(`${api.url}:8001/walkmembers`, {
        params: { id: user.id }
      });
      setMembers(response.data || []);
    } catch (error) {
      console.error('Error fetching walk members:', error);
    }
  };

  const submitrequest = async (walk) => {
    if (walk.w_creator === userData.username) {
      alert("You are the organizer of this walk.");
      return;
    }
    try {
      const response = await axios.post(`${api.url}:8001/walk_request`, {
        id: walk.id,
        username: userData.username
      });
      fetchData();
      if (response.data.user === userData.username) {
        alert("Walk request already sent.");
        return;
      }
      alert("Request sent successfully!");
    } catch (error) {
      alert("Could not send request. Please try again.");
    }
  };

  const handleUserInfoClick = (user) => {
    setSelectedUser(user);
    fetchmembers(user);
    setShowUserInfoDrawer(true);
  };

  return (
    <div className="container-fluid px-3 py-2">
      <PageHeader
        title="Walking Buddy Schedules"
        subtitle="Schedule morning walks, find neighborhood companions, and keep active."
        actionButton={
          <Button className="btn-modern-primary py-2 px-4 shadow-sm" onClick={() => setShowInputBoxDrawer(true)}>
            + Schedule New Walk
          </Button>
        }
      />

      {userlist.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm my-4">
          <h5 className="text-secondary fw-semibold">No Active Walk Schedules</h5>
        </div>
      ) : (
        <div className="row g-4">
          {userlist.map((walk) => {
            const avatarUrl = walk.img ? `${api.url}:8001/${walk.img}` : `${api.url}:8001/media/image/download_lX6bjA6.jpeg`;
            return (
              <div key={walk.id} className="col-12 col-md-6 col-lg-4">
                <div className="event-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="event-meta-badge">
                        🔒 {walk.privacy}
                      </span>
                      <span className="badge bg-light text-dark border">
                        ⏰ {walk.time}
                      </span>
                    </div>

                    <h4 className="event-title mb-2">{walk.walk_name}</h4>

                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={avatarUrl}
                        alt={walk.w_creator}
                        className="rounded-circle me-2"
                        style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = `${api.url}:8001/media/image/download_lX6bjA6.jpeg`; }}
                      />
                      <div>
                        <span className="d-block fw-semibold text-dark" style={{ fontSize: '0.88rem' }}>{walk.w_creator}</span>
                        <span className="text-muted" style={{ fontSize: '0.78rem' }}>Organizer</span>
                      </div>
                    </div>

                    <div className="p-3 bg-light rounded-3 mb-3" style={{ fontSize: '0.88rem' }}>
                      <div className="mb-1 text-dark"><strong>📍 Location:</strong> {walk.location}</div>
                      <div className="mb-1 text-dark"><strong>📅 Start:</strong> {walk.date}</div>
                      <div className="text-dark"><strong>🏁 End:</strong> {walk.end}</div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    {walk.w_creator === userData.username ? (
                      <Button variant="outline-primary" className="btn-modern-outline flex-1" onClick={() => handleEditButtonClick(walk)}>
                        Edit
                      </Button>
                    ) : walk.member === 1 && walk.not_ac === 0 ? (
                      <Button variant="success" className="flex-1 font-weight-bold" disabled>
                        ✓ Member
                      </Button>
                    ) : (
                      <Button className="btn-modern-primary flex-1" onClick={() => submitrequest(walk)}>
                        + Join
                      </Button>
                    )}

                    <Button variant="info" className="btn-modern-outline flex-1" onClick={() => handleUserInfoClick(walk)}>
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Schedule Walk Drawer */}
      <ModernDrawer
        isOpen={showInputBoxDrawer}
        onClose={() => setShowInputBoxDrawer(false)}
        title="Schedule New Walk"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="walk_name">Walk Title</label>
            <input type="text" className="form-control" id="walk_name" placeholder="e.g. Ramna Park Walk" value={formData.walk_name} onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="address">Address / Meeting Point</label>
            <input type="text" className="form-control" id="address" placeholder="e.g. Gate 2" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="walk_date">Start Date</label>
              <input type="date" className="form-control" id="walk_date" value={formData.walk_date} onChange={handleChange} required />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="end_date">End Date</label>
              <input type="date" className="form-control" id="end_date" value={formData.end_date} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="time">Time</label>
              <input type="time" className="form-control" id="time" value={formData.time} onChange={handleChange} required />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="privacy">Privacy</label>
              <select className="form-select" id="privacy" value={formData.privacy} onChange={handleChange}>
                <option value="Bondhu">Bondhu</option>
                <option value="Known">Known</option>
              </select>
            </div>
          </div>
          <Button type="submit" className="btn-modern-primary w-100 py-2 mt-3">
            Save Walk Schedule
          </Button>
        </form>
      </ModernDrawer>

      {/* Edit Walk Drawer */}
      <ModernDrawer
        isOpen={showEditBoxDrawer}
        onClose={() => setShowEditBoxDrawer(false)}
        title="Edit Walk Schedule"
      >
        <form onSubmit={handleEditSubmit}>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="walk_name">Walk Title</label>
            <input type="text" className="form-control" id="walk_name" value={formData.walk_name} onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="walk_date">Start Date</label>
              <input type="date" className="form-control" id="walk_date" value={formData.walk_date} onChange={handleChange} required />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="end_date">End Date</label>
              <input type="date" className="form-control" id="end_date" value={formData.end_date} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="time">Time</label>
              <input type="time" className="form-control" id="time" value={formData.time} onChange={handleChange} required />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="privacy">Privacy</label>
              <select className="form-select" id="privacy" value={formData.privacy} onChange={handleChange}>
                <option value="Bondhu">Bondhu</option>
                <option value="Known">Known</option>
              </select>
            </div>
          </div>
          <Button type="submit" className="btn-modern-primary w-100 py-2 mt-3">
            Save Changes
          </Button>
        </form>
      </ModernDrawer>

      {/* Info & Members Drawer */}
      <ModernDrawer
        isOpen={showUserInfoDrawer}
        onClose={() => setShowUserInfoDrawer(false)}
        title="Walk Schedule Details"
      >
        <Tabs defaultActiveKey="details" className="mb-3">
          {userData && selectedUser && userData.username === selectedUser.w_creator && (
            <Tab eventKey="request" title="Requests">
              <RequestList fmembers={fetchmembers} user={selectedUser} />
            </Tab>
          )}
          <Tab eventKey="details" title="Details">
            {selectedUser && (
              <div className="p-3 bg-light rounded-3">
                <p className="mb-2"><strong>Title:</strong> {selectedUser.walk_name}</p>
                <p className="mb-2"><strong>Organizer:</strong> {selectedUser.w_creator}</p>
                <p className="mb-2"><strong>Privacy:</strong> {selectedUser.privacy}</p>
                <p className="mb-2"><strong>Meeting Location:</strong> {selectedUser.location}</p>
                <p className="mb-2"><strong>Start Date:</strong> {selectedUser.date}</p>
                <p className="mb-2"><strong>End Date:</strong> {selectedUser.end}</p>
                <p className="mb-0"><strong>Time:</strong> {selectedUser.time}</p>
              </div>
            )}
          </Tab>
          <Tab eventKey="members" title="Members">
            {selectedUser && <MemberList members={members} />}
          </Tab>
        </Tabs>
      </ModernDrawer>
    </div>
  );
};

export default BuddyList;
