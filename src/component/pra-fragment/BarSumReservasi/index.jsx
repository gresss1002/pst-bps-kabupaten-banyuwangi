/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import BarChart from '../../elements/BarChart';

// Fungsi untuk memproses data menjadi jumlah reservasi per konsultan
const processReservasiData = (data) => {
  // Hitung jumlah reservasi per konsultan
  const counts = data.reduce((acc, curr) => {
    // Combine consultant name and ID for unique identification
    const konsultanIdentifier = `${curr.konsultanName} (${curr.idKonsultan})`; 
    if (acc[konsultanIdentifier]) {
      acc[konsultanIdentifier] += 1;
    } else {
      acc[konsultanIdentifier] = 1;
    }
    return acc;
  }, {});

  // Ubah objek counts menjadi format yang diinginkan untuk chart
  // Hanya tampilkan nama konsultan untuk kategori
  const categories = Object.keys(counts).map(item => {
    // Extract name from unique identifier
    const match = item.match(/^(.+?) \(/);
    return match ? match[1] : item;
  });
  const values = Object.values(counts);

  return { categories, values };
};

const BarSumReservasi = () => {
  const [reservasiData, setReservasiData] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch consultant data
    const fetchConsultants = async () => {
      try {
        const response = await axios.get('https://backend-pst.vercel.app/users/konsultan');
        setConsultants(response.data);
      } catch (err) {
        setError('Error fetching consultant data');
        console.error('Error fetching consultant data:', err);
      }
    };

    fetchConsultants();
  }, []);

  useEffect(() => {
    // Fetch reservation data
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-pst.vercel.app/reservasi'); // Ganti dengan endpoint API Anda
        const reservasiList = response.data;

        // Map consultant IDs to names
        const idToNameMap = consultants.reduce((map, user) => {
          map[user._id.toString()] = user.name;
          return map;
        }, {});

        // Update reservasi data with consultant names
        const updatedReservasi = reservasiList.map(reservasi => ({
          ...reservasi,
          konsultanName: idToNameMap[reservasi.idKonsultan] || 'Unknown Consultant'
        }));

        setReservasiData(updatedReservasi);
      } catch (err) {
        setError('Error fetching reservation data');
        console.error('Error fetching reservation data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (consultants.length > 0) {
      fetchData();
    }
  }, [consultants]);

  // Filter data untuk mengecualikan reservasi dengan status "Menunggu Konfirmasi"
  const filteredData = reservasiData.filter(item => item.status !== "Menunggu Konfirmasi");

  // Proses data
  const processedData = processReservasiData(filteredData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <BarChart
        data={processedData}
        title="Jumlah Reservasi per Konsultan"
        subtitle="Database Reservasi"
        descriptions="Banyaknya reservasi pada setiap konsultan"
        seriesName="Jumlah Reservasi"
        barColor="#ea8b1c" // Warna bar chart di sini bisa diganti sesuai keinginan
      />
    </div>
  );
};

export default BarSumReservasi;
