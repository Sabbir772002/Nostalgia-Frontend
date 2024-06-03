import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import Info3 from '../../../../assets/Info-Dp/img-3.jpg';
import { IoCameraOutline } from 'react-icons/io5';
import { BiMessage, BiLogOut } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Info.css';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { Button } from "react-bootstrap";
import RequestList from './Request';
import MemberList from './Members';
import api from '../../../../util/api';
import { set } from 'react-hook-form';

const Info = ({ group, gprofile }) => {
  const [coverImg, setCoverImg] = useState(Info3);
  const importProfile = useRef();
  const importCover = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editGroupData, setEditGroupData] = useState({
    name: group.name,
    username: group.username,
    img: group.img,
    topic: group.topic,
    privacy: group.privacy
  });
  const [newProfileImage, setNewProfileImage] = useState(group.img);
  const user = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();

  const handleFile2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const imgObj = { image: URL.createObjectURL(img) };
      const coverImg = imgObj.image;
      setCoverImg(coverImg);
    }
  };

  const handleFile1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const imgObj = { image: URL.createObjectURL(img) };
      const coverImg = imgObj.image;
      setCoverImg(coverImg);
    }
  };

  const handleJoin = async () => {
    const response = await axios.post(`${api.url}:8000/join_group`, {
      user_id: user.id,
      group: group.username,
      type: "join"
    });
    if (response.ok === 0) {
      alert("You are already a member of this group");
      return;
    }
    console.log("in join");
    console.log(group);
    fetchData();  
  };

  const handleMember = async () => {
    // handle member logic
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handleModalBox = () => {
    setShowModal(false);
  };

  const handleEditModal = () => {
    setShowEditModal(true);
  };

  const handleEditModalBox = () => {
    setShowEditModal(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEditGroupData({
      ...editGroupData,
      [name]: value
    });
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
    console.log(editGroupData);
    console.log(formData);
    // setEditGroupData({
    //   name: editGroupData.name,
    //   username: editGroupData.username,
    //   img: newProfileImage,
    //   topic: editGroupData.topic,
    //   privacy: editGroupData.privacy
    // });

    try {
      const response = await axios.post(`${api.url}:8000/updategroup`, formData);
      if (response.status==201) {
        alert('Group profile updated successfully');
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error updating group profile:', error);
    }
  };

  const [members, setMembers] = useState([]);

  const fmembers = async () => {
    try {
      const response = await axios.get(`${api.url}:8000/groupmembers`, {
        params: { username: group.username }
      });
      console.log(response.data);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };
  useEffect(() => {
    fmembers();
    fetchData();
  }, [group]);

  const [Rmembers, setRmembers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api.url}:8000/requestmembers`, {
        params: { username: group.username }
      });
      setRmembers(response.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };
  useEffect(() => {
    console.log(group);
    setEditGroupData({
      name: group.name,
      username: group.username,
      img: group.img,
      topic: group.topic,
      privacy: group.privacy
    });
    console.log("Edit Group Data");
console.log(editGroupData);
  }

  , [group]);

  return (
    <div className='info'>
      <div className='info-cover'>
        <img src={coverImg} alt='' />
        <img src={`${api.url}:8000/${group.img}`} alt='profile' />
        <div className='coverDiv'>
          <IoCameraOutline className='coverSvg' onClick={() => importCover.current.click()} />
        </div>
        <div className='profileDiv'>
          <IoCameraOutline className='profileSvg' onClick={() => importProfile.current.click()} />
        </div>
      </div>

      <input type='file' ref={importProfile} onChange={handleFile1} style={{ display: 'none' }} />
      <input type='file' ref={importCover} onChange={handleFile2} style={{ display: 'none' }} />

      <div className='info-follow'>
        <h1>{group.name}</h1>
        <p>{group.username}</p>

        {group.username === user.username ? (
          <Link to="/" className="logout" onClick="">
            <BiLogOut />
            Logout
          </Link>
        ) : (
          <Button className="logout" onClick={handleModal} style={{ width: "150px" }}>
            <FontAwesomeIcon icon={faUserFriends} />
            Members
          </Button>
        )}
        <Modal show={showModal} onHide={handleModalBox} dialogClassName="custom-modal" >
          <Modal.Header closeButton>
            <Modal.Title>MemberList</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="request">
              {group.admin==user.username && (
                <Tab eventKey="request" title="Request">
                  <RequestList fmembers={fmembers} members={members} fetchData={fetchData} Rmembers={Rmembers} setRmembers={setMembers} group={group} guser={group.username} />
                </Tab>
              )}
              <Tab eventKey="members" title="Members">
                <MemberList members={members} group={group} />
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalBox}>Close</Button>
          </Modal.Footer>
        </Modal>

        {group.admin === user.username ? (
          <button onClick={handleEditModal}>
            <BiLogOut />
            Edit Group
          </button>
        ) : (
          <button onClick={group.member === 1 ? handleMember : handleJoin}>
            <FontAwesomeIcon icon={faUserFriends} />
            {group.admin === user.username ? ("Edit Group") : group.member === 1 ? (
              "Joined"
            ) : (group.accept == 1 ? "Request Sent" :
              "Join"
            )}
          </button>
        )}
      </div>
      <Modal show={showEditModal} onHide={handleEditModalBox} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditFormSubmit}>
          <div className="form-group">
              <label htmlFor="groupName">Group Name</label>
              <input
                type="text"
                className="form-control"
                id="groupName"
                name="name"
                value={editGroupData.name}
                onChange={handleEditInputChange}
                required
              />
            </div> <div className="form-group">
              <label htmlFor="groupName">Group Username</label>
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
            <div className="form-group">
              <label htmlFor="groupUsername">Group Topic</label>
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
                     <div className="form-group">
              <label htmlFor="groupUsername">Group Privacy</label>
              <select as="select" className='form-control' id="privacy" value={editGroupData.privacy} onChange={handleEditInputChange}>
                      <option value="Bondhu">Bondhu</option>
                      <option value="Known">Known</option>
                      <option value="Public">Public</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="groupImg">Profile Image</label>
              <input
                type="file"
                className="form-control"
                id="groupImg"
                onChange={handleEditFileChange}
              />
            </div>
            <Button type="submit" variant="primary">Update</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalBox}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Info;
