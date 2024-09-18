/* eslint-disable no-unused-vars */
import React from 'react';
import LineChart from '../../elements/LineChart';
import { reservasi } from '../../../data'; // Data import sesuai konteks Anda
import dayjs from 'dayjs'; // Gunakan dayjs untuk manipulasi tanggal

// Fungsi untuk memproses data menjadi jumlah reservasi per hari
const processReservasiData = (data) => {
  // Hitung jumlah reservasi per hari
  const counts = data.reduce((acc, curr) => {
    // Konversi reservasiDate ke format 'YYYY-MM-DD'
    const date = dayjs(curr.reservasiDate).format('YYYY-MM-DD');
    
    if (acc[date]) {
      acc[date] += 1;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  // Ubah objek counts menjadi format yang diinginkan untuk chart
  const categories = Object.keys(counts); // Tanggal-tanggal unik
  const values = Object.values(counts); // Jumlah reservasi per tanggal

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
        data={processedData.series}
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
