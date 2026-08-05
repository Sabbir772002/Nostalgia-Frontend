import React, { useState } from 'react';
import { Button, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../../../util/api';

const RequestList = ({guser,fmembers,Rmembers,fetchData,setRmembers,group}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData')) || {};
 
  const viewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleConfirm = (id) => {
    actions(id, "confirm");
  };

  const handleDelete = (id) => {
    actions(id, "delete");
  };
  const actions = async (id, action) => {
    try {
      await axios.post(`${api.url}:8001/grouprequest`, {user_id:id,group:guser, type: action});
      if (fetchData) fetchData();
      if (fmembers) fmembers();
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
          <th>View</th>
          {user.username === group.admin && (
            <th>Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {Rmembers && Rmembers.map(member => (
          <tr key={member.id}>
            <td>{member.first_name}</td>
            <td>{member.dob}</td>
            <td>
              <Button variant="primary" onClick={() => viewProfile(member.username)}>View Profile</Button>
            </td>
            {user.username === group.admin && (

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
            </td>)}

          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RequestList;