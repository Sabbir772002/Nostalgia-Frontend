import React from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, closeModal, editedContent, setEditedContent, handleUpdate }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Post Modal"
      className="edit-modal"
      overlayClassName="edit-modal-overlay"
    >
      <textarea
        className="edit-textarea"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        rows={4}
        cols={50}
        placeholder="Edit your post..."
      />
      <div className="edit-buttons">
        <button className="update-button" onClick={handleUpdate}>Update</button>
        <button className="cancel-button" onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
};

export default EditModal;
