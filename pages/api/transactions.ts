import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/db';
import { Transaction } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, limit = 10, month } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('your-database-name'); // Replace with your database name
    const collection = db.collection<Transaction>('transactions');

    const transactions = await collection
      .find({ month: month as string })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .toArray();

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
