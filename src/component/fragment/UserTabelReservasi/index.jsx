/* eslint-disable no-unused-vars */
import React from "react";
import TabelReservasi from "../../elements/TabelReservasi";
import UserModalTabelReservasi from "../../pra-fragment/UserModalTabelReservasi";
import { reservasi } from "../../../data";
import "./styles.css";

const UserTabelReservasi = () => {
    return (
        <TabelReservasi
            reservasi={reservasi}
            ModalTabelReservasiComponent={UserModalTabelReservasi}
        />
    );
}

export default UserTabelReservasi;
