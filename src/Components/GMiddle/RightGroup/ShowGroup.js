import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Overseer.css";
import { Modal, Button, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../../util/api';

const ShowGroup = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    privacy: '',
    topic: '',
    phone: '',
    email: '',
  });
  const user= JSON.parse(localStorage.getItem('userData'));

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;
    if(id == 'privacy') {
      console.log('Privacy:', value);
      newValue = value;
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: newValue
    }));
  };
  const [fndlist, setfndlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchOverseerList();
  }, []);


  const fetchOverseerList = () => {
    axios.get(`http://127.0.0.1:8000/my_groups`, {
      params: {
        user_id: user.id
      }
    })
      .then(response => {
        setfndlist(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };




  const handleAddOverseer = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  // Define the dlt function to send a POST request
  const dlt = async (groupUsername, username) => {
    try {
      const formData = {
        guser: groupUsername,
        username: username
      };
      const response = await axios.post(`${api.url}:8000/deletegroup`, formData);
      if (response.status === 201) {
        console.log('Successfully left the group');
        alert("Successfully left the group");
        fetchOverseerList();
      } else {
        console.error('Failed to leave the group');
      }
    } catch (error) {
      console.error('Error leaving the group:', error);
    }
  };
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Data submitted:', formData);   
      formData.id=user.id;  
      formData.username=formData.username; 
      const response = await axios.post(`${api.url}:8000/add_group`, formData);
      if(response.data.msg === "Group already exists"){
        alert("Group With this Username already exists")
        return;
      }
      console.log('Data submitted:', response.data);
      setFormData({
        username: '',
        name: '',
        privacy: '',
        topic: '',
        phone: '',
        email: '',
      });
      fetchOverseerList();
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    
    <div className="Sugg-comp">
            <div className="text-center mt-1">
        <Button variant="primary" onClick={handleAddOverseer}> Create Group</Button>
        <hr/>

   </div>
      <h2 className="mt-3font-weight-bold ">Groups List</h2>

      {fndlist.map((group, index) => (
        <div className="sugg-people" key={index}>
          <div className="s-left">
            <img  src= {`${api.url}:8000/${group.gp}`} alt="" />
            <h3>{group.name}</h3>
          </div>

          <div className="s-right">
            <Link to={`/group/${group.username}`}><button>View</button></Link>
          <button onClick={() => dlt(group.username, user.username)}>Leave</button>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal} centered scrollable dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Group Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>  
            <Form.Group controlId="topic">
              <Form.Label>Topic</Form.Label>
              <Form.Control type="text" name="topic" value={formData.topic} onChange={handleChange} />
            </Form.Group>  
            {/* <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </Form.Group> */}
            {/* <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group> */}
            <Form.Group controlId="privacy">
                    <Form.Label>Privacy</Form.Label>
                    <Form.Control as="select" value={formData.privacy} onChange={handleChange}>
                      <option value="Bondhu">Bondhu</option>
                      <option value="Known">Known</option>
                      <option value="Public">Public</option>
                    </Form.Control>
                  </Form.Group>
            {/* Add other form fields similarly */}
            <Button variant="primary" type="submit" className="mt-2">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showViewModal} onHide={handleCloseViewModal} centered scrollable dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>View Overseer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display details of the selected overseer */}
          {selectedUser && (
            <div>
              <div className="card mb-2">
                <div className="card-body">
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={selectedUser.username} readOnly />
                  </Form.Group>
                </div>
              </div>
              <div className="card mb-2">
                <div className="card-body">
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={selectedUser.first_name} readOnly />
                  </Form.Group>
                </div>
              </div>
              <div className="card mb-2">
                <div className="card-body">
                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={selectedUser.last_name} readOnly />
                  </Form.Group>
                </div>
              </div>
            <div className="card mb-2">
                <div className="card-body">
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={selectedUser.phone} readOnly />
                  </Form.Group>
                </div>
              </div>
               <div className="card mb-2">
                <div className="card-body">
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={selectedUser.email} readOnly />
                  </Form.Group>
                </div>
              </div>
              {/* <div className="card mb-2">
                <div className="card-body">
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={selectedUser.password} readOnly />
                  </Form.Group>
                </div>
              </div> */}
               <div className="card mb-2">
                <div className="card-body">
                  <Form.Group controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" value={selectedUser.gender} readOnly />
                  </Form.Group>
                </div>
              </div> 
              <div className="card mb-2">
                <div className="card-body">
                  <Form.Group controlId="formRelation">
                    <Form.Label>Relation</Form.Label>
                    <Form.Control type="text" value={selectedUser.relation} readOnly />
                  </Form.Group>
                </div>
              </div> 
              <div className="card mb-2">
                <div className="card-body">
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={selectedUser.address} readOnly />
                  </Form.Group>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
      {/* Button to open modal */}
    </div>
  )
}

export default ShowGroup;
