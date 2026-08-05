import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Overseer.css";
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../../util/api';
import ModernDrawer from '../../Common/ModernDrawer';

const ShowGroup = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    privacy: 'Bondhu',
    topic: '',
    phone: '',
    email: '',
  });
  const user = JSON.parse(localStorage.getItem('userData')) || {};

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const [fndlist, setfndlist] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const fetchOverseerList = useCallback(() => {
    if (!user.id) return;
    axios.get(`${api.url}:8001/my_groups`, {
      params: {
        user_id: user.id
      }
    })
      .then(response => {
        setfndlist(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [user.id]);

  useEffect(() => {
    fetchOverseerList();
  }, [fetchOverseerList]);

  const dlt = async (groupUsername, username) => {
    try {
      const payload = {
        guser: groupUsername,
        username: username
      };
      const response = await axios.post(`${api.url}:8001/deletegroup`, payload);
      if (response.status === 201 || response.status === 200) {
        fetchOverseerList();
      }
    } catch (error) {
      console.error('Error leaving the group:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, id: user.id };
      const response = await axios.post(`${api.url}:8001/add_group`, payload);
      if (response.data.msg === "Group already exists") {
        alert("Group with this username already exists.");
        return;
      }
      setFormData({
        username: '',
        name: '',
        privacy: 'Bondhu',
        topic: '',
        phone: '',
        email: '',
      });
      fetchOverseerList();
      setShowDrawer(false);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="Sugg-comp">
      <div className="text-center mt-1 mb-3">
        <Button className="btn-modern-primary w-100 py-2" onClick={() => setShowDrawer(true)}>
          + Create Group
        </Button>
      </div>
      <h2 className="mt-3 font-weight-bold fs-5 mb-3">Groups List</h2>

      {fndlist.map((group, index) => (
        <div className="sugg-people" key={index}>
          <div className="s-left">
            <img src={`${api.url}:8001/${group.img}`} alt={group.name} />
            <h3>{group.name}</h3>
          </div>
          <div className="s-right d-flex gap-2">
            <Link to={`/group/${group.username}`}>
              <button className="btn-modern-primary py-1 px-3">View</button>
            </Link>
            {group.creator !== user.username && (
              <button className="btn-modern-outline text-danger py-1 px-3" onClick={() => dlt(group.username, user.username)}>
                Leave
              </button>
            )}
          </div>
        </div>
      ))}

      <ModernDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Create New Group"
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label className="fw-semibold">Group Username</Form.Label>
            <Form.Control type="text" value={formData.username} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label className="fw-semibold">Group Name</Form.Label>
            <Form.Control type="text" value={formData.name} onChange={handleChange} required />
          </Form.Group>  
          <Form.Group controlId="topic" className="mb-3">
            <Form.Label className="fw-semibold">Topic</Form.Label>
            <Form.Control type="text" value={formData.topic} onChange={handleChange} />
          </Form.Group>  
          <Form.Group controlId="privacy" className="mb-3">
            <Form.Label className="fw-semibold">Privacy</Form.Label>
            <Form.Control as="select" value={formData.privacy} onChange={handleChange}>
              <option value="Bondhu">Bondhu</option>
              <option value="Known">Known</option>
              <option value="Public">Public</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit" className="btn-modern-primary w-100 py-2 mt-3">
            Create Group
          </Button>
        </Form>
      </ModernDrawer>
    </div>
  );
};

export default ShowGroup;
