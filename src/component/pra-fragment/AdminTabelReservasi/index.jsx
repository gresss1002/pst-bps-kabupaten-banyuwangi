/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css";
import TabelReservasi from "../../elements/TabelReservasi";
import { reservasi } from "../../../data";
import AdminModalTabelReservasi from "../AdminModalTabelReservasi";

const AdminTabelReservasi = () => {
    return (
        <TabelReservasi
            reservasi={reservasi}
            ModalTabelReservasiComponent={AdminModalTabelReservasi}
        />
    );
}

export default AdminTabelReservasi;
