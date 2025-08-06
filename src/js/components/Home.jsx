import React from 'react';
import { ContactProvider, useContacts } from '../ContactContext.jsx';
import Contacts from './Contacts';
import AddContact from './AddContact';

// Main App Content Component
const HomeContent = () => {
  const { currentView } = useContacts();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'add':
      case 'edit':
        return <AddContact />;
      default:
        return <Contacts />;
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {renderCurrentView()}
      </div>
    </div>
  );
};

// Home component with Context Provider
const Home = () => {
  return (
    <ContactProvider>
      <HomeContent />
    </ContactProvider>
  );
};

export default Home;