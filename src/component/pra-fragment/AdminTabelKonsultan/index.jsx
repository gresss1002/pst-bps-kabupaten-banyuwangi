/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css";
import TabelUser from "../../elements/TabelUser";
import AdminModalTabelKonsultan from "../AdminModalTabelKonsultan";
import { user } from "../../../data";


const AdminTabelKonsultan = () => {
    // Filter users with role 'konsumen'
    const konsultanUsers = user.filter(user => user.role === 'Konsultan');

    return (
        <TabelUser
            users={konsultanUsers}
            ModalTabelUserComponent={AdminModalTabelKonsultan}
        />
    );
}

export default AdminTabelKonsultan;
