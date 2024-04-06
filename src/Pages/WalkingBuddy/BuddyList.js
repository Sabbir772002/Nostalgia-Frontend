import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Buddylist.css';
import { Tab, Tabs, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import RequestList from './Request';
import MemberList from './Walkmembers';

const BuddyList = () => {
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showInputBoxModal, setShowInputBoxModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userlist, setUserlist] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/walk', {
        params: { username: userData.username }
      });
      setUserlist(response.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value; // By default, use the selected value

    // If the id is "privacy", you can map the value to "Bondhu" or "Known"
    if (id === 'privacy') {
      newValue = value === 'Bondhu' ? 'Bondhu' : 'Known';
      console.log("yo");
      console.log(newValue);
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowInputBoxModal(false);
    delete formData.time;

    try {
      await axios.post('http://localhost:8000/walk', formData);
      console.log('Walk data sent successfully:', formData);
      // Reset form data after successful submission
      setFormData({
        walk_name: '',
        w_creator: userData.username,
        address: '',
        walk_date: new Date().toISOString().split('T')[0], // Set to current date
        end_date: new Date().toISOString().split('T')[0], // Set to current date
        time: '',
        privacy: 'Bondhu'
      });
      fetchData();
    } catch (error) {
      console.error('Error sending walk data:', error);
    }
  };

  const [formData, setFormData] = useState({
    walk_name: '',
    w_creator: userData.username,
    address: '',
    walk_date: new Date().toISOString().split('T')[0], // Set to current date
    end_date: new Date().toISOString().split('T')[0], // Set to current date
    time: '',
    privacy: 'Bondhu'
  });
  const [members, setMembers] = useState([]);
  const fetmembers = async () => {
    try {
    const response = await axios.get('http://localhost:8000/walkmembers', {
    params: { id:selectedUser.walk }
    });
    setMembers(response.data);
    }catch (error) {
    console.error('Error fetching members:', error);
    }
    };
    
  

  const handleUserInfoClick = (user) => {
    console.log("ogo, hete chole jaite mon chaitese na...");
    setSelectedUser(user);
    fetmembers();
    setShowUserInfoModal(true);
  };

  const handleInputBoxButtonClick = () => {
    setShowInputBoxModal(true);
  };
  
  const handleClose = () => setShowUserInfoModal(false);

  return (
    <div className="vox mt-10 bg-light rounded-20px" style={{ overflowY: 'auto' }}>
      <div className="box">
        <div className="mt-3 row">
          <div className="col-6">
            <h1 className="toto">Buddy List</h1>
          </div>
          <div className="col-6">
            <Modal show={showInputBoxModal} onHide={() => setShowInputBoxModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Walking List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="walk_name">
                    <Form.Label>Walk Name</Form.Label>
                    <Form.Control type="text" value={formData.walk_name} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={formData.address} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="walk_date">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" value={formData.walk_date} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="end_date">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" value={formData.end_date} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" value={formData.time} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="privacy">
                    <Form.Label>Privacy</Form.Label>
                    <Form.Control as="select" value={formData.privacy} onChange={handleChange}>
                      <option value="Bondhu">Bondhu</option>
                      <option value="Known">Known</option>
                    </Form.Control>
                  </Form.Group>
                  <Button className="mew mt-2" type="submit">Save</Button>
                </Form>
              </Modal.Body>
            </Modal>
            {/* Button to open Input Box Modal */}
            <div style={{ textAlign: 'right' }}>
              <Button className="mew" onClick={handleInputBoxButtonClick}>Add New Walk</Button>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>End</th>
              <th>Time</th>
              <th>Request</th>
              <th>View Info</th>
            </tr>
          </thead>
          <tbody>
            {userlist.map(user => (
              <tr key={user.id}>
                <td><img src={`http://localhost:8000/${user.img}`} alt="User" className="rounded" style={{ width: '50px', height: '50px' }} /></td>
                <td>{user.w_creator}</td>
                <td>{user.location}</td>
                <td>{user.date}</td>
                <td>{user.end}</td>
                <td>{user.time}</td>
                <td><Button variant="primary">Request</Button></td>
                <td><Button variant="info" onClick={() => handleUserInfoClick(user)}>View Info</Button></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* User Info Modal */}
        <Modal show={showUserInfoModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  <Tabs defaultActiveKey="details">
 {userData && selectedUser && userData.username == selectedUser.w_creator && (
             <Tab eventKey="request" title="Request">
                  <RequestList fmembers={fetchData} />
                  </Tab>
                )}
    
    <Tab eventKey="details" title="Details">
      {selectedUser && (
        <div>
          <p><strong>Name:</strong> {selectedUser.w_creator}</p>
          <p><strong>Location:</strong> {selectedUser.location}</p>
          <p><strong>Date:</strong> {selectedUser.date}</p>
          <p><strong>End:</strong> {selectedUser.end}</p>
          <p><strong>Time:</strong> {selectedUser.time}</p>
        </div>
      )}
    </Tab>
    <Tab eventKey="members" title="Members">
      {selectedUser && <MemberList members={members} />}
    </Tab>
  </Tabs>
</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default BuddyList;

