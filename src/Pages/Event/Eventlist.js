import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Buddylist.css';
import { Tab, Tabs, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import RequestList from './Request';
import MemberList from './EventMember';
import api from '../../util/api'

const Eventlist = () => {
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showInputBoxModal, setShowInputBoxModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userlist, setUserlist] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const fetchData = async () => {
    try {
      const response = await axios.get(`${api.url}:8000/event`, {
        params: { username: userData.username }
      });
      setUserlist(response.data.events);
      console.log(userlist);
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
    if(id === 'division') {
      findDistrict(value);
    }
    if(id === 'district') {
      findThana(value);
    }
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
      await axios.post(`${api.url}:8000/event`, formData);
      console.log('Event data sent successfully:', formData);
      fetchData();
      // Reset form data after successful submission
      setFormData({
        title: '',
        e_creator: userData.username,
        address: '',
        start_date: new Date().toISOString().split('T')[0], // Set to current date
        create_date: new Date().toISOString().split('T')[0], // Set to current date
        end_date: new Date().toISOString().split('T')[0], // Set to current date
        start_time: '',
        end_time: '',
        Description: '',
        type: '',
        privacy: 'Bondhu',
        thana: "Dhaka"

      });
    } catch (error) {
      console.error('Error sending walk data:', error);
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    e_creator: userData.username,
    address: '',
    start_date: new Date().toISOString().split('T')[0], // Set to current date
    create_date: new Date().toISOString().split('T')[0], // Set to current date
    end_date: new Date().toISOString().split('T')[0], // Set to current date
    start_time: '',
    Description: '',
    end_time: '',
    type: '',
    privacy: 'Bondhu',
    thana: "Dhaka"
  });
  const [members, setMembers] = useState([]);
  const fetchmembers = async (user) => {
    console.log("kauke passi na khujte khujte...");
    console.log(user);
    try {
    const response = await axios.get(`${api.url}:8000/eventmembers`, {
    params: { id: user.id }
    });
    setMembers(response.data);
    }catch (error) {
    console.error('Error fetching members:', error);
    }
    };
    const submitrequest = async (walk) => {
      console.log("hatte jabo tomar sathe.... niba?");
      if(walk.E_creator == userData.username){
        alert("You cannot request to join your own walk.");
        return;
      }
      try {
     const response= await axios.post(`${api.url}:8000/event_request`, { 
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
  const [divisions, setDivisions] = useState([
        "Dhaka",
        "Rajshahi",
        "Khulna",
        "Barishal",
        "Chattogram",
        "Sylhet",
        "Mymensingh"
    ]);
    const [upazilas, setUpazilas] = useState();
    const [districts, setDistricts] = useState([]);
    const findThana = (district) => {
        const res=axios.get(`${api.url}:8000/findthana`,{
            params: {
                district: district
            }
        }).then(response => {
            // Accessing the data from the response object
            console.log(response.data);
            setUpazilas(response.data);
        }).catch(error => {
            // Handling errors
            console.error('Error:', error);
        });
    }
    const findDistrict = (division) => {
        const res=axios.get(`${api.url}:8000/finddistrict`,{
            params: {
                division: division
            }
        }) .then(response => {
            // Accessing the data from the response object
            console.log(response.data);
            setDistricts(response.data);
        })
        .catch(error => {
            // Handling errors
            console.error('Error:', error);
        });

    }        
  return (
    <div className="vox mt-10 bg-light rounded-20px" style={{ overflowY: 'auto' }}>
      <div className="box">
        <div className="mt-3 row">
          <div className="col-6">
            <h1 className="toto">Event List</h1>
          </div>
          <div className="col-6">
          <div className={`modal ${showInputBoxModal ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content bg-light">
          <div className="modal-header">
            <h5 className="modal-title">Event List</h5>
            <button type="button" className="close" onClick={() => setShowInputBoxModal(false)}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input type="text" className="form-control" id="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <input type="text" className="form-control" id="Description" value={formData.Description} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input type="text" className="form-control" id="type" value={formData.type} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="start_date">Start Date</label>
                <input type="date" className="form-control" id="start_date" value={formData.start_date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="end_date">End Date</label>
                <input type="date" className="form-control" id="end_date" value={formData.end_date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="start_time">Start Time</label>
                <input type="time" className="form-control" id="start_time" value={formData.start_time} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="end_time">End Time</label>
                <input type="time" className="form-control" id="end_time" value={formData.end_time} onChange={handleChange} />
              </div>
              <div className="inputBox " style={{ width: "100%" }}>
                        <select className='form-control' name="division" id="division" onChange={handleChange}>
                            <option value="">Select Division</option>
                            {divisions.map((division) => (
                                <option key={division} value={division}>
                                    {division}
                                </option>
                            ))}
                        </select>
                    </div>
                    { districts && (
                        <div className="inputBox" style={{width:"100%"}}>
                            <select  className='form-control'  name="district" id="district" onChange={handleChange}>
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {upazilas && (
                        <div className="inputBox" style={{width:"100%"}}>
                            <select className='form-control'  name="thana" id="thana" onChange={handleChange}>
                                <option value="">Select Thana/Upazila</option>
                                {upazilas.map((upazila) => (
                                    <option key={upazila} value={upazila}>
                                        {upazila}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
              {/* <div className="form-group">
                <label htmlFor="thana">Thana</label>
                <input type="text" className="form-control" id="thana" value={formData.thana} onChange={handleChange} />
              </div> */}
              <div className="form-group">
                <label htmlFor="privacy">Privacy</label>
                <select className="form-control" id="privacy" value={formData.privacy} onChange={handleChange}>
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
              <Button className="mew" onClick={handleInputBoxButtonClick}>Add New Event</Button>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>View Info</th>
            </tr>
          </thead>
          <tbody>
            {userlist && userlist.map(user => (
              <tr key={user.id}>
                {/* <td><img src={`http://localhost:8000/${user.img}`} alt="User" className="rounded" style={{ width: '50px', height: '50px' }} /></td> */}
                <td>{user.Event_title}</td>
                <td>{user.E_creator}</td>
                <td>{user.Address}</td>
                <td>{user.start_date}</td>
                <td>{user.end_date}</td>
                <td>{user.start_time}</td>
                <td>{user.end_time}</td>
                {user.E_creator == userData.username && (
                  <td><Button variant="primary" onClick={() => submitrequest(user)}>Owner</Button></td>
              )}
              {user.Member == 1  && !(user.E_creator == userData.username) &&(
                  <td><Button variant="success" onClick={() => submitrequest(user)} >Member</Button></td>
              )}
              {user.member == 1 && user.not_ac == 1 && (
                <td><Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => submitrequest(user)}>Requested</Button></td>
              )} 
              {user.member == 1 && user.cancel == 1 && (
                <td><Button variant="gray" onClick={() => submitrequest(user)}>Cancel</Button></td>
            )}
              {(user.E_creator != userData.username && user.Member == 0) && (
                  <td><Button variant="primary" onClick={() => submitrequest(user)}>Join</Button></td>
              )}

              <td><Button variant="info" onClick={() => handleUserInfoClick(user)}>View Info</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* User Info Modal */}
        <Modal show={showUserInfoModal} onHide={handleClose} dialogClassName="custom-modal" >
         {/* <div className="bg-light"> */}
          <Modal.Header closeButton>
            <Modal.Title>User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  <Tabs defaultActiveKey="details">
 {/* {userData && selectedUser && userData.username == selectedUser.E_creator && (
             <Tab eventKey="request" title="Request">
                  <RequestList fmembers={fetchmembers} user={selectedUser} />
                  </Tab>
                )} */}
    <Tab eventKey="details" title="Details">
      {selectedUser && (
        <div>
          <p><strong>Name:</strong> {selectedUser.E_creator}</p>
          <p><strong>Type:</strong> {selectedUser.E_type}</p>
          <p><strong>Location:</strong> {selectedUser.Address}</p>
          <p><strong>Thana:</strong> {selectedUser.Thana}</p>
          <p><strong>Description:</strong> {selectedUser.Description}</p>
          <p><strong>Start Date:</strong> {selectedUser.start_date}</p>
          <p><strong>End Date:</strong> {selectedUser.end_date}</p>
          <p><strong>Start Time:</strong> {selectedUser.start_time}</p>
          <p><strong>End Time:</strong> {selectedUser.end_time}</p>
          <p><strong>Privacy:</strong> {selectedUser.privacy}</p>
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
          {/* </div> */}
        </Modal>
      </div>
    </div>
  );
};

export default Eventlist;

