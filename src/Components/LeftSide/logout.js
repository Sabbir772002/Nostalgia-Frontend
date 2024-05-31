import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import Modal from 'react-modal';

// Custom styling for the modal (optional)
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const LogoutButton = ({ logoutUser }) => {
  const [btnActive, setBtnActive] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const confirmLogout = () => {
    logoutUser();
    closeModal();
  };

  return (
    <div>

     <Link to="/" style={{ textDecoration: "none", color: "black" }} onClick={(e) => { e.preventDefault(); openModal(); }}>
        <div id='L-box' onClick={() => setBtnActive("logout")}>
          <BiLogOut className='margin' />
          <span>Log Out</span>
        </div>
      </Link>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Confirm Logout"
      >
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <button className='m-2 p-1 bg-primary' onClick={confirmLogout}>Yes</button>
        <button className='m-2 p-1 bg-danger' onClick={closeModal}>No</button>
      </Modal>
    </div>
  );
};

export default LogoutButton;
