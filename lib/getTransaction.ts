import clientPromise from './db';
import { MongoClient, Db} from 'mongodb';
import { Transaction } from '../types/Transaction';

interface GetTransactionsParams {
  month: string;
  search?: string;
  page: number;
  perPage: number;
}


async function getTransactions({ month, search, page, perPage }: GetTransactionsParams): Promise<Transaction> {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db('your_database_name');
  const query: any = { dateOfSale: new RegExp(`^${month}`, 'i') };

  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { price: isNaN(parseFloat(search)) ? undefined : parseFloat(search) },
    ].filter(condition => condition !== undefined);
  }

  const transactions = await db.collection<Transaction>(process.env.COLLECTION as string)
    .find(query)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .toArray();

  return transactions. map(({ _id, ...transaction }) => ({
    ...transaction,
    id: _id.toString(),
    }));
}

export { getTransactions };
