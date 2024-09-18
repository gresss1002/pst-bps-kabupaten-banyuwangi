import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ fetchUserData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchAndProcessUserData = async () => {
      // Ambil query parameters dari URL
      const queryParams = new URLSearchParams(window.location.search);
      const googleId = queryParams.get('googleId');
      const email = queryParams.get('email');
      const name = queryParams.get('name');

      console.log('Query params:', { googleId, email, name });

      try {
        // Cek apakah query parameter ada
        if (googleId && email && name) {
          console.log('Login successful with:', { googleId, email, name });

          // Simpan informasi pengguna ke localStorage
          localStorage.setItem('user', JSON.stringify({ googleId, email, name }));

          // Ambil data user dari fungsi fetchUserData
          const userData = await fetchUserData(googleId);  // Misalnya fetchUserData memerlukan googleId

          console.log('Fetched user data:', userData);

          // Redirect berdasarkan role pengguna
          if (userData?.role === 'Konsumen') {
            navigate('/konsumen');
          } else if (userData?.role === 'Konsultan') {
            navigate('/konsultan');
          } else if (userData?.role === 'Admin') {
            navigate('/admin');
          } else {
            navigate('/error');
          }
        } else {
          // Jika query parameter tidak lengkap, redirect ke error page
          console.error('Query parameters missing');
          navigate('/error');
        }
      } catch (error) {
        console.error('Error fetching user data or processing login:', error);
        navigate('/error'); // Redirect ke error page jika terjadi error
      }
    };

    // Panggil fungsi async
    fetchAndProcessUserData();
  }, [fetchUserData, navigate]); // Tambahkan dependencies

  return <div>Loading...</div>;
};

export default Welcome;
