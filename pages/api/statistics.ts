import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { month } = req.query;
  const client = await clientPromise;
  const db = client.db('transactionsDB');
  const collection = db.collection('transactions');

  const query = { dateOfSale: new RegExp(`^${month}`, 'i') };

  const totalSaleAmount = await collection.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$price' } } }
  ]).toArray();

  const totalSoldItems = await collection.countDocuments({ ...query, sold: true });
  const totalNotSoldItems = await collection.countDocuments({ ...query, sold: false });

  res.status(200).json({
    totalSaleAmount: totalSaleAmount[0]?.total || 0,
    totalSoldItems,
    totalNotSoldItems,
  });
};

export default handler;
