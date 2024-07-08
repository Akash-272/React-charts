"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Transaction {
  title: string;
  description: string;
  price: number;
  dateOfSale: string;
  sold: boolean;
  category: string;
}

const TransactionsTable = ({ month }: { month: string }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get('/api/transactions', { params: { month, search, page } })
      .then(response => setTransactions(response.data));
  }, [month, search, page]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search transactions"
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Sold</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.dateOfSale}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page => page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page => page + 1)}>Next</button>
    </div>
  );
};

export default TransactionsTable;
