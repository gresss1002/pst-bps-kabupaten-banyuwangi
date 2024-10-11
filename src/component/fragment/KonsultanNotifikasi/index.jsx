import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import FormatNotifikasi from "../../elements/FormatNotifikasi";
import KonsultanModalNotifikasi from "../../pra-fragment/KonsultanModalNotifikasi";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";

const KonsultanNotifikasi = () => {
    const [userData, setUserData] = useState(null);
    const userLocal = JSON.parse(localStorage.getItem('user'));
    const [reservasi, setReservasi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idKonsultan, setIdKonsultan] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axiosInstance.get(`/users/google/${userLocal.googleId}`);
                const userData = response.data.user;
                console.log('User data:', userData);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error);
            }
        };

        getUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            setIdKonsultan(userData._id);
        }
    }, [userData]);

    useEffect(() => {
        const fetchReservasi = async () => {
            if (!idKonsultan) return;

            try {
                setLoading(true);
                console.log(`Fetching reservations for konsultanId: ${idKonsultan}`);
                const response = await axios.get(`https://backend-pst.vercel.app/reservasi/konsultan/${idKonsultan}`);
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
    }, [idKonsultan]);

    const handleEditClick = (reservasi) => {
        console.log("Edit clicked for:", reservasi);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day

    const sortedReservasi = reservasi
        .filter(rsv => 
            (rsv.status === 'Disetujui' || 
             rsv.status === 'Disetujui Admin' || 
             rsv.status === 'Disetujui Konsultan') &&
            new Date(rsv.reservasiDate) >= today // Ensure the date is today or in the future
        )
        .sort((a, b) => new Date(b.reservasiDate) - new Date(a.reservasiDate)); // Sort by date descending

    return (
        <div className="flex flex-col gap-2">
            {sortedReservasi.length === 0 ? (
                <p>No reservations found.</p>
            ) : (
                sortedReservasi.map(rsv => (
                    <Card
                        key={rsv._id}
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
                                ModalNotifkasiComponent={KonsultanModalNotifikasi} 
                            />
                        </CardBody>
                    </Card>
                ))
            )}
        </div>
    );
};

export default KonsultanNotifikasi;
