
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import api from '../../util/api';
import { Button } from 'react-bootstrap';
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
              <td><Link to={`/profile/${member.username}`}>View Profile</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
          };
export default MemberList;