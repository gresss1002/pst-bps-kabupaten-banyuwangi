/* eslint-disable no-unused-vars */
import React from 'react';
import Chart from 'react-apexcharts';

// Komponen DonutChart
const DonutChart = ({ series, labels, chartTitle, chartSubtitle, chartColors, chartWidth, legendPosition }) => {
  // Opsi chart yang bisa dikonfigurasi melalui props
  const options = {
    chart: {
      type: 'donut',
      width: chartWidth || 380, // default width if not provided
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: legendPosition || 'bottom', // default position if not provided
        }
      }
    }],
    title: {
      text: chartTitle || 'Donut Chart',
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "Inter, sans-serif",
        color: "#002b6a",
      },
    },
    subtitle: {
      text: chartSubtitle || '',
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 30,
      floating: true,
      style: {
        fontSize: "12px",
        fontWeight: "normal",
        fontFamily: "Open Sans, sans-serif",
        color: "#9C9898",
      },
    },
    colors: chartColors || ['#FF4560', '#00E396', '#008FFB', '#FF66C3', '#775DD0'],
    legend: {
      show: true,
      position: legendPosition || 'bottom',
    },
    labels: labels || [], // Menambahkan label untuk setiap kategori
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height="400px"
      />
    </div>
  );
};

export default DonutChart;
