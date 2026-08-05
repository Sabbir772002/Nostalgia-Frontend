import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Overseer.css";
import { Button, Form } from 'react-bootstrap';
import api from '../../../util/api';
import ModernDrawer from '../../Common/ModernDrawer';

const Overseer = () => {
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
  const user = JSON.parse(localStorage.getItem('userData')) || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [fndlist, setfndlist] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showViewDrawer, setShowViewDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchOverseerList = useCallback(() => {
    if (!user.username) return;
    axios.get(`${api.url}:8001/overseerlist`, {
      params: {
        target: user.username
      }
    })
      .then(response => {
        setfndlist(response.data.users || []);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [user.username]);

  useEffect(() => {
    fetchOverseerList();
  }, [fetchOverseerList]);

  const handleViewUser = (person) => {
    setSelectedUser(person);
    setShowViewDrawer(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.username.includes("@")) {
        alert("Username can't contain '@'");
        return;
      }
      if (fndlist.find((person) => person.username === formData.username)) {
        alert("Username already exists");
        return;
      }
      const payload = {
        ...formData,
        username: `${formData.username}@${user.username}`,
        address: formData.Location,
        dob: "2021-09-01",
        thana: "Dhaka",
        nid: "5288",
        gender: "Male"
      };
      await axios.post(`${api.url}:8001/add_overseer`, payload);
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
      setShowDrawer(false);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleDelete = async (username) => {
    try {
      await axios.post(`${api.url}:8001/doverseer`, { username, user: user.username });
      fetchOverseerList();
    } catch (error) {
      console.error('Error deleting overseer:', error);
    }
  };

  const [showAdditionalDrawer, setShowAdditionalDrawer] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState({
    type: '',
    content: '',
    username: user.username || ''
  });

  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitAdditionalInfo = async (e) => {
    e.preventDefault();
    if (!additionalInfo.type || !additionalInfo.content) {
      alert('Please fill all the fields');
      return;
    }
    try {
      await axios.post(`${api.url}:8001/addhandle`, additionalInfo);
      setAdditionalInfo({
        type: '',
        content: '',
        username: user.username || ''
      });
      setShowAdditionalDrawer(false);
    } catch (error) {
      console.error('Error submitting info:', error);
    }
  };

  return (
    <div className="Sugg-comp">
      <div className="d-flex flex-row justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="font-weight-bold fs-5 m-0">Overseer List</h2>
        <div className="d-flex flex-row align-items-center gap-2">
          <Button className="btn-modern-primary py-1 px-3 text-nowrap" onClick={() => setShowDrawer(true)}>
            + Add Overseer
          </Button>
          <Button className="btn-modern-outline py-1 px-3 text-nowrap" onClick={() => setShowAdditionalDrawer(true)}>
            + Additional Info
          </Button>
        </div>
      </div>

      {fndlist.map((person, index) => (
        <div className="sugg-people" key={index}>
          <div className="s-left">
            <img src={`${api.url}:8001/${person.pp}`} alt="" />
            <h3>{person.first_name} {person.last_name}</h3>
          </div>

          <div className="s-right d-flex gap-2">
            <button className="btn-modern-primary py-1 px-3" onClick={() => handleViewUser(person)}>View</button>
            <button className="btn-modern-outline text-danger py-1 px-3" onClick={() => handleDelete(person.username)}>Delete</button>
          </div>
        </div>
      ))}

      {/* Additional Info Drawer */}
      <ModernDrawer
        isOpen={showAdditionalDrawer}
        onClose={() => setShowAdditionalDrawer(false)}
        title="Add Additional Information"
      >
        <Form onSubmit={handleSubmitAdditionalInfo}>
          <Form.Group controlId="type" className="mb-3">
            <Form.Label className="fw-semibold">Type</Form.Label>
            <Form.Control as="select" name="type" value={additionalInfo.type} onChange={handleAdditionalChange} required>
              <option value="">Select Type</option>
              <option value="School">School</option>
              <option value="College">College</option>
              <option value="University">University</option>
              <option value="Job">Job</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="institution" className="mb-3">
            <Form.Label className="fw-semibold">Institution Name / Detail</Form.Label>
            <Form.Control type="text" name="content" value={additionalInfo.content} onChange={handleAdditionalChange} required />
          </Form.Group>
          <Button type="submit" className="btn-modern-primary w-100 py-2 mt-3">
            Save Information
          </Button>
        </Form>
      </ModernDrawer>

      {/* Add Overseer Drawer */}
      <ModernDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add New Overseer"
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label className="fw-semibold">Username</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="first_name" className="mb-3">
            <Form.Label className="fw-semibold">First Name</Form.Label>
            <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="last_name" className="mb-3">
            <Form.Label className="fw-semibold">Last Name</Form.Label>
            <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="phone" className="mb-3">
            <Form.Label className="fw-semibold">Phone</Form.Label>
            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="Relation" className="mb-3">
            <Form.Label className="fw-semibold">Relation</Form.Label>
            <Form.Control type="text" name="Relation" value={formData.Relation} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="Location" className="mb-3">
            <Form.Label className="fw-semibold">Location / Address</Form.Label>
            <Form.Control as="textarea" rows={2} name="Location" value={formData.Location} onChange={handleChange} />
          </Form.Group>
          <Button type="submit" className="btn-modern-primary w-100 py-2 mt-3">
            Submit Overseer
          </Button>
        </Form>
      </ModernDrawer>

      {/* View Overseer Drawer */}
      <ModernDrawer
        isOpen={showViewDrawer}
        onClose={() => setShowViewDrawer(false)}
        title="Overseer Details"
      >
        {selectedUser && (
          <div className="d-flex flex-column gap-3">
            <div><strong>Username:</strong> {selectedUser.username}</div>
            <div><strong>First Name:</strong> {selectedUser.first_name}</div>
            <div><strong>Last Name:</strong> {selectedUser.last_name}</div>
            <div><strong>Phone:</strong> {selectedUser.phone}</div>
            <div><strong>Email:</strong> {selectedUser.email}</div>
            <div><strong>Gender:</strong> {selectedUser.gender}</div>
            <div><strong>Relation:</strong> {selectedUser.relation}</div>
            <div><strong>Address:</strong> {selectedUser.address}</div>
          </div>
        )}
      </ModernDrawer>
    </div>
  );
};

export default Overseer;