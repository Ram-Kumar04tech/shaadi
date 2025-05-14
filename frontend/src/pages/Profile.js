import React, { useState } from 'react';
import ConversationalOnboarding from '../components/ConversationalOnboarding';

const Profile = () => {
  const [gender] = useState('male');

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: 'linear-gradient(120deg, #f3e7e9 0%, #e3eeff 100%)',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 500 }}>
          <ConversationalOnboarding character={gender === 'male' ? 'bride' : 'groom'} />
        </div>
      </div>
    </div>
  );
};

export default Profile;