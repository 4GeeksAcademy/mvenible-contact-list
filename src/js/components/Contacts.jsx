import React from 'react';
import { Plus, User } from 'lucide-react';
import { useContacts } from '../ContactContext.jsx';
import ContactCard from './ContactCard';

const Contacts = () => {
  const { contacts, loading, error, setView } = useContacts();

  const containerStyle = {
    padding: '0'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0
  };

  const addButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  };

  const loadingContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px'
  };

  const spinnerStyle = {
    width: '48px',
    height: '48px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const errorStyle = {
    textAlign: 'center',
    padding: '32px',
    color: '#dc3545'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '48px 0'
  };

  const emptyIconStyle = {
    width: '64px',
    height: '64px',
    color: '#ccc',
    margin: '0 auto 16px'
  };

  const emptyTitleStyle = {
    color: '#999',
    fontSize: '18px',
    marginBottom: '8px'
  };

  const emptySubtitleStyle = {
    color: '#bbb',
    fontSize: '14px'
  };

  const contactsListStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <div style={spinnerStyle}></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorStyle}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Contacts</h1>
        <button
          onClick={() => setView('add')}
          style={addButtonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          <Plus style={{ width: '20px', height: '20px' }} />
          <span>Add Contact</span>
        </button>
      </div>

      {contacts.length === 0 ? (
        <div style={emptyStateStyle}>
          <User style={emptyIconStyle} />
          <p style={emptyTitleStyle}>No contacts yet</p>
          <p style={emptySubtitleStyle}>Start by adding your first contact!</p>
        </div>
      ) : (
        <div style={contactsListStyle}>
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;