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

    return (
        <div className="flex flex-col gap-2">
            {reservasi.length === 0 ? (
                <p>No reservations found.</p>
            ) : (
                reservasi
                    .filter(rsv => 
                        rsv.status === 'Disetujui' || 
                        rsv.status === 'Diubah Admin' || 
                        rsv.status === 'Diubah Konsultan'
                    )
                    .map(rsv => (
                        <Card
                            key={rsv._id} // Use _id or another unique identifier from the reservation data
                            style={{
                                border: "1px solid #f0f0f0",
                                borderRadius: "15px",
                                width: "100%",
                                backgroundColor: rsv.status === 'Disetujui' ? '#68b92e' : '#ea8b1c'
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
