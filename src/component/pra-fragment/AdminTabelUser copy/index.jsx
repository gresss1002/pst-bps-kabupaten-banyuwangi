/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css";
import { users } from "../../../data";
import TabelUser from "../../elements/TabelUser";
import AdminModalTabelUsers from "../AdminModalTabelUsers";

const AdminTabelUser = () => {
    // Filter users with role 'konsumen'
    const konsumenUsers = users.filter(user => user.role === 'konsumen');

    return (
        <TabelUser
            users={konsumenUsers}
            ModalTabelUserComponent={AdminModalTabelUsers}
        />
    );
}

export default AdminTabelUser;
