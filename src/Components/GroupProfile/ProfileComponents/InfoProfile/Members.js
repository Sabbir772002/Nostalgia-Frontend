
import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
const MemberList = ({guser,fmembers,members}) => {
    console.log("grope manush koi...");
    // const [members, setMembers] = useState([]);
    // const fetchbox= async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8000/groupmembers',
    //       {
    //         params: { username: guser }
    //       });
    //       console.log(response.data);
    //     setMembers(response.data);

    //     } catch (error) {
    //     console.error('Error fetching user list:', error);
    //   }
    // };
    // useEffect(() => {
    //   fetchbox();
    // }, [guser]);
    // fetchbox(); 
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Member Since</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members && members.map(member => (
            <tr key={member.id}>
              <td>{member.first_name}</td>
              <td>{member.Since}</td>
              <td>{member.gender}</td>
              {/* <td><Button variant="primary" onClick={() =>}>View Profile</Button></td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    );
          };
export default MemberList;