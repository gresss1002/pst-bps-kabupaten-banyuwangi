/* eslint-disable no-unused-vars */
import React from 'react';
import LineChart from '../../elements/LineChart';
import { reservasi } from '../../../data'; // Data import sesuai konteks Anda

// Fungsi untuk memproses data menjadi jumlah reservasi per hari
const processReservasiData = (data) => {
  // Hitung jumlah reservasi per hari
  const counts = data.reduce((acc, curr) => {
    const date = curr.date; // Misalkan setiap reservasi memiliki properti 'date'
    if (acc[date]) {
      acc[date] += 1;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  // Ubah objek counts menjadi format yang diinginkan untuk chart
  const categories = Object.keys(counts);
  const values = Object.values(counts);

  // Format data untuk chart line, series harus berupa array objek
  const series = [
    {
      name: "Jumlah Reservasi",
      data: values,
    },
  ];

  return { categories, series };
};

const LineDayReservasi = () => {
  // Proses data
  const processedData = processReservasiData(reservasi);

  return (
    <div>
      <LineChart
        data={processedData}
        title="Jumlah Reservasi per Hari"
        colors={['#68b92e']} // Warna garis chart di sini bisa diganti sesuai keinginan
        categories={processedData.categories}
        xAxisTitle='Tanggal'
        yAxisTitle="Jumlah Reservasi"
        descriptions="Banyaknya reservasi yang terjadi pada setiap hari"
      />
    </div>
  );
};

export default LineDayReservasi;
