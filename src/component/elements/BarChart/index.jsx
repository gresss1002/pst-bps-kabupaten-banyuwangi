// components/BarChart.js

import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ data, title, subtitle, seriesName, barColor, descriptions }) => {
  const { categories, values } = data;

  // Tentukan nilai maksimum dari data dan tambah 4 untuk mengatur maksimum sumbu x
  const maxDataValue = Math.max(...values);

  const options = {
    title: {
      text: title,
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
      text: `Sumber: ${subtitle}`,
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
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    xaxis: {
      categories: categories,
      min: 0,
      max: maxDataValue,
      tickAmount: maxDataValue,
      labels: {
        formatter: function (value) {
          return value.toFixed(0);
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(0);
      },
      offsetX: 25,
      style: {
        colors: ["#000000"],
        fontWeight: 500,
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    colors: [barColor],
  };

  const series = [
    {
      name: seriesName,
      data: values,
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="400px"
      />
      <p className='flex justify-center text-justify font-openSans text-[14px]'>
        {descriptions}
      </p>
    </div>
  );
};

export default BarChart;
