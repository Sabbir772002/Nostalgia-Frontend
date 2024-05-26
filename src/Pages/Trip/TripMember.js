
import React, { useState } from 'react';
import { Table,Button } from 'react-bootstrap';

import axios from 'axios';
const MemberList = ({ members, fetchmembers }) => {
    console.log("yo yo bro, hete chole jabo bohudur...");
  const handleDelete = (id) => {
    console.log(id);
    actions(id, "delete");
  };

  const actions = async (id, action) => {
    try {
      console.log(id);
      const response = await axios.post('http://localhost:8000/handletripmember', { id:id.id,tid:id.trip, type: action});
      console.log(response.data);
      fetchmembers();
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
          {members && members.map(member => (
            <tr key={member.id}>
              <td>{member.first_name}</td>
              <td>{member.dob}</td>
              <td>{member.gender}</td>
              <td><Button variant="primary" eventKey="delete" onClick={() => handleDelete(member)}>Delete</Button></td>
              {/* <td><Button variant="primary" onClick={() => viewprofile(member.id)}>View Profile</Button></td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    );
          };
export default MemberList;