import React, { useEffect, useState } from "react";
import TabelReservasi from "../../elements/TabelReservasi";
import KonsultanModalTabelReservasi from "../../pra-fragment/KonsultanModalTabelReservasi";
import axios from "axios";
import "./styles.css";
import axiosInstance from "../../../utils/axiosInstance";

const KonsultanTabelReservasi = () => {

    const [userData, setUserData] = useState(null); // State for storing user data
    const userLocal = JSON.parse(localStorage.getItem('user')); // Getting user from localStorage

    const [reservasi, setReservasi] = useState([]);
    const [selectedReservasi, setSelectedReservasi] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idKonsultan, setIdKonsultan] = useState(''); // State for storing user ID (idKonsumen)

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
}, [userLocal.googleId]);

useEffect(() => {
    if (userData) {
        setIdKonsultan(userData._id); // Set the idKonsumen from userData
    }
}, [userData]); 

    useEffect(() => {
        const fetchReservasi = async () => {
            if (!idKonsultan) return;

            try {
                setLoading(true);
                console.log(`Fetching reservations for konsultanId: ${idKonsultan}`); // Debugging
                const response = await axios.get(`https://backend-pst.vercel.app/reservasi/konsultan/${idKonsultan}`);
                console.log('Response data:', response.data); // Debugging
                setReservasi(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching reservations:', err); // Debugging
            } finally {
                setLoading(false);
            }
        };

        fetchReservasi();
    }, [idKonsultan]); // Re-fetch if idKonsultan changes

    const handleEditReservasi = (reservasi) => {
        setSelectedReservasi(reservasi);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <TabelReservasi
                reservasi={reservasi}
                ModalTabelReservasiComponent={KonsultanModalTabelReservasi}
                onEdit={handleEditReservasi}
            />
            {selectedReservasi && (
                <KonsultanModalTabelReservasi
                    reservasi={selectedReservasi}
                    onClose={() => setSelectedReservasi(null)}
                />
            )}
        </>
    );
};

export default KonsultanTabelReservasi;
