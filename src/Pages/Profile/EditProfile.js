import React, { useState, useEffect } from 'react';
import Left from '../../Components/LeftSide/Left';
import Nav from '../../Components/Navigation/Nav';
import EditPro from '../../Components/EditPro/EditPro';
import Overseer from '../../Components/EditPro/Overseer/Overseer';
import "../Profile/Profile.css";
import ProfileImg from "../../assets/profile.jpg";
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditProfile = () => {
  const { username } = useParams();
  const [following, setFollowing] = useState(3);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [profileImg] = useState(ProfileImg);
  const [modelDetails] = useState({
    ModelName: "",
    ModelUserName: "",
    ModelCountryName: "",
    ModelJobName: ""
  });
  const rawUser = localStorage.getItem('userData');
  const userd = React.useMemo(() => rawUser ? JSON.parse(rawUser) : {}, [rawUser]);
  const currentUsername = userd.username || '';
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (currentUsername && username !== currentUsername) {
      setShowModal(true);
    }
  }, [username, currentUsername]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (currentUsername && username !== currentUsername) {
    navigate(currentUsername ? `/profile/edit/${currentUsername}` : '/login');
    return null;
  }

  return (
    <div className='interface'>
                 <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are not authorized to edit this profile.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <Nav
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        profileImg={profileImg}
        />
      <div className="home">
        <Left 
        following={following}
        setFollowing={setFollowing}
        profileImg={profileImg}
        modelDetails={modelDetails}
        
        />

        <EditPro/>
        
       <Overseer/>
      </div>
    </div>
  )
}

export default EditProfile