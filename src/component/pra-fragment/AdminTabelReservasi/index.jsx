import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import TabelReservasi from "../../elements/TabelReservasi"; 
import AdminModalTabelReservasi from "../../pra-fragment/AdminModalTabelReservasi";

const AdminTabelReservasi = () => {
  const [reservasi, setReservasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservasi, setSelectedReservasi] = useState(null); // Untuk menyimpan reservasi yang dipilih untuk diedit

  // Fetch data reservasi dari API
  useEffect(() => {
    const fetchReservasi = async () => {
      try {
        const response = await axios.get('https://backend-pst.vercel.app/reservasi');  // Sesuaikan URL API jika perlu
        setReservasi(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservasi();
  }, []);

  // Fungsi untuk menangani edit reservasi
  const handleEditReservasi = (reservasi) => {
    setSelectedReservasi(reservasi); // Memilih reservasi untuk diedit
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* Tabel reservasi dengan action edit */}
      <TabelReservasi
        reservasi={reservasi}
        ModalTabelReservasiComponent={AdminModalTabelReservasi}
        onEdit={handleEditReservasi} // Menghubungkan fungsi edit
      />
      
      {/* Modal untuk edit reservasi */}
      {selectedReservasi && (
        <AdminModalTabelReservasi
          reservasi={selectedReservasi}
          onClose={() => setSelectedReservasi(null)} // Menutup modal setelah selesai
        />
      )}
    </>
  );
};

export default AdminTabelReservasi;
