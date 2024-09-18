import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ fetchUserData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchAndProcessUserData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const googleId = queryParams.get('googleId');
      const email = queryParams.get('email');
      const name = queryParams.get('name');

      try {
        // Fetch user data
        const userData = await fetchUserData();
        console.log('Fetched user data:', userData);

        // Check if the query params exist
        if (googleId && email && name) {
          console.log('Login successful with:', { googleId, email, name });

          // Store user information in localStorage
          localStorage.setItem('user', JSON.stringify({ googleId, email, name }));

          // Redirect based on the user's role
          if (userData.role === 'Konsumen') {
            navigate('/konsumen');
          } else if (userData.role === 'Konsultan') {
            navigate('/konsultan');
          } else if (userData.role === 'Admin') {
            navigate('/admin');
          } else {
            navigate('/error');
          }
        } else {
          // Handle error or redirect to login if parameters are missing
          navigate('/error');
        }
      } catch (error) {
        console.error('Error fetching user data or processing login:', error);
        navigate('/error'); // Redirect to error page on failure
      }
    };

    // Call the async function
    fetchAndProcessUserData();
  }, [fetchUserData, navigate]);  // Add dependencies to prevent unnecessary re-renders

  return <div>Loading...</div>;
};

export default Welcome;
