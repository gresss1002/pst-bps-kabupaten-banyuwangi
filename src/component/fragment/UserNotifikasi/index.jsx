import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import FormatNotifikasi from "../../elements/FormatNotifikasi";
import UserModalNotifikasi from "../../pra-fragment/UserModalNotifikasi";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";

const UserNotifikasi = () => {
    const [userData, setUserData] = useState(null); // State for storing user data
    const [reservasi, setReservasi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idKonsumen, setIdKonsumen] = useState(''); 

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userLocal = JSON.parse(localStorage.getItem('user')); // Getting user from localStorage
                if (!userLocal || !userLocal.googleId) {
                    throw new Error("User data not found");
                }
                const response = await axiosInstance.get(`/users/google/${userLocal.googleId}`);
                const userData = response.data.user;
                console.log('User data:', userData);
                setUserData(userData); // Set user data after fetching
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error); // Set error if fetching user data fails
            }
        };

        getUserData(); // Call the function to fetch user data
    }, []); // Empty dependency array ensures this runs only once

    // Set idKonsumen when userData is available
    useEffect(() => {
        if (userData) {
            setIdKonsumen(userData._id); // Set the idKonsumen from userData
        }
    }, [userData]); 

    // Fetch reservations based on idKonsumen
    useEffect(() => {
        const fetchReservasi = async () => {
            if (!idKonsumen) return;

            try {
                setLoading(true);
                console.log(`Fetching reservations for konsumenId: ${idKonsumen}`);
                const response = await axios.get(`https://backend-pst.vercel.app/reservasi/konsumen/${idKonsumen}`);
                console.log('Response data:', response.data);
                setReservasi(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching reservations:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservasi();
    }, [idKonsumen]); // Re-fetch if idKonsumen changes

    const handleEditClick = (reservasi) => {
        // Implement the logic for handleEditClick
        console.log("Edit clicked for:", reservasi);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex flex-col gap-2">
            {reservasi.length === 0 ? (
                <p>No reservations found.</p>
            ) : (
                reservasi
                    .filter(rsv => 
                        rsv.status === 'Disetujui' || 
                        rsv.status === 'Disetujui Admin' || 
                        rsv.status === 'Disetujui Konsultan'
                    )
                    .map(rsv => (
                        <Card
                            key={rsv._id} // Use _id as key if it's available
                            style={{
                                border: "1px solid #f0f0f0",
                                borderRadius: "15px",
                                width: "100%",
                                backgroundColor: rsv.status === 'Disetujui Konsultan' ? '#68b92e' : '#ea8b1c'
                            }}
                            onClick={() => handleEditClick(rsv)}
                        >
                            <CardBody>
                                <FormatNotifikasi 
                                    reservasi={rsv} 
                                    ModalNotifkasiComponent={UserModalNotifikasi} 
                                />
                            </CardBody>
                        </Card>
                    ))
            )}
        </div>
    );
}

export default UserNotifikasi;
