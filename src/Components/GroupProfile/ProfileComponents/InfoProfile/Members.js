
import React from 'react';
import { Table } from 'react-bootstrap';

const MemberList = ({ Rmembers, guser, group, members }) => {
    const user = JSON.parse(localStorage.getItem('userData')) || {};

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Member Since</th>
            <th>Gender</th>
            {user.username === group.admin && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {members && members.map(member => (
            <tr key={member.id}>
              <td>{member.first_name}</td>
              <td>{member.Since}</td>
              <td>{member.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
};

export default MemberList;