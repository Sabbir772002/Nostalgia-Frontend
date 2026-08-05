import React, { useState, useEffect, useCallback } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import RequestList from './Request';
import MemberList from './EventMember';
import PageHeader from '../../Components/Common/PageHeader';
import ModernDrawer from '../../Components/Common/ModernDrawer';
import api from '../../util/api';
import '../styles/ModernUI.css';

const Eventlist = () => {
  const [showUserInfoDrawer, setShowUserInfoDrawer] = useState(false);
  const [showInputBoxDrawer, setShowInputBoxDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userlist, setUserlist] = useState([]);
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const userData = { ...rawUser, username: activeUsername };

  const [formData, setFormData] = useState({
    title: '',
    e_creator: userData.username,
    address: '',
    start_date: new Date().toISOString().split('T')[0],
    create_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    start_time: '10:00',
    end_time: '17:00',
    Description: '',
    type: 'Social',
    privacy: 'Bondhu',
    thana: 'Dhanmondi'
  });

  const fetchData = useCallback(async () => {
    if (!userData.username) return;
    try {
      const response = await axios.get(`${api.url}:8001/event`, {
        params: { username: userData.username }
      });
      setUserlist(response.data.events || response.data || []);
    } catch (error) {
      console.error('Error fetching event list:', error);
    }
  }, [userData.username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'division') findDistrict(value);
    if (id === 'district') findThana(value);

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowInputBoxDrawer(false);
    try {
      await axios.post(`${api.url}:8001/event`, formData);
      fetchData();
      setFormData({
        title: '',
        e_creator: userData.username,
        address: '',
        start_date: new Date().toISOString().split('T')[0],
        create_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        start_time: '10:00',
        end_time: '17:00',
        Description: '',
        type: 'Social',
        privacy: 'Bondhu',
        thana: 'Dhanmondi'
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const [members, setMembers] = useState([]);
  const fetchmembers = async (user) => {
    try {
      const response = await axios.get(`${api.url}:8001/eventmembers`, {
        params: { id: user.id }
      });
      setMembers(response.data || []);
    } catch (error) {
      console.error('Error fetching event members:', error);
    }
  };

  const submitrequest = async (eventObj) => {
    if (eventObj.E_creator === userData.username) {
      alert("You are the host of this event.");
      return;
    }
    try {
      await axios.post(`${api.url}:8001/event_request`, {
        id: eventObj.id,
        username: userData.username
      });
      fetchData();
      alert("Request sent successfully!");
    } catch (error) {
      alert("Could not join event. Please try again.");
    }
  };

  const handleUserInfoClick = (user) => {
    setSelectedUser(user);
    fetchmembers(user);
    setShowUserInfoDrawer(true);
  };

  const [divisions] = useState([
    "Dhaka", "Rajshahi", "Khulna", "Barishal", "Chattogram", "Sylhet", "Mymensingh"
  ]);
  const [upazilas, setUpazilas] = useState();
  const [districts, setDistricts] = useState([]);

  const findThana = (districtName) => {
    axios.get(`${api.url}:8001/findthana`, {
      params: { district: districtName }
    }).then(res => setUpazilas(res.data)).catch(console.error);
  };

  const findDistrict = (divisionName) => {
    axios.get(`${api.url}:8001/finddistrict`, {
      params: { division: divisionName }
    }).then(res => setDistricts(res.data)).catch(console.error);
  };

  return (
    <div className="container-fluid px-3 py-2">
      <PageHeader
        title="Community Events & Gatherings"
        subtitle="Host reunions, cultural meetups, and nostalgic celebrations."
        actionButton={
          <Button className="btn-modern-primary py-2 px-4 shadow-sm" onClick={() => setShowInputBoxDrawer(true)}>
            + Create New Event
          </Button>
        }
      />

      {userlist.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm my-4">
          <h5 className="text-secondary fw-semibold">No Upcoming Events</h5>
        </div>
      ) : (
        <div className="row g-4">
          {userlist.map((eventItem) => (
            <div key={eventItem.id} className="col-12 col-md-6 col-lg-4">
              <div className="event-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="event-meta-badge">
                      🏷️ {eventItem.E_type || 'Event'}
                    </span>
                    <span className="badge bg-light text-dark border">
                      🔒 {eventItem.privacy}
                    </span>
                  </div>

                  <h4 className="event-title mb-2">{eventItem.Event_title}</h4>

                  <p className="text-muted mb-3" style={{ fontSize: '0.88rem' }}>
                    {eventItem.Description?.length > 100
                      ? `${eventItem.Description.slice(0, 100)}...`
                      : eventItem.Description || 'No description provided.'}
                  </p>

                  <div className="p-3 bg-light rounded-3 mb-3" style={{ fontSize: '0.88rem' }}>
                    <div className="mb-1 text-dark"><strong>👤 Host:</strong> {eventItem.E_creator}</div>
                    <div className="mb-1 text-dark"><strong>📍 Venue:</strong> {eventItem.Address}</div>
                    <div className="mb-1 text-dark"><strong>📅 Dates:</strong> {eventItem.start_date} to {eventItem.end_date}</div>
                    <div className="text-dark"><strong>⏰ Time:</strong> {eventItem.start_time} - {eventItem.end_time}</div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  {eventItem.E_creator === userData.username ? (
                    <Button variant="outline-primary" className="btn-modern-outline flex-1" disabled>
                      Host
                    </Button>
                  ) : eventItem.Member === 1 ? (
                    <Button variant="success" className="flex-1 font-weight-bold" disabled>
                      ✓ Attending
                    </Button>
                  ) : (
                    <Button className="btn-modern-primary flex-1" onClick={() => submitrequest(eventItem)}>
                      + Join Event
                    </Button>
                  )}

                  <Button variant="info" className="btn-modern-outline flex-1" onClick={() => handleUserInfoClick(eventItem)}>
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Event Drawer */}
      <ModernDrawer
        isOpen={showInputBoxDrawer}
        onClose={() => setShowInputBoxDrawer(false)}
        title="Create Community Event"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="title">Event Title</label>
            <input type="text" className="form-control" id="title" placeholder="e.g. Annual Reunion" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="Description">Description</label>
            <textarea className="form-control" id="Description" rows="3" placeholder="Describe the occasion..." value={formData.Description} onChange={handleChange} required />
          </div>

          <div className="row">
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="type">Type / Category</label>
              <input type="text" className="form-control" id="type" placeholder="e.g. Picnic" value={formData.type} onChange={handleChange} required />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="privacy">Privacy</label>
              <select className="form-select" id="privacy" value={formData.privacy} onChange={handleChange}>
                <option value="Bondhu">Bondhu</option>
                <option value="Known">Known</option>
              </select>
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="address">Venue Address</label>
            <input type="text" className="form-control" id="address" placeholder="e.g. Club House" value={formData.address} onChange={handleChange} required />
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
              <label className="fw-semibold mb-1" htmlFor="start_time">Start Time</label>
              <input type="time" className="form-control" id="start_time" value={formData.start_time} onChange={handleChange} required />
            </div>
            <div className="col-6 form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="end_time">End Time</label>
              <input type="time" className="form-control" id="end_time" value={formData.end_time} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold mb-1" htmlFor="division">Division</label>
            <select className="form-select" name="division" id="division" onChange={handleChange}>
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
          </div>

          {districts.length > 0 && (
            <div className="form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="district">District</label>
              <select className="form-select" name="district" id="district" onChange={handleChange}>
                <option value="">Select District</option>
                {districts.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          )}

          {upazilas && upazilas.length > 0 && (
            <div className="form-group mb-3">
              <label className="fw-semibold mb-1" htmlFor="thana">Thana / Upazila</label>
              <select className="form-select" name="thana" id="thana" onChange={handleChange}>
                <option value="">Select Thana</option>
                {upazilas.map((thanaItem) => (
                  <option key={thanaItem} value={thanaItem}>{thanaItem}</option>
                ))}
              </select>
            </div>
          )}

          <Button type="submit" className="btn-modern-primary w-100 py-2 mt-3">
            Publish Event
          </Button>
        </form>
      </ModernDrawer>

      {/* Info & Attendees Drawer */}
      <ModernDrawer
        isOpen={showUserInfoDrawer}
        onClose={() => setShowUserInfoDrawer(false)}
        title="Event Details & Attendees"
      >
        <Tabs defaultActiveKey="details" className="mb-3">
          {userData && selectedUser && userData.username === selectedUser.E_creator && (
            <Tab eventKey="request" title="Requests">
              <RequestList fmembers={fetchmembers} user={selectedUser} />
            </Tab>
          )}
          <Tab eventKey="details" title="Details">
            {selectedUser && (
              <div className="p-3 bg-light rounded-3">
                <p className="mb-2"><strong>Title:</strong> {selectedUser.Event_title}</p>
                <p className="mb-2"><strong>Host:</strong> {selectedUser.E_creator}</p>
                <p className="mb-2"><strong>Type:</strong> {selectedUser.E_type}</p>
                <p className="mb-2"><strong>Address:</strong> {selectedUser.Address}</p>
                <p className="mb-2"><strong>Description:</strong> {selectedUser.Description}</p>
                <p className="mb-2"><strong>Start Date:</strong> {selectedUser.start_date}</p>
                <p className="mb-2"><strong>End Date:</strong> {selectedUser.end_date}</p>
                <p className="mb-0"><strong>Time:</strong> {selectedUser.start_time} - {selectedUser.end_time}</p>
              </div>
            )}
          </Tab>
          <Tab eventKey="members" title="Attendees">
            {selectedUser && <MemberList members={members} />}
          </Tab>
        </Tabs>
      </ModernDrawer>
    </div>
  );
};

export default Eventlist;
