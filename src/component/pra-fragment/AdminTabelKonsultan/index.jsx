import React, { useState, useEffect } from "react";
import "./styles.css";
import TabelUser from "../../elements/TabelUser";
import AdminModalTabelKonsultan from "../AdminModalTabelKonsultan";
import axios from 'axios';

const AdminTabelKonsultan = () => {
  const [konsultanUsers, setKonsultanUsers] = useState([]);

  useEffect(() => {
    const fetchKonsultanUsers = async () => {
      try {
        const response = await axios.get('https://backend-pst.vercel.app/users/konsultan'); // Adjust the endpoint if necessary
        setKonsultanUsers(response.data);
      } catch (error) {
        console.error('Error fetching konsultan users:', error);
      }
    };

    fetchKonsultanUsers();
  }, []);

  return (
    <TabelUser
      users={konsultanUsers}
      ModalTabelUserComponent={AdminModalTabelKonsultan}
    />
  );
}

export default AdminTabelKonsultan;
