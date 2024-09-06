import React from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { reservasi } from "../../../data";
// import UserFormatNotifikasi from "../../elements/UserFormatNotifikasi";
// import ModalNotifikasi from "../../elements/UserModalNotifikasi";
import FormatNotifikasi from "../../elements/FormatNotifikasi";
import KonsultanModalNotifikasi from "../../pra-fragment/KonsultanModalNotifikasi";
import AdminModalNotifikasi from "../../pra-fragment/AdminModalNotifikasi";

const AdminNotifikasi = () => {

    const handleEditClick = (reservasi) => {
        // Implementasikan logika untuk handleEditClick
    };

    return (
        <div className="flex flex-col gap-2">
            {reservasi.map((rsv) => (
                (rsv.status === 'Disetujui' || rsv.status === 'Diubah Admin' || rsv.status === 'Diubah Konsultan') && (
                    <Card
                        key={rsv.key}
                        style={{
                            border: "1px solid #f0f0f0",
                            borderRadius: "15px",
                            width: "100%",
                            backgroundColor: rsv.status === 'Disetujui' ? '#68b92e' : '#ea8b1c'
                        }}
    
                        onClick={() => handleEditClick(rsv)}
                    >
                        <CardBody>
                                <FormatNotifikasi reservasi={rsv} ModalNotifkasiComponent={AdminModalNotifikasi} />
                                {/* <UserFormatNotifikasi reservasi={rsv} /> */}
                        </CardBody>
                    </Card>
                )
            ))}
        </div>
    );
}

export default AdminNotifikasi;
