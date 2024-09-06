/* eslint-disable no-unused-vars */
import React from 'react';
import { reservasi } from '../../../data'; // Data import sesuai konteks Anda
import BarChart from '../../elements/BarChart';

// Fungsi untuk memproses data jumlah reservasi per topic
const processReservasiByTopik = (data) => {
  const counts = data.reduce((acc, curr) => {
    const topic = curr.topic;
    if (acc[topic]) {
      acc[topic] += 1;
    } else {
      acc[topic] = 1;
    }
    return acc;
  }, {});

  const categories = Object.keys(counts);
  const values = Object.values(counts);

  return { categories, values };
};

const BarSumTopik = () => {
  // Proses data
  const processedData = processReservasiByTopik(reservasi);

  return (
    <div>
      <BarChart
        data={processedData}
        title="Jumlah Reservasi per Topik"
        subtitle="Database Reservasi"
        descriptions="Banyaknya reservasi pada setiap topic"
        seriesName="Jumlah Reservasi"
        barColor="#0093dd" // Warna bar chart di sini bisa diganti sesuai keinginan
      />
    </div>
  );
};

export default BarSumTopik;
