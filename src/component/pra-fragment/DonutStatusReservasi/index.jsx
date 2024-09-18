import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import DonutChart from '../../elements/DonutChart'; // Ensure the path to DonutChart is correct

// Function to generate random colors
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
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservasiData = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get('https://backend-pst.vercel.app/reservasi');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservasiData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const processReservasiData = (data) => {
        // Count reservations by status
        const counts = data.reduce((acc, curr) => {
          const status = curr.status;
          if (acc[status]) {
            acc[status] += 1;
          } else {
            acc[status] = 1;
          }
          return acc;
        }, {});

        // Convert counts object to the desired format for chart
        const labels = Object.keys(counts); // Get categories as labels
        const values = Object.values(counts); // Get counts as series

        return { labels, values };
      };

      const processed = processReservasiData(data);
      setProcessedData(processed);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Get random colors for each category
  const colors = getRandomColors(processedData.labels.length);

  return (
    <div>
      <DonutChart
        series={processedData.values}
        labels={processedData.labels} // Pass labels to DonutChart
        chartTitle="Jumlah Reservasi Menurut Status"
        chartSubtitle="Distribusi status reservasi"
        chartColors={colors} // Use random colors
        legendPosition="bottom"
      />
    </div>
  );
};

export default DonutStatusReservasi;
