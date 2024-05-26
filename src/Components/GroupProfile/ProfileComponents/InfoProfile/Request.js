import React, { useState, useEffect } from 'react';
import { Button, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestList = ({guser,fmembers,Rmembers,fetchData,setRmembers,group}) => {
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [selectedId, setSelectedId] = useState(null); // State for selected member ID
  const navigate = useNavigate();
  const user= JSON.parse(localStorage.getItem('userData'));
 
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
      const response = await axios.post('http://localhost:8000/grouprequest', {user_id:id,group:guser, type: action});
      console.log("in actions");  
      console.log(response.data);
      fetchData();
     // setRmembers(response.data);
       fmembers();
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
          <th>View</th>
          {user.username==group.admin && (

<th>Actions</th>
)}        </tr>
      </thead>
      <tbody>
        {Rmembers && Rmembers.map(member => (
          <tr key={member.id}>
            <td>{member.first_name}</td>
            <td>{member.dob}</td>
            <td>{member.gender}</td>
            <td>
              <Button variant="primary" onClick={() => viewProfile(member.username)}>View Profile</Button>
            </td>
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RequestList;