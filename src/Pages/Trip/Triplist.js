import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Buddylist.css';
import { Tab, Tabs, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import RequestList from './Request';
import MemberList from './TripMember';
import api from '../../util/api';

const Triplist = () => {
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showInputBoxModal, setShowInputBoxModal] = useState(false);
  const [showEditBoxModal, setShowEditBoxModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [userlist, setUserlist] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api.url}:8000/trip`, {
        params: { username: userData.username }
      });
      setUserlist(response.data.trips);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowInputBoxModal(false);

    try {
      await axios.post(`${api.url}:8000/trip`, formData);
      fetchData();
      setFormData({
        trip_name: '',
        t_creator: userData.username,
        address: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        propose_date: new Date().toISOString().split('T')[0],
        privacy: 'Bondhu',
        guide: '',
        thana: 'Dhaka'
      });
    } catch (error) {
      console.error('Error sending walk data:', error);
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setShowEditBoxModal(false);
    formData.id= selectedTrip.id
    formData.type = 'Update';
    try {
      await axios.post(`${api.url}:8000/tripupdate`, formData);
      fetchData();
      setFormData({
        trip_name: '',
        t_creator: userData.username,
        address: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        propose_date: new Date().toISOString().split('T')[0],
        privacy: 'Bondhu',
        guide: '',
        thana: 'Dhaka'
      });
      
    } catch (error) {
      console.error('Error updating trip data:', error);
    }
  };
  const [formData, setFormData] = useState({
    trip_name: '',
    t_creator: userData.username,
    address: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    propose_date: new Date().toISOString().split('T')[0],
    privacy: 'Bondhu',
    creator: userData.username,
    guide: '',
    thana: 'Dhaka'
  });

  const [members, setMembers] = useState([]);
  const fetchmembers = async (user) => {
    try {
      const response = await axios.get(`${api.url}:8000/tripmembers`, {
        params: { id: user.id }
      });
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const submitrequest = async (walk) => {
    if (walk.creator === userData.username) {
      alert('You cannot request to join your own walk.');
      return;
    }
    try {
      const response = await axios.post(`${api.url}:8000/trip_request`, {
        id: walk.id,
        username: userData.username
      });
      fetchData();
      if (response.data.user === userData.username) {
        alert('You have already requested to join this walk. Please wait for the owner to accept your request.');
        return;
      }
      alert('Request sent successfully. Please wait for the owner to accept your request.');
    } catch (error) {
      alert('Some issue! Try again after some moment!.');
      console.error('Error sending request:', error);
    }
  };

  const handleUserInfoClick = (user) => {
    setSelectedUser(user);
    fetchmembers(user);
    setShowUserInfoModal(true);
  };

  const handleInputBoxButtonClick = () => {
    setShowInputBoxModal(true);
  };

  const handleEditButtonClick = (trip) => {
    setSelectedTrip(trip);
    console.log(trip);
    setFormData({
      trip_name: trip.name,
      t_creator: trip.creator,
      address: trip.location,
      start_date: trip.start_date,
      end_date: trip.end_date,
      propose_date: trip.propose_date,
      privacy: trip.privacy,
      guide: trip.guide,
      thana: trip.thana
    });
    setShowEditBoxModal(true);
  };

  const handleClose = () => {
    setShowUserInfoModal(false);
    setShowEditBoxModal(false);
  };

  return (
    <div className="vox mt-10 bg-light rounded-20px" style={{ overflowY: 'auto' }}>
      <div className="box">
        <div className="mt-3 row">
          <div className="col-6">
            <h1 className="toto">Trip List</h1>
          </div>
          <div className="col-6">
            {showInputBoxModal && (
              <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content" style={{ backgroundColor: 'white' }}>
                    <div className="modal-header">
                      <h5 className="modal-title">New Trip</h5>
                      <button type="button" className="close" aria-label="Close" onClick={() => setShowInputBoxModal(false)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="trip_name">Trip Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="trip_name"
                            name="trip_name"
                            value={formData.trip_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Destination</label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="start_date">Start Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="end_date">End Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="guide">Guide</label>
                          <input
                            type="text"
                            className="form-control"
                            id="guide"
                            name="guide"
                            value={formData.guide}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="privacy">Privacy</label>
                          <select
                            className="form-control"
                            id="privacy"
                            name="privacy"
                            value={formData.privacy}
                            onChange={handleChange}
                          >
                            <option value="Bondhu">Bondhu</option>
                            <option value="Known">Known</option>
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary mew mt-2">Save</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showEditBoxModal && (
              <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content" style={{ backgroundColor: 'white' }}>
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Trip</h5>
                      <button type="button" className="close" aria-label="Close" onClick={() => setShowEditBoxModal(false)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                          <label htmlFor="trip_name">Trip Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="trip_name"
                            name="trip_name"
                            value={formData.trip_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Destination</label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="start_date">Start Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="end_date">End Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="guide">Guide</label>
                          <input
                            type="text"
                            className="form-control"
                            id="guide"
                            name="guide"
                            value={formData.guide}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="privacy">Privacy</label>
                          <select
                            className="form-control"
                            id="privacy"
                            name="privacy"
                            value={formData.privacy}
                            onChange={handleChange}
                          >
                            <option value="Bondhu">Bondhu</option>
                            <option value="Known">Known</option>
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary mew mt-2">Save</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div style={{ textAlign: 'right' }}>
              <Button className="mew" onClick={handleInputBoxButtonClick}>Add New Trip</Button>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Date</th>
              <th>End</th>
              <th>Creator</th>
              <th>Privacy</th>
              <th>Status</th>
              <th>Actions</th>
              {/* <th>Update</th> */}
            </tr>
          </thead>
          <tbody>
            {userlist && userlist.map(user => (
              <tr key={user.id}>
                <td>{user.location}</td>
                <td>{user.start_date}</td>
                <td>{user.end_date}</td>
                <td>{user.creator}</td>
                <td>{user.privacy}</td>
                {user.creator === userData.username && (
                  <td><Button variant="primary" onClick={() => submitrequest(user)}>Owner</Button></td>
                )}
                {user.member === 1 && user.creator !== userData.username && (
                  <td><Button variant="success" onClick={() => submitrequest(user)}>Member</Button></td>
                )}
                {user.join === 1 && user.creator !== userData.username && (
                  <td><Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => submitrequest(user)}>Requested</Button></td>
                )}
                {user.member === 1 && user.cancel === 1 && (
                  <td><Button variant="gray" onClick={() => submitrequest(user)}>Canceled</Button></td>
                )}
                {user.creator !== userData.username && user.member === 0 && user.join === 0 && (
                  <td><Button variant="primary" onClick={() => submitrequest(user)}>Join</Button></td>
                )}
                <td>
                  <Button variant="info" onClick={() => handleUserInfoClick(user)}>View Info</Button>
                  {user.creator == userData.username && (
                    <Button variant="warning" onClick={() => handleEditButtonClick(user)}>Edit</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={showUserInfoModal} onHide={handleClose} dialogClassName="custom-modal">
          <div className="bg-light">
            <Modal.Header closeButton>
              <Modal.Title>User Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tabs defaultActiveKey="details">
                {userData && selectedUser && userData.username === selectedUser.creator && (
                  <Tab eventKey="request" title="Request">
                    <RequestList fmembers={fetchmembers} user={selectedUser} />
                  </Tab>
                )}
                <Tab eventKey="details" title="Details">
                  {selectedUser && (
                    <div>
                      <p><strong>Name:</strong> {selectedUser.name}</p>
                      <p><strong>Owner:</strong> {selectedUser.creator}</p>
                      <p><strong>Guide:</strong> {selectedUser.guide}</p>
                      <p><strong>Privacy:</strong> {selectedUser.privacy}</p>
                      <p><strong>Location:</strong> {selectedUser.location}</p>
                      <p><strong>Date:</strong> {selectedUser.start_date}</p>
                      <p><strong>End:</strong> {selectedUser.end_date}</p>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="members" title="Members">
                  {selectedUser && <MemberList members={members} user={selectedUser.creator} fetchmembers={fetchmembers} />}
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Triplist;
