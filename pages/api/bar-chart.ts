import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { month } = req.query;
  const client = await clientPromise;
  const db = client.db('transactionsDB');
  const collection = db.collection('transactions');

  const query = { dateOfSale: new RegExp(`^${month}`, 'i') };

  const priceRanges = [
    [0, 100], [101, 200], [201, 300], [301, 400],
    [401, 500], [501, 600], [601, 700], [701, 800],
    [801, 900], [901, Infinity],
  ];

  const barChartData = await Promise.all(
    priceRanges.map(async ([min, max]) => {
      const count = await collection.countDocuments({ ...query, price: { $gte: min, $lt: max } });
      return { range: `${min}-${max}`, count };
    })
  );

  res.status(200).json(barChartData);
};

export default handler;
