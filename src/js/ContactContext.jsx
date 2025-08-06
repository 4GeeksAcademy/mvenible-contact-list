import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Contact Context
const ContactContext = createContext();

// Contact Reducer
const contactReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload, loading: false };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_EDIT_CONTACT':
      return { ...state, editingContact: action.payload };
    default:
      return state;
  }
};

// Contact Provider
export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, {
    contacts: [],
    loading: true,
    error: null,
    currentView: 'contacts', // 'contacts', 'add', 'edit'
    editingContact: null
  });

  const API_BASE = 'https://playground.4geeks.com/contact';
  const AGENDA_SLUG = 'my-agenda';

  // Helper function for API calls with better error handling
  const apiCall = async (url, options = {}) => {
    try {
      console.log(`Making API call to: ${url}`);
      console.log('Options:', options);
      
      const response = await fetch(url, options);
      
      console.log(`Response status: ${response.status}`);
      console.log(`Response ok: ${response.ok}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error - Status: ${response.status}, Text: ${errorText}`);
        throw new Error(`API Error: ${response.status} - ${errorText || response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  // Initialize agenda and fetch contacts
  useEffect(() => {
    const initializeAgenda = async () => {
      try {
        console.log('Initializing agenda...');
        
        // Try to get existing agenda first
        try {
          const agenda = await apiCall(`${API_BASE}/agendas/${AGENDA_SLUG}`);
          console.log('Agenda found:', agenda);
        } catch (error) {
          if (error.message.includes('404')) {
            console.log('Agenda not found, creating new one...');
            // Create agenda if it doesn't exist
            await apiCall(`${API_BASE}/agendas/${AGENDA_SLUG}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            console.log('Agenda created successfully');
          } else {
            throw error;
          }
        }
        
        // Fetch contacts
        await fetchContacts();
      } catch (error) {
        console.error('Error initializing agenda:', error);
        dispatch({ 
          type: 'SET_ERROR', 
          payload: `Failed to initialize: ${error.message}` 
        });
      }
    };

    initializeAgenda();
  }, []);

  const fetchContacts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      console.log('Fetching contacts...');
      
      const data = await apiCall(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`);
      
      const contacts = data.contacts || [];
      console.log(`Fetched ${contacts.length} contacts:`, contacts);
      
      dispatch({ type: 'SET_CONTACTS', payload: contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: `Failed to fetch contacts: ${error.message}` 
      });
    }
  };

  const addContact = async (contactData) => {
    try {
      console.log('Adding contact:', contactData);
      
      const newContact = await apiCall(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
      
      console.log('Contact added successfully:', newContact);
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      return newContact;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw new Error(`Failed to add contact: ${error.message}`);
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      console.log(`Updating contact ${id}:`, contactData);
      
      const updatedContact = await apiCall(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
      
      console.log('Contact updated successfully:', updatedContact);
      dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact });
      return updatedContact;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw new Error(`Failed to update contact: ${error.message}`);
    }
  };

  const deleteContact = async (id) => {
    try {
      console.log(`Deleting contact ${id}`);
      
      await apiCall(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'DELETE'
      });
      
      console.log('Contact deleted successfully');
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw new Error(`Failed to delete contact: ${error.message}`);
    }
  };

  const setView = (view, contact = null) => {
    dispatch({ type: 'SET_VIEW', payload: view });
    if (contact) {
      dispatch({ type: 'SET_EDIT_CONTACT', payload: contact });
    } else {
      dispatch({ type: 'SET_EDIT_CONTACT', payload: null });
    }
  };

  return (
    <ContactContext.Provider value={{
      ...state,
      addContact,
      updateContact,
      deleteContact,
      fetchContacts,
      setView
    }}>
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook to use contact context
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactProvider');
  }
  return context;
};