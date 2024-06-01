import React, { useState, useRef,useEffect } from 'react';
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
const Info = ({ group,gprofile}) => {
  const [coverImg, setCoverImg] = useState(Info3);
  const importProfile = useRef();
  const importCover = useRef();
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('userData'));
const navigate = useNavigate();

  const handleFile2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const imgObj = { image: URL.createObjectURL(img) };
      const coverImg = imgObj.image;
      setCoverImg(coverImg);
    }
  }
    const handleFile1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const imgObj = { image: URL.createObjectURL(img) };
      const coverImg = imgObj.image;
      setCoverImg(coverImg);
    }
  };
  console.log("in info page");
  // console.log(group);
  const handleJoin =async () => {
    const response = await axios.post(`${api.url}:8000/join_group`, {
      user_id: user.id,
      group : group.username,
      type: "join"
    });
    if(response.ok==0){
      alert("You are already a member of this group");
      return;
    }
    console.log("in join");
    console.log(group);
    //setgroup({...group,member:1});
  };
  const handleMember = async () => {
  }
  // const handleMember = () => {
  //   console.log("in member");
  //   console.log(group);
  //   const response = axios.post(`http://localhost:8000/join_group`, {
  //     user_id: user.id,
  //     group : group.username,
  //   type: "Delete"
  //   });
  //   fmembers();
  //   //setgroup({...group,member:0});
  // }; 
  const handlemodal = () => { 
    setShowModal(true);
  }
  const handlemodalbox = () => {
    setShowModal(false);
  }
const [members, setMembers] = useState([]);
  const fmembers= async () => {
    try {
      const response = await axios.get(`${api.url}:8000/groupmembers`,
        {
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

  return (
    <div className='info'>
      <div className='info-cover'>
        <img src={coverImg} alt='' />
        <img  src={`${api.url}:8000/${group.img}`} alt='profile' />
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
        <Button className="logout" onClick={handlemodal} style={{ width: "150px" }}>
        <FontAwesomeIcon icon={faUserFriends}/>
         Members
          </Button>)}
          <Modal show={showModal} onHide={handlemodalbox} dialogClassName="custom-modal" >
          <Modal.Header closeButton>
            <Modal.Title>MemberList</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  <Tabs defaultActiveKey="request">
 {1 && 1 && 1 == 1 && (
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
            <Button variant="secondary" onClick={handlemodalbox}>Close</Button>
          </Modal.Footer>
        </Modal>

        {group.username === user.username ? (
          <Link to={`/profile/edit/${group.username}`}>
            <button>
              <BiLogOut />
              Edit ProFILE
            </button>
          </Link>
        ) : (
<button onClick={group.member === 1 ? handleMember : handleJoin}>
  <FontAwesomeIcon icon={faUserFriends} />
  {group.member === 1 ? (
    "Joined"
  ) : (
    "Join"
  )}
</button>
        )}
      </div>
    </div>
  );
};

export default Info;