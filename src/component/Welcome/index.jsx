import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ fetchUserData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndProcessUserData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const googleId = queryParams.get('googleId');
      const email = queryParams.get('email');
      const name = queryParams.get('name');

      console.log('Query params:', { googleId, email, name });

      try {
        if (googleId && email && name) {
          console.log('Login successful with:', { googleId, email, name });

          // Simpan informasi pengguna ke localStorage
          localStorage.setItem('user', JSON.stringify({ googleId, email, name }));

          // Ambil data user dari fungsi fetchUserData, pastikan googleId dikirim jika diperlukan
          const userData = await fetchUserData(googleId);  // Pastikan fetchUserData menerima googleId

          if (userData) {
            console.log('Fetched user data:', userData);

            // Redirect berdasarkan role pengguna
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
            // Jika userData null, tangani dengan menampilkan error atau redirect ke error page
            console.error('User data not found or invalid.');
            navigate('/error');
          }
        } else {
          console.error('Query parameters missing');
          navigate('/error');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/error'); // Redirect ke error page jika terjadi error
      }
    };

    fetchAndProcessUserData();
  }, [fetchUserData, navigate]);

  return <div>Loading...</div>;
};

export default Welcome;
