import React, { useState, useEffect, useCallback } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import RequestList from './Request';
import MemberList from './TripMember';
import PageHeader from '../../Components/Common/PageHeader';
import ModernDrawer from '../../Components/Common/ModernDrawer';
import api from '../../util/api';
import '../styles/ModernUI.css';

const Triplist = () => {
  const [showUserInfoDrawer, setShowUserInfoDrawer] = useState(false);
  const [showInputBoxDrawer, setShowInputBoxDrawer] = useState(false);
  const [showEditBoxDrawer, setShowEditBoxDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [userlist, setUserlist] = useState([]);
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const userData = { ...rawUser, username: activeUsername };

  const [formData, setFormData] = useState({
    trip_name: '',
    t_creator: userData.username,
    address: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    propose_date: new Date().toISOString().split('T')[0],
    privacy: 'Bondhu',
    creator: userData.username,
    guide: 'Local Guide',
    thana: 'Dhaka'
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${api.url}:8001/trip`, {
        params: { username: userData.username }
      });
      setUserlist(response.data.trips || []);
    } catch (error) {
      console.error('Error fetching trip list:', error);
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
      await axios.post(`${api.url}:8001/trip`, formData);
      fetchData();
      setFormData({
        trip_name: '',
        t_creator: userData.username,
        address: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        propose_date: new Date().toISOString().split('T')[0],
        privacy: 'Bondhu',
        creator: userData.username,
        guide: 'Local Guide',
        thana: 'Dhaka'
      });
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setShowEditBoxDrawer(false);
    const updatePayload = {
      ...formData,
      id: selectedTrip ? selectedTrip.id : undefined,
      type: 'Update'
    };
    try {
      await axios.post(`${api.url}:8001/tripupdate`, updatePayload);
      fetchData();
    } catch (error) {
      console.error('Error updating trip data:', error);
    }
  };

  const [members, setMembers] = useState([]);
  const fetchmembers = async (user) => {
    try {
      const response = await axios.get(`${api.url}:8001/tripmembers`, {
        params: { id: user.id }
      });
      setMembers(response.data || []);
    } catch (error) {
      console.error('Error fetching trip members:', error);
    }
  };

  const submitrequest = async (tripObj) => {
    if (tripObj.creator === userData.username) {
      alert('You are the organizer of this trip.');
      return;
    }
    try {
      await axios.post(`${api.url}:8001/trip_request`, {
        id: tripObj.id,
        username: userData.username
      });
      fetchData();
      alert('Trip join request sent successfully!');
    } catch (error) {
      alert('Could not send request. Please try again.');
    }
  };

  const handleUserInfoClick = (user) => {
    setSelectedUser(user);
    fetchmembers(user);
    setShowUserInfoDrawer(true);
  };

  const handleEditButtonClick = (trip) => {
    setSelectedTrip(trip);
    setFormData({
      trip_name: trip.name || trip.trip_name || '',
      t_creator: trip.creator,
      address: trip.location || trip.address || '',
      start_date: trip.start_date,
      end_date: trip.end_date,
      propose_date: trip.propose_date || trip.start_date,
      privacy: trip.privacy || 'Bondhu',
      creator: trip.creator,
      guide: trip.guide || '',
      thana: trip.thana || 'Dhaka'
    });
    setShowEditBoxDrawer(true);
  };

  return (
    <div className="container-fluid px-3 py-2">
      <PageHeader
        title="Group Trips & Expeditions"
        subtitle="Plan nostalgic group travel, explore new destinations, and manage itineraries."
        actionButton={
          <Button className="btn-modern-primary py-2 px-4 shadow-sm" onClick={() => setShowInputBoxDrawer(true)}>
            + Create New Trip
          </Button>
        }
      />

      {userlist.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm my-4">
          <h5 className="text-secondary fw-semibold">No Planned Trips</h5>
        </div>
      ) : (
        <div className="row g-4">
          {userlist.map((trip) => (
            <div key={trip.id} className="col-12 col-md-6 col-lg-4">
              <div className="event-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="event-meta-badge">
                      🔒 {trip.privacy}
                    </span>
                    <span className="badge bg-light text-dark border">
                      👤 {trip.creator}
                    </span>
                  </div>

                  <h4 className="event-title mb-2">{trip.name || trip.trip_name || 'Group Expedition'}</h4>

                  <div className="p-3 bg-light rounded-3 mb-3" style={{ fontSize: '0.88rem' }}>
                    <div className="mb-1 text-dark"><strong>📍 Destination:</strong> {trip.location || trip.address}</div>
                    <div className="mb-1 text-dark"><strong>🚩 Guide:</strong> {trip.guide || 'Self-guided'}</div>
                    <div className="mb-1 text-dark"><strong>📅 Start Date:</strong> {trip.start_date}</div>
                    <div className="text-dark"><strong>🏁 End Date:</strong> {trip.end_date}</div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  {trip.creator === userData.username ? (
                    <Button variant="outline-primary" className="btn-modern-outline flex-1" onClick={() => handleEditButtonClick(trip)}>
                      Edit
                    </Button>
                  ) : trip.member === 1 ? (
                    <Button variant="success" className="flex-1 font-weight-bold" disabled>
                      ✓ Member
                    </Button>
                  ) : (
                    <Button className="btn-modern-primary flex-1" onClick={() => submitrequest(trip)}>
                      + Join
                    </Button>
                  )}

                  <Button variant="info" className="btn-modern-outline flex-1" onClick={() => handleUserInfoClick(trip)}>
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Plan New Trip Drawer */}
      <ModernDrawer
        isOpen={showInputBoxDrawer}
        onClose={() => setShowInputBoxDrawer(false)}
        title="Plan New Trip"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="trip_name">Trip Name</label>
            <input type="text" className="form-control" id="trip_name" placeholder="e.g. Cox's Bazar Gateway" value={formData.trip_name} onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="address">Destination</label>
            <input type="text" className="form-control" id="address" placeholder="e.g. Saint Martin" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="start_date">Start Date</label>
              <input type="date" className="form-control" id="start_date" value={formData.start_date} onChange={handleChange} required />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="end_date">End Date</label>
              <input type="date" className="form-control" id="end_date" value={formData.end_date} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="guide">Guide</label>
              <input type="text" className="form-control" id="guide" placeholder="e.g. Tour Agency" value={formData.guide} onChange={handleChange} />
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
            Save Trip
          </Button>
        </form>
      </ModernDrawer>

      {/* Edit Trip Drawer */}
      <ModernDrawer
        isOpen={showEditBoxDrawer}
        onClose={() => setShowEditBoxDrawer(false)}
        title="Edit Trip Schedule"
      >
        <form onSubmit={handleEditSubmit}>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="trip_name">Trip Name</label>
            <input type="text" className="form-control" id="trip_name" value={formData.trip_name} onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="address">Destination</label>
            <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="start_date">Start Date</label>
              <input type="date" className="form-control" id="start_date" value={formData.start_date} onChange={handleChange} required />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="end_date">End Date</label>
              <input type="date" className="form-control" id="end_date" value={formData.end_date} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="guide">Guide</label>
              <input type="text" className="form-control" id="guide" value={formData.guide} onChange={handleChange} />
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

      {/* Info & Travelers Drawer */}
      <ModernDrawer
        isOpen={showUserInfoDrawer}
        onClose={() => setShowUserInfoDrawer(false)}
        title="Trip Information & Travelers"
      >
        <Tabs defaultActiveKey="details" className="mb-3">
          {userData && selectedUser && userData.username === selectedUser.creator && (
            <Tab eventKey="request" title="Requests">
              <RequestList fmembers={fetchmembers} user={selectedUser} />
            </Tab>
          )}
          <Tab eventKey="details" title="Details">
            {selectedUser && (
              <div className="p-3 bg-light rounded-3">
                <p className="mb-2"><strong>Trip Name:</strong> {selectedUser.name || selectedUser.trip_name}</p>
                <p className="mb-2"><strong>Organizer:</strong> {selectedUser.creator}</p>
                <p className="mb-2"><strong>Guide:</strong> {selectedUser.guide || 'N/A'}</p>
                <p className="mb-2"><strong>Privacy:</strong> {selectedUser.privacy}</p>
                <p className="mb-2"><strong>Destination:</strong> {selectedUser.location || selectedUser.address}</p>
                <p className="mb-2"><strong>Start Date:</strong> {selectedUser.start_date}</p>
                <p className="mb-0"><strong>End Date:</strong> {selectedUser.end_date}</p>
              </div>
            )}
          </Tab>
          <Tab eventKey="members" title="Travelers">
            {selectedUser && <MemberList members={members} user={selectedUser.creator} fetchmembers={fetchmembers} />}
          </Tab>
        </Tabs>
      </ModernDrawer>
    </div>
  );
};

export default Triplist;
