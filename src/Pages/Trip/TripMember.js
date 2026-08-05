
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import api from '../../util/api';

const MemberList = ({ members, fetchmembers , user }) => {
  const handleDelete = (id) => {
    actions(id, "delete");
  };
  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  const actions = async (id, action) => {
    try {
      const response = await axios.post(`${api.url}:8001/handletripmember`, { id:id.id,tid:id.trip, type: action});
      console.log(response.data);
      fetchmembers();
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
          {userData.username === user && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {members && members.map(member => (
          <tr key={member.id}>
            <td>{member.first_name}</td>
            <td>{member.dob}</td>
            <td>{member.gender}</td>
            {userData.username === user && (
              <td>
                <Button variant="primary" onClick={() => handleDelete(member)}>Delete</Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default MemberList;