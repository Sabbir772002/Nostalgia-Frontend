import React, { useState, useEffect } from 'react';
import { Button, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../util/api';

const RequestList = ({user, fmembers}) => {
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [selectedId, setSelectedId] = useState(null); // State for selected member ID
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [Rmembers, setRmembers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api.url}:8000/trip!members`, {
        params: { id: user.id }
      });
     // fmembers();
      setRmembers(response.data);
    } catch (error) {   
         console.error('Error fetching user list:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const viewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleConfirm = (id) => {
    console.log(id);
    actions(id, "confirm");
  };

  const handleDelete = (id) => {
    console.log(id);
    actions(id, "delete");
  };

  const actions = async (id, action) => {
    try {
      console.log(id);
      const response = await axios.post(`${api.url}:8000/handletripmember`, { id:id,tid:user.id, type: action});
      console.log(response.data);
      fetchData();
      fmembers();
      //set members from buddylist
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {Rmembers && Rmembers.map(member => (
          <tr key={member.id}>
            <td>{member.first_name}</td>
            <td>{member.dob}</td>
            <td>{member.gender}</td>
      
            <td>
              <DropdownButton
                title="Actions"
                id="actions-dropdown"
                variant="secondary"
                show={showDropdown && selectedId === member.id}
                onSelect={() => setShowDropdown(false)}
                onToggle={(isOpen) => {
                  setShowDropdown(isOpen);
                  setSelectedId(isOpen ? member.id : null);
                }}
              >
                <Dropdown.Item eventKey="confirm" onClick={() => handleConfirm(member.id)}>Confirm</Dropdown.Item>
                <Dropdown.Item eventKey="delete" onClick={() => handleDelete(member.id)}>Delete</Dropdown.Item>
              </DropdownButton>
            </td>
            <td>
              <Button variant="primary" onClick={() => viewProfile(member.username)}>View Profile</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RequestList;