import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import BarChart from '../../elements/BarChart';

// Function to process data for reservation counts per topic
const processReservasiByTopik = (data) => {
  const counts = data.reduce((acc, curr) => {
    const topicList = curr.topic; // Assuming topic is an array
    topicList.forEach(topic => {
      if (acc[topic]) {
        acc[topic] += 1;
      } else {
        acc[topic] = 1;
      }
    });
    return acc;
  }, {});

  const categories = Object.keys(counts);
  const values = Object.values(counts);

  return { categories, values };
};

const BarSumTopik = () => {
  const [processedData, setProcessedData] = useState({ categories: [], values: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservasiData = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get('https://backend-pst.vercel.app/reservasi'); 
        const data = response.data;
        const processed = processReservasiByTopik(data);
        setProcessedData(processed);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservasiData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <BarChart
        data={processedData}
        title="Jumlah Reservasi per Topik"
        subtitle="Database Reservasi"
        descriptions="Banyaknya reservasi pada setiap topik"
        seriesName="Jumlah Reservasi"
        barColor="#0093dd" // Customize this color as needed
      />
    </div>
  );
};

export default BarSumTopik;
