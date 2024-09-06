/* eslint-disable no-unused-vars */
import React from 'react';
import DonutChart from '../../elements/DonutChart'; // Pastikan path ke DonutChart sudah benar
import { reservasi } from '../../../data';

// Fungsi untuk menghasilkan warna acak
const getRandomColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    // Generate a random color in hex format
    const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    colors.push(color);
  }
  return colors;
};

const DonutStatusReservasi = () => {
  // Fungsi untuk memproses data menjadi format yang diinginkan
  const processReservasiData = (data) => {
    // Hitung jumlah reservasi per status
    const counts = data.reduce((acc, curr) => {
      const status = curr.status;
      if (acc[status]) {
        acc[status] += 1;
      } else {
        acc[status] = 1;
      }
      return acc;
    }, {});

    // Ubah objek counts menjadi format yang diinginkan untuk chart
    const labels = Object.keys(counts); // Mengambil kategori sebagai label
    const values = Object.values(counts); // Mengambil jumlah sebagai series

    return { labels, values };
  };

  // Proses data
  const processedData = processReservasiData(reservasi);

  // Dapatkan warna acak untuk setiap kategori
  const colors = getRandomColors(processedData.labels.length);

  return (
    <div>
      <DonutChart
        series={processedData.values}
        labels={processedData.labels} // Pass labels to DonutChart
        chartTitle="Jumlah Reservasi Menurut Status"
        chartSubtitle="Distribusi status reservasi"
        chartColors={colors} // Gunakan warna acak
        legendPosition="bottom"
      />
    </div>
  );
};

export default DonutStatusReservasi;
