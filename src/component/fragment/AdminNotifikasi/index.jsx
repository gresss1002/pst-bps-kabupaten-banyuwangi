import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import FormatNotifikasi from "../../elements/FormatNotifikasi";
import AdminModalNotifikasi from "../../pra-fragment/AdminModalNotifikasi";
import axiosInstance from "../../../utils/axiosInstance"; // Remove unused import 'axios'

const AdminNotifikasi = () => {
    const [reservasi, setReservasi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservasi = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/reservasi'); // Adjust the endpoint as necessary
                setReservasi(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching reservations:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservasi();
    }, []);

    const handleEditClick = (rsv) => {
        // Implement your logic for handleEditClick here
        console.log("Edit clicked for:", rsv);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

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
                            key={rsv._id} // Use _id or another unique identifier from the reservation data
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
                                    ModalNotifkasiComponent={AdminModalNotifikasi} 
                                />
                            </CardBody>
                        </Card>
                    ))
            )}
        </div>
    );
};

export default AdminNotifikasi;
