/* eslint-disable no-unused-vars */
import React from 'react';// Data import sesuai konteks Anda
import BarChart from '../../elements/BarChart';
import { complaints } from '../../../data';

// Fungsi untuk memproses data menjadi jumlah reservasi per kecamatan

const processComKecamatanData = (data) => {
  // Hitung jumlah reservasi per kecamatan
  
  const counts = data.reduce((acc, curr) => {
    const kecamatan
     = curr.kecamatan
    ;
    if (acc[kecamatan
      
    ]) {
      acc[kecamatan
        
      ] += 1;
    } else {
      acc[kecamatan
        
      ] = 1;
    }
    return acc;
  }, {});

  // Ubah objek counts menjadi format yang diinginkan untuk chart
  const categories = Object.keys(counts);
  const values = Object.values(counts);

  return { categories, values };
};

const BarSumComKecamatan = () => {
  // Proses data
  const processedData = processComKecamatanData(complaints);

  return (
    <div>
      <BarChart
        data={processedData}
        title="Jumlah ComKecamatan per Konsultan"
        subtitle="Database ComKecamatan"
        descriptions="Banyaknya reservasi pada setiap kecamatan
        "
        seriesName="Jumlah ComKecamatan"
        barColor="#ea8b1c" // Warna bar chart di sini bisa diganti sesuai keinginan
        
      />
    </div>
  );
};

export default BarSumComKecamatan;
