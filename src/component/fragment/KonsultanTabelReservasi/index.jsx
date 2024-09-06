/* eslint-disable no-unused-vars */
import React from "react";
import TabelReservasi from "../../elements/TabelReservasi";
import { reservasi } from "../../../data";
import "./styles.css";
import KonsultanModalTabelReservasi from "../../pra-fragment/KonsultanModalTabelReservasi";

const KonsultanTabelReservasi = () => {
    return (
        <TabelReservasi
            reservasi={reservasi}
            ModalTabelReservasiComponent={KonsultanModalTabelReservasi}
        />
    );
}

export default KonsultanTabelReservasi;
