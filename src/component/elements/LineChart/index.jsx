/* eslint-disable no-unused-vars */
// components/LineChart.js

import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ data, title, xAxisTitle,colors, categories, yAxisTitle, descriptions }) => {
    const { series } = data;

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
            text: "Sumber: Data reservasi",
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
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        colors: colors,
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: categories,
            title: {
                text: xAxisTitle
            }
        },
        yaxis: {
            title: {
                text: yAxisTitle
            },
            min: 0
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };

    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="line"
                height={350}
            />
            <p className='flex justify-center text-justify font-openSans text-[14px]'>
        {descriptions}
      </p>
        </div>
    );
};

export default LineChart;
