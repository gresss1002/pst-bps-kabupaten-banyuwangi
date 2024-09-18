/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const GoogleAuthCallback = () => {
    useEffect(() => {
        // Proses setelah login berhasil
        axiosInstance.get('/auth/google/callback')
            .then(response => {
                const data = response.data;

                // Logging data untuk debugging
                console.log('API Response:', data);  // Pastikan role dikirim dengan benar

                if (data.googleId && data.email && data.name) {
                    // Simpan data pengguna ke localStorage
                    localStorage.setItem('googleId', data.googleId);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('name', data.name);
                    
                    // Jika role tidak ada, set ke "Konsumen" secara default
                    const role = data.role || 'Konsumen';
                    localStorage.setItem('role', role);

                    // Verifikasi apakah role tersimpan dengan benar di localStorage
                    console.log('Stored role in localStorage:', localStorage.getItem('role'));

                    console.log('Login successful with role:', role);

                    // Redirect berdasarkan role pengguna
                    if (role === 'Konsumen') {
                        window.location.href = '/konsumen';
                    } else if (role === 'Konsultan') {
                        window.location.href = '/konsultan';
                    } else if (role === 'Admin') {
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
