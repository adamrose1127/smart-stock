'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

interface Transaction {
  id: number;
  sale_amount: number;
  created_at: string;
}

interface InventoryItem {
  id: number;
  item_name: string;
  quantity: number;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: txns } = await supabase.from('transactions').select('*');
    const { data: inv } = await supabase.from('inventory').select('*');
    setTransactions(txns || []);
    setInventory(inv || []);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Smart Stock</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl">Transactions</h2>
          <ul>
            {transactions.map((txn) => (
              <li key={txn.id}>{txn.sale_amount} - {txn.created_at}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl">Inventory</h2>
          <ul>
            {inventory.map((item) => (
              <li key={item.id}>{item.item_name}: {item.quantity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 