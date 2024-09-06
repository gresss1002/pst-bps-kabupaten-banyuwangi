/* eslint-disable no-unused-vars */
// components/TopicsPerDayChart.js

import React from 'react';
import { reservasi } from '../../../data';
import SlopeChart from '../../elements/SlopeChart';

const SlopeDaysTopik = () => {
  // Function to count topics per day
  const countTopicsPerDay = (reservasi) => {
    const topicCounts = {};

    reservasi.forEach((item) => {
      const { date, topic } = item;

      // Initialize the date entry if it doesn't exist
      if (!topicCounts[date]) {
        topicCounts[date] = {};
      }

      // Initialize the topic count for the date if it doesn't exist
      if (!topicCounts[date][topic]) {
        topicCounts[date][topic] = 0;
      }

      // Increment the count for the topic
      topicCounts[date][topic] += 1;
    });

    return topicCounts;
  };

  // Process the `reservasi` data
  const topicCounts = countTopicsPerDay(reservasi);

  // Prepare the data for the chart
  const dates = Object.keys(topicCounts);
  const topicNames = [...new Set(reservasi.map(item => item.topic))];

  const seriesData = topicNames.map(topic => ({
    name: topic,
    data: dates.map(date => ({
      x: date,
      y: topicCounts[date][topic] || 0, // Default to 0 if the topic isn't present on that date
    })),
  }));

  return (
    <div>
      <h2>Number of Topics Per Day</h2>
      <SlopeChart
        seriesData={seriesData}
        chartTitle="Topics Per Day"
        yAxisLabel="Number of Topics"
        xAxisCategories={dates}
      />
    </div>
  );
};

export default SlopeDaysTopik;
