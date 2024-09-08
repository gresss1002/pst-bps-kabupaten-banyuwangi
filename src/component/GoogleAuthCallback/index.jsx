import React, { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const GoogleAuthCallback = () => {
    useEffect(() => {
        // Proses setelah login berhasil
        axiosInstance.get('/auth/google/callback')
            .then(response => {
                const data = response.data;
                if (data.googleId && data.email && data.name && data.role) {
                    // Simpan data pengguna ke localStorage
                    localStorage.setItem('googleId', data.googleId);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('role', data.role);

                    console.log('Login successful:', data);

                    // Redirect berdasarkan role pengguna
                    if (data.role === 'Konsumen') {
                        window.location.href = '/konsumen';
                    } else if (data.role === 'Konsultan') {
                        window.location.href = '/konsultan';
                    } else if (data.role === 'Admin') {
                        window.location.href = '/admin';
                    } else {
                        console.error('Invalid role');
                    }
                } else {
                    console.error('Login failed or missing user data');
                }
            })
            .catch(error => {
                console.error('Error during Google login:', error);
            });
    }, []);

    return <div>Loading...</div>;
};

export default GoogleAuthCallback;
