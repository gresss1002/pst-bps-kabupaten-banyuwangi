import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const googleId = queryParams.get('googleId');
    const email = queryParams.get('email');
    const name = queryParams.get('name');
    
    if (googleId && email && name) {
      // Store user information in localStorage
      localStorage.setItem('user', JSON.stringify({ googleId, email, name }));

      // Redirect to another route (e.g., dashboard)
      setTimeout(() => navigate('/konsumen'), 0);  // Delay navigation to allow re-render
    } else {
      // Handle error or redirect to login if parameters are missing
      setTimeout(() => navigate('/error'), 0);  // Delay navigation to allow re-render
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Welcome;
