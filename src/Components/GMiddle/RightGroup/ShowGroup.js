import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Overseer.css";
import { Modal, Button, Form} from 'react-bootstrap';

const ShowGroup = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    phone: '',
    email: '',
    Location: '',
    Relation: ''
  });
  const user= JSON.parse(localStorage.getItem('userData'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [fndlist, setfndlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchOverseerList();
  }, []);



  
  const fetchOverseerList = () => {
    axios.get(`http://127.0.0.1:8000/friends`, {
      params: {
        user_id: user.id
      }
    })
      .then(response => {
        setfndlist(response.data.users);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Data submitted:', formData);
      formData.username= formData.username+"@"+user.username;
      formData.address= formData.Location;
      formData.dob="2021-09-01";
      formData.thana="1";
      formData.nid="5288";
      formData.gender="Male";
      const response = await axios.post('http://localhost:8000/add_overseer', formData);
       
      console.log('Data submitted:', response.data);
      setFormData({
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        phone: '',
        email: '',
        Location: '',
        Relation: ''
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

   </div>
      <h2 className="mt-3font-weight-bold ">Groups List</h2>

      {fndlist.map((person, index) => (
        <div className="sugg-people" key={index}>
          <div className="s-left">
            <img  src= {`http://localhost:8000/${person.pp}`} alt="" />
            <h3>{person.first_name}</h3>
            <h3>{person.last_name}</h3>
          </div>

          <div className="s-right">
            <button onClick={() => handleViewUser(person)}>View</button>
            <button>Leave</button>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal} centered scrollable dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Overseer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="Relation">
              <Form.Label>Relation</Form.Label>
              <Form.Control type="text" name="Relation" value={formData.Relation} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="Location">
              <Form.Label>Location</Form.Label>
              <Form.Control as="textarea" name="Location" value={formData.Location} onChange={handleChange} />
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
