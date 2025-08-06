import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, contactName }) => {
  if (!isOpen) return null;

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '400px',
    width: '100%',
    margin: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
  };

  const headerStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333'
  };

  const textStyle = {
    color: '#666',
    marginBottom: '24px',
    lineHeight: '1.5'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px'
  };

  const cancelButtonStyle = {
    padding: '8px 16px',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const deleteButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2 style={headerStyle}>Confirm Delete</h2>
        <p style={textStyle}>
          Are you sure you want to delete {contactName}? This action cannot be undone.
        </p>
        <div style={buttonContainerStyle}>
          <button
            onClick={onClose}
            style={cancelButtonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={deleteButtonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;