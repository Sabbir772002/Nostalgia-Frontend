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
    try {
      await axios.post('http://localhost:8000/walk', formData);
      console.log('Walk data sent successfully:', formData);
      fetchData();
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
  const fetchmembers = async (user) => {
    console.log("kauke passi na khujte khujte...");
    console.log(user);
    try {
    const response = await axios.get('http://localhost:8000/walkmembers', {
    params: { id: user.id }
    });
    setMembers(response.data);
    }catch (error) {
    console.error('Error fetching members:', error);
    }
    };
    const submitrequest = async (walk) => {
      console.log("hatte jabo tomar sathe.... niba?");
      if(walk.w_creator == userData.username){
        alert("You cannot request to join your own walk.");
        return;
      }
      try {
     const response= await axios.post('http://localhost:8000/walk_request', { 
      id: walk.id,
      username: userData.username
      });
      fetchData();
      if(response.data.user == userData.username){
        alert("You have already requested to join this walk. Please wait for the owner to accept your request.");
        return;
      }
      console.log('Request sent successfully:', walk.id); 
      alert("Request sent successfully. Please wait for the owner to accept your request.");
      } catch (error) {
        alert("Some issue! Try again after some moment!.");
        //something need to be done, as for network failure....
      console.error('Error sending request:', error);
      }
    };
  

  const handleUserInfoClick = (user) => {
    console.log("ogo, hete chole jaite mon chaitese na...");
    setSelectedUser(user);
    fetchmembers(user);
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
         < div className={`modal fade ${showInputBoxModal ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog " role="document">
        <div className="modal-content bg-light">
          <div className="modal-header">
            <h5 className="modal-title">Walking List</h5>
            <button type="button" className="close" onClick={() => setShowInputBoxModal(false)}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group" controlId="walk_name">
                <label>Walk Name</label>
                <input type="text" className="form-control" value={formData.walk_name} onChange={handleChange} />
              </div>
              <div className="form-group" controlId="address">
                <label>Address</label>
                <input type="text" className="form-control" value={formData.address} onChange={handleChange} />
              </div>
              <div className="form-group" controlId="walk_date">
                <label>Start Date</label>
                <input type="date" className="form-control" value={formData.walk_date} onChange={handleChange} />
              </div>
              <div className="form-group" controlId="end_date">
                <label>End Date</label>
                <input type="date" className="form-control" value={formData.end_date} onChange={handleChange} />
              </div>
              <div className="form-group" controlId="time">
                <label>Time</label>
                <input type="time" className="form-control" value={formData.time} onChange={handleChange} />
              </div>
              <div className="form-group" controlId="privacy">
                <label>Privacy</label>
                <select className="form-control" value={formData.privacy} onChange={handleChange}>
                  <option value="Bondhu">Bondhu</option>
                  <option value="Known">Known</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-2">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
                {user.w_creator == userData.username && (
                  <td><Button variant="primary" onClick={() => submitrequest(user)}>Owner</Button></td>
              )}
              {user.member == 1 && user.not_ac == 0  && !(user.w_creator == userData.username) &&(
                  <td><Button variant="success" onClick={() => submitrequest(user)} >Member</Button></td>
              )}
              {user.member == 1 && user.not_ac == 1 && (
                <td><Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => submitrequest(user)}>Requested</Button></td>
              )} 
              {user.member == 1 && user.cancel == 1 && (
                <td><Button variant="gray" onClick={() => submitrequest(user)}>Cancel</Button></td>
            )}
              {(user.w_creator != userData.username && user.member == 0 ) && (
                  <td><Button variant="primary" onClick={() => submitrequest(user)}>Request</Button></td>
              )}

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
                  <RequestList fmembers={fetchmembers} user={selectedUser} />
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