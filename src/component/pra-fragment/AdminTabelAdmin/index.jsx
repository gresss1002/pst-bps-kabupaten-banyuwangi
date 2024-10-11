import React, { useState, useEffect } from "react";
import "./styles.css";
import TabelUser from "../../elements/TabelUser";
import axios from 'axios';
import AdminModalTabelAdmin from "../AdminModalTabelAdmin";

const AdminTabelAdmin = () => {
  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://backend-pst.vercel.app/users/admin'); // Adjust the endpoint if necessary
        setAdminUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <TabelUser
      users={adminUsers}
      ModalTabelUserComponent={AdminModalTabelAdmin}
    />
  );
}

export default AdminTabelAdmin;
