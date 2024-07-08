import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { month } = req.query;

  const [transactions, statistics, barChart, pieChart] = await Promise.all([
    axios.get(`${process.env.BASE_URL}/api/transactions`, { params: { month } }),
    axios.get(`${process.env.BASE_URL}/api/statistics`, { params: { month } }),
    axios.get(`${process.env.BASE_URL}/api/bar-chart`, { params: { month } }),
    axios.get(`${process.env.BASE_URL}/api/pie-chart`, { params: { month } })
  ]);

  res.status(200).json({
    transactions: transactions.data,
    statistics: statistics.data,
    barChart: barChart.data,
    pieChart: pieChart.data,
  });
};

export default handler;
