// components/LineChartWithRandomColors.js

import React from 'react';
import Chart from 'react-apexcharts'; // Assuming you're using ApexCharts

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const SlopeChart = ({ seriesData, chartTitle, yAxisLabel, xAxisCategories }) => {
  // Generate random colors for each series
  const colors = seriesData.map(() => getRandomColor());

  const options = {
    chart: {
      type: 'line',
      height: 350,
    },
    title: {
      text: chartTitle,
      align: 'center',
    },
    xaxis: {
      categories: xAxisCategories,
    },
    yaxis: {
      title: {
        text: yAxisLabel,
      },
    },
    colors: colors, // Use the random colors generated
    stroke: {
      width: [2, 2, 2, 2], // Customize as needed
      curve: 'smooth',     // Customize as needed
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
    },
  };

  return <Chart options={options} series={seriesData} type="line" height={350} />;
};

export default SlopeChart;
