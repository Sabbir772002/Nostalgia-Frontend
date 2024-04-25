
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
const MemberList = ({ members }) => {
    console.log("yo yo bro, hete chole jabo bohudur...");
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
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.first_name}</td>
              <td>{member.dob}</td>
              <td>{member.gender}</td>
              {/* <td><Button variant="primary" onClick={() =>}>View Profile</Button></td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    );
          };
export default MemberList;