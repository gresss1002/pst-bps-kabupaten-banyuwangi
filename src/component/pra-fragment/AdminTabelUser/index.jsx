import React, { useState, useEffect } from "react";
import "./styles.css";
import TabelUser from "../../elements/TabelUser";
import AdminModalTabelUsers from "../../pra-fragment/AdminModalTabelUsers";
import axios from 'axios';

const AdminTabelUser = () => {
  const [konsumenUsers, setKonsumenUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://backend-pst.vercel.app/users/konsumen'); // Adjust the endpoint if necessary
        setKonsumenUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <TabelUser
      users={konsumenUsers}
      ModalTabelUserComponent={AdminModalTabelUsers}
    />
  );
}

export default AdminTabelUser;
