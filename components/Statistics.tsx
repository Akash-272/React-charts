"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }: { month: string }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    axios.get('/api/statistics', { params: { month } })
      .then(response => setStatistics(response.data));
  }, [month]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default Statistics;
