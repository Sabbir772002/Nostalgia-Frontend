import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Info3 from '../../../../assets/Info-Dp/img-3.jpg';
import { IoCameraOutline } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './Info.css';
import { Tabs, Tab, Button } from 'react-bootstrap';
import axios from 'axios';
import RequestList from './Request';
import MemberList from './Members';
import api from '../../../../util/api';
import ModernDrawer from '../../../Common/ModernDrawer';

const Info = ({ group, gprofile }) => {
  const [coverImg, setCoverImg] = useState(Info3);
  const importProfile = useRef();
  const importCover = useRef();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editGroupData, setEditGroupData] = useState({
    name: group ? group.name : '',
    username: group ? group.username : '',
    img: group ? group.img : '',
    topic: group ? group.topic : '',
    privacy: group ? group.privacy : 'Bondhu'
  });
  const [newProfileImage, setNewProfileImage] = useState(group ? group.img : null);
  const user = JSON.parse(localStorage.getItem('userData')) || {};

  const handleFile2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setCoverImg(URL.createObjectURL(img));
    }
  };

  const handleFile1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setCoverImg(URL.createObjectURL(img));
    }
  };

  const [members, setMembers] = useState([]);
  const [Rmembers, setRmembers] = useState([]);

  const fmembers = useCallback(async () => {
    if (!group || !group.username) return;
    try {
      const response = await axios.get(`${api.url}:8001/groupmembers`, {
        params: { username: group.username }
      });
      setMembers(response.data || []);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }, [group]);

  const fetchData = useCallback(async () => {
    if (!group || !group.username) return;
    try {
      const response = await axios.get(`${api.url}:8001/requestmembers`, {
        params: { username: group.username }
      });
      setRmembers(response.data || []);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }, [group]);

  useEffect(() => {
    if (group && group.username) {
      fmembers();
      fetchData();
      setEditGroupData({
        name: group.name,
        username: group.username,
        img: group.img,
        topic: group.topic,
        privacy: group.privacy
      });
    }
  }, [group, fmembers, fetchData]);

  const handleJoin = async () => {
    const response = await axios.post(`${api.url}:8001/join_group`, {
      user_id: user.id,
      group: group.username,
      type: "join"
    });
    if (response.data && response.data.ok === 0) {
      alert("You are already a member of this group");
      return;
    }
    fetchData();  
  };

  const handleMember = async () => {};

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditGroupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfileImage(e.target.files[0]);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editGroupData.name);
    formData.append('username', editGroupData.username);
    formData.append('topic', editGroupData.topic);
    formData.append('privacy', editGroupData.privacy);
    if (newProfileImage) {
      formData.append('img', newProfileImage);
    }

    try {
      const response = await axios.post(`${api.url}:8001/updategroup`, formData);
      if (response.status === 201 || response.status === 200) {
        setShowEditDrawer(false);
      }
    } catch (error) {
      console.error('Error updating group profile:', error);
    }
  };

  return (
    <div className='info'>
      <div className='info-cover'>
        <img src={coverImg} alt='' />
        <img src={`${api.url}:8001/${group.img}`} alt='profile' />
        <div className='coverDiv'>
          <IoCameraOutline className='coverSvg' onClick={() => importCover.current.click()} />
        </div>
        <div className='profileDiv'>
          <IoCameraOutline className='profileSvg' onClick={() => importProfile.current.click()} />
        </div>
      </div>

      <input type='file' ref={importProfile} onChange={handleFile1} style={{ display: 'none' }} />
      <input type='file' ref={importCover} onChange={handleFile2} style={{ display: 'none' }} />

      <div className='info-follow text-start px-4'>
        <h1 className="text-start pt-4 mb-1 fw-bold fs-3">{group.name}</h1>
        <p className="text-start text-muted mb-3 fs-6">@{group.username}</p>

        <div className="d-flex align-items-center justify-content-start gap-3 mt-3 mb-2">
          <Button className="btn-modern-primary py-2 px-4 shadow-sm d-flex align-items-center" onClick={() => setShowDrawer(true)}>
            <FontAwesomeIcon icon={faUserFriends} className="me-2" />
            Members
          </Button>

          {group.admin === user.username ? (
            <Button variant="outline-primary" className="btn-modern-outline py-2 px-4" onClick={() => setShowEditDrawer(true)}>
              Edit Group
            </Button>
          ) : (
            <Button className="btn-modern-primary py-2 px-4 d-flex align-items-center" onClick={group.member === 1 ? handleMember : handleJoin}>
              <FontAwesomeIcon icon={faUserFriends} className="me-2" />
              {group.member === 1 ? "Joined" : group.accept === 1 ? "Request Sent" : "Join"}
            </Button>
          )}

          {group.username === user.username && (
            <Link to="/" className="btn-modern-outline text-danger py-2 px-3 d-flex align-items-center gap-1">
              <BiLogOut />
              Logout
            </Link>
          )}
        </div>
      </div>

      {/* Members & Requests Drawer */}
      <ModernDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Group Members & Requests"
      >
        <Tabs defaultActiveKey="members">
          {group.admin === user.username && (
            <Tab eventKey="request" title="Requests">
              <RequestList fmembers={fmembers} members={members} fetchData={fetchData} Rmembers={Rmembers} setRmembers={setMembers} group={group} guser={group.username} />
            </Tab>
          )}
          <Tab eventKey="members" title="Members">
            <MemberList members={members} group={group} />
          </Tab>
        </Tabs>
      </ModernDrawer>

      {/* Edit Group Drawer */}
      <ModernDrawer
        isOpen={showEditDrawer}
        onClose={() => setShowEditDrawer(false)}
        title="Edit Group Settings"
      >
        <form onSubmit={handleEditFormSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="groupName" className="fw-semibold mb-1">Group Name</label>
            <input
              type="text"
              className="form-control"
              id="groupName"
              name="name"
              value={editGroupData.name}
              onChange={handleEditInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="groupUsername" className="fw-semibold mb-1">Group Username</label>
            <input
              type="text"
              className="form-control"
              id="groupUsername"
              name="username"
              value={editGroupData.username}
              onChange={handleEditInputChange}
              readOnly
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="gtopic" className="fw-semibold mb-1">Group Topic</label>
            <input
              type="text"
              className="form-control"
              id="gtopic"
              name="topic"
              value={editGroupData.topic}
              onChange={handleEditInputChange}
              required
            />
          </div>        
          <div className="form-group mb-3">
            <label htmlFor="privacy" className="fw-semibold mb-1">Group Privacy</label>
            <select className='form-control' id="privacy" name="privacy" value={editGroupData.privacy} onChange={handleEditInputChange}>
              <option value="Bondhu">Bondhu</option>
              <option value="Known">Known</option>
              <option value="Public">Public</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="groupImg" className="fw-semibold mb-1">Profile Image</label>
            <input
              type="file"
              className="form-control"
              id="groupImg"
              onChange={handleEditFileChange}
            />
          </div>
          <Button type="submit" className="btn-modern-primary w-100 py-2 mt-3">
            Update Group Profile
          </Button>
        </form>
      </ModernDrawer>
    </div>
  );
};

export default Info;
