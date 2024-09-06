/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css";
import TabelUser from "../../elements/TabelUser";
import AdminModalTabelUsers from "../../pra-fragment/AdminModalTabelUsers";
import { user } from "../../../data";
const AdminTabelUser = () => {
    // Filter users with role 'konsumen'
    const konsumenUsers = user.filter(user => user.role === 'Konsumen');

    return (
        <TabelUser
            users={konsumenUsers}
            ModalTabelUserComponent={AdminModalTabelUsers}
        />
    );
}

export default AdminTabelUser;
