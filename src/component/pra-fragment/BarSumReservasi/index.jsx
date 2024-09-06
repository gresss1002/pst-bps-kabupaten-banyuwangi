/* eslint-disable no-unused-vars */
import React from 'react';
import { reservasi } from '../../../data'; // Data import sesuai konteks Anda
import BarChart from '../../elements/BarChart';

// Fungsi untuk memproses data menjadi jumlah reservasi per konsultan
const processReservasiData = (data) => {
  // Hitung jumlah reservasi per konsultan
  const counts = data.reduce((acc, curr) => {
    const konsultan = curr.konsultan;
    if (acc[konsultan]) {
      acc[konsultan] += 1;
    } else {
      acc[konsultan] = 1;
    }
    return acc;
  }, {});

  // Ubah objek counts menjadi format yang diinginkan untuk chart
  const categories = Object.keys(counts);
  const values = Object.values(counts);

  return { categories, values };
};

const BarSumReservasi = () => {
  // Proses data
  const processedData = processReservasiData(reservasi);

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
