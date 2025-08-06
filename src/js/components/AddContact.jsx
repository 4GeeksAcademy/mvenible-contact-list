import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useContacts } from '../ContactContext.jsx';

const AddContact = () => {
  const { addContact, updateContact, setView, currentView, editingContact } = useContacts();
  const isEditing = currentView === 'edit' && editingContact;
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when editing contact changes
  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: editingContact.name || '',
        phone: editingContact.phone || '',
        email: editingContact.email || '',
        address: editingContact.address || ''
      });
    } else {
      // Reset form when switching to add mode
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: ''
      });
    }
  }, [isEditing, editingContact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (isEditing) {
        await updateContact(editingContact.id, formData);
      } else {
        await addContact(formData);
      }
      setView('contacts');
    } catch (error) {
      alert(`Failed to ${isEditing ? 'update' : 'add'} contact`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const backButtonStyle = {
    marginRight: '16px',
    padding: '8px',
    color: '#666',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '4px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit'
  };

  const inputFocusStyle = {
    borderColor: '#007bff',
    boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.25)'
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '80px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '12px',
    paddingTop: '16px'
  };

  const cancelButtonStyle = {
    flex: 1,
    padding: '12px 16px',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  };

  const submitButtonStyle = {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  };

  const disabledButtonStyle = {
    ...submitButtonStyle,
    backgroundColor: '#6c757d',
    cursor: 'not-allowed'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button
          onClick={() => setView('contacts')}
          style={backButtonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <ArrowLeft style={{ width: '20px', height: '20px' }} />
        </button>
        <h1 style={titleStyle}>
          {isEditing ? 'Edit Contact' : 'Add New Contact'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label htmlFor="name" style={labelStyle}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="Enter full name"
            required
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="phone" style={labelStyle}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="Enter phone number"
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="email" style={labelStyle}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="Enter email address"
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="address" style={labelStyle}>
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
            style={textareaStyle}
            placeholder="Enter address"
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, textareaStyle)}
          />
        </div>

        <div style={buttonContainerStyle}>
          <button
            type="button"
            onClick={() => setView('contacts')}
            style={cancelButtonStyle}
            disabled={isSubmitting}
            onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#f8f9fa')}
            onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = 'white')}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={isSubmitting ? disabledButtonStyle : submitButtonStyle}
            disabled={isSubmitting}
            onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#007bff')}
          >
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Contact' : 'Add Contact')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;