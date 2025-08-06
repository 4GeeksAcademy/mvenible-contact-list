import React, { useState } from 'react';
import { Trash2, Edit, User, Phone, Mail, MapPin } from 'lucide-react';
import { useContacts } from '../ContactContext.jsx';
import DeleteModal from './DeleteModal';

const ContactCard = ({ contact }) => {
  const { deleteContact, setView } = useContacts();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteContact(contact.id);
      setShowDeleteModal(false);
    } catch (error) {
      alert('Failed to delete contact');
    }
  };

  const handleEdit = () => {
    setView('edit', contact);
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    marginBottom: '16px',
    transition: 'box-shadow 0.2s ease',
    border: '1px solid #e0e0e0'
  };

  const cardHoverStyle = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const avatarStyle = {
    width: '64px',
    height: '64px',
    backgroundColor: '#f0f0f0',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  };

  const contentStyle = {
    flex: 1
  };

  const nameStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 8px 0'
  };

  const infoContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const infoItemStyle = {
    display: 'flex',
    alignItems: 'center',
    color: '#666',
    fontSize: '14px'
  };

  const iconStyle = {
    marginRight: '8px',
    width: '16px',
    height: '16px'
  };

  const actionsStyle = {
    display: 'flex',
    gap: '8px'
  };

  const buttonStyle = {
    padding: '8px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const editButtonStyle = {
    ...buttonStyle,
    color: '#007bff',
    backgroundColor: 'transparent'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    color: '#dc3545',
    backgroundColor: 'transparent'
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div 
        style={isHovered ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={containerStyle}>
          <div style={avatarStyle}>
            <User style={{ width: '32px', height: '32px', color: '#999' }} />
          </div>
          
          <div style={contentStyle}>
            <h3 style={nameStyle}>{contact.name}</h3>
            
            <div style={infoContainerStyle}>
              {contact.phone && (
                <div style={infoItemStyle}>
                  <Phone style={iconStyle} />
                  <span>{contact.phone}</span>
                </div>
              )}
              
              {contact.email && (
                <div style={infoItemStyle}>
                  <Mail style={iconStyle} />
                  <span>{contact.email}</span>
                </div>
              )}
              
              {contact.address && (
                <div style={infoItemStyle}>
                  <MapPin style={iconStyle} />
                  <span>{contact.address}</span>
                </div>
              )}
            </div>
          </div>
          
          <div style={actionsStyle}>
            <button
              onClick={handleEdit}
              style={editButtonStyle}
              title="Edit contact"
              onMouseOver={(e) => e.target.style.backgroundColor = '#e3f2fd'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <Edit style={{ width: '20px', height: '20px' }} />
            </button>
            
            <button
              onClick={() => setShowDeleteModal(true)}
              style={deleteButtonStyle}
              title="Delete contact"
              onMouseOver={(e) => e.target.style.backgroundColor = '#ffebee'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <Trash2 style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        contactName={contact.name}
      />
    </>
  );
};

export default ContactCard;