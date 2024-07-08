import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/db';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db('transactionsDB');
  const collection = db.collection('transactions');

  const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
  const data = response.data;

  await collection.deleteMany({});
  await collection.insertMany(data);

  res.status(200).json({ message: 'Database initialized' });
};

export default handler;
