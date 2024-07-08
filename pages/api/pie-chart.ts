import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { month } = req.query;
  const client = await clientPromise;
  const db = client.db('transactionsDB');
  const collection = db.collection('transactions');

  const query = { dateOfSale: new RegExp(`^${month}`, 'i') };

  const pieChartData = await collection.aggregate([
    { $match: query },
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]).toArray();

  res.status(200).json(pieChartData.map(({ _id, count }) => ({ category: _id, count })));
};

export default handler;
