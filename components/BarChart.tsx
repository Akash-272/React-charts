"use client"
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../lib/chart'; // Import the Chart.js registration

const BarChart = ({ month }: { month: string }) => {
  const [barChartData, setBarChartData] = useState<{ range: string, count: number }[]>([]);

  useEffect(() => {
    axios.get('/api/bar-chart', { params: { month } })
      .then(response => setBarChartData(response.data));
  }, [month]);

  const data = {
    labels: barChartData.map(data => data.range),
    datasets: [{
      label: 'Number of Items',
      data: barChartData.map(data => data.count),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return <Bar data={data} />;
};

export default BarChart;
