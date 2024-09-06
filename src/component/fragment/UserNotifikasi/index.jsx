import React from "react";
import { Card, CardBody, Stack } from "@chakra-ui/react";
import FormatNotifikasi from "../../elements/FormatNotifikasi";
import UserModalNotifikasi from "../../pra-fragment/UserModalNotifikasi";
import { reservasi } from "../../../data";

const UserNotifikasi = () => {

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
                                <FormatNotifikasi reservasi={rsv} ModalNotifkasiComponent={UserModalNotifikasi} />
                        </CardBody>
                    </Card>
                )
            ))}
        </div>
    );
}

export default UserNotifikasi;
