"use client"
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import '../lib/chart'; // Import the Chart.js registration

const PieChart = ({ month }: { month: string }) => {
  const [pieChartData, setPieChartData] = useState<{ category: string, count: number }[]>([]);

  useEffect(() => {
    axios.get('/api/pie-chart', { params: { month } })
      .then(response => setPieChartData(response.data));
  }, [month]);

  const data = {
    labels: pieChartData.map(data => data.category),
    datasets: [{
      data: pieChartData.map(data => data.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }],
  };

  return <Pie data={data} />;
};

export default PieChart;
