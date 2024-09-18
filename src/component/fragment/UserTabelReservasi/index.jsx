import React, { useState, useEffect } from 'react';
import TabelReservasi from '../../elements/TabelReservasi';
import UserModalTabelReservasi from '../../pra-fragment/UserModalTabelReservasi';
import axios from 'axios';
import './styles.css';
import axiosInstance from '../../../utils/axiosInstance';

const UserTabelReservasi = () => {
    const [userData, setUserData] = useState(null); // State for storing user data
    const userLocal = JSON.parse(localStorage.getItem('user')); // Getting user from localStorage

    const [reservasi, setReservasi] = useState([]); // State for storing reservations
    const [selectedReservasi, setSelectedReservasi] = useState(null); // State for selected reservation
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const [idKonsumen, setIdKonsumen] = useState(''); // State for storing user ID (idKonsumen)

    // Fetch user data based on Google ID from localStorage
    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axiosInstance.get(`/users/google/${userLocal.googleId}`);
                const userData = response.data.user;
                console.log('User data:', response.data.user);
                setUserData(userData); // Set user data after fetching
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getUserData(); // Call the function to fetch user data
    }, [userLocal.googleId]); // Re-run when googleId changes

    // Set idKonsumen once userData is available
    useEffect(() => {
        if (userData) {
            setIdKonsumen(userData._id); // Set the idKonsumen from userData
        }
    }, [userData]); // Run this effect when userData changes

    // Fetch reservations based on idKonsumen
    useEffect(() => {
        const fetchReservasi = async () => {
            if (!idKonsumen) return; // Skip fetching if idKonsumen is not available

            try {
                setLoading(true); // Set loading state to true
                console.log(`Fetching reservations for userId: ${idKonsumen}`);
                const response = await axios.get(`https://backend-pst.vercel.app/reservasi/konsumen/${idKonsumen}`);
                console.log('Response data:', response.data);
                setReservasi(response.data); // Set the fetched reservations
            } catch (err) {
                setError(err); // Set error if fetching fails
                console.error('Error fetching reservations:', err);
            } finally {
                setLoading(false); // Set loading state to false
            }
        };

        fetchReservasi(); // Call the function to fetch reservations
    }, [idKonsumen]); // Re-fetch when idKonsumen changes

    // Handle the edit action for reservation
    const handleEditReservasi = (reservasi) => {
        setSelectedReservasi(reservasi); // Set the selected reservation
    };

    // If loading, display a loading message
    if (loading) return <p>Loading...</p>;

    // If there's an error, display the error message
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {/* Render the table of reservations */}
            <TabelReservasi
                reservasi={reservasi}
                ModalTabelReservasiComponent={UserModalTabelReservasi}
                onEdit={handleEditReservasi}
            />
            
            {/* If a reservation is selected, open the modal */}
            {selectedReservasi && (
                <UserModalTabelReservasi
                    reservasi={selectedReservasi}
                    onClose={() => setSelectedReservasi(null)} // Close the modal when onClose is triggered
                />
            )}
        </>
    );
};

export default UserTabelReservasi;
