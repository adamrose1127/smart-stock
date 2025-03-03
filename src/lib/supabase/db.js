import { supabase } from './client';

// Inventory functions
export async function getInventoryItems(companyId) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('company_id', companyId)
    .order('name');

  if (error) {
    throw error;
  }

  return data;
}

export async function getInventoryItem(id) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createInventoryItem(item) {
  const { data, error } = await supabase
    .from('inventory_items')
    .insert([item])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateInventoryItem(id, updates) {
  const { data, error } = await supabase
    .from('inventory_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Transaction functions
export async function getPOSTransactions(companyId) {
  const { data, error } = await supabase
    .from('pos_transactions')
    .select('*')
    .eq('company_id', companyId)
    .order('transaction_date', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getTransactionItems(transactionId) {
  const { data, error } = await supabase
    .from('transaction_items')
    .select('*, inventory_items(name, sku)')
    .eq('transaction_id', transactionId);

  if (error) {
    throw error;
  }

  return data;
}

export async function createTransaction(transaction, items) {
  // Start a Supabase transaction
  const { data: txData, error: txError } = await supabase
    .from('pos_transactions')
    .insert([transaction])
    .select()
    .single();

  if (txError) {
    throw txError;
  }

  // Prepare transaction items with the new transaction ID
  const transactionItems = items.map(item => ({
    ...item,
    transaction_id: txData.id
  }));

  // Insert transaction items
  const { error: itemsError } = await supabase
    .from('transaction_items')
    .insert(transactionItems);

  if (itemsError) {
    throw itemsError;
  }

  return txData;
}

// Inventory adjustment functions
export async function createInventoryAdjustment(adjustment) {
  // Insert the adjustment
  const { data: adjustmentData, error: adjustmentError } = await supabase
    .from('inventory_adjustments')
    .insert([adjustment])
    .select()
    .single();

  if (adjustmentError) {
    throw adjustmentError;
  }

  // Update the inventory item stock
  const { error: updateError } = await supabase
    .from('inventory_items')
    .update({
      current_stock: adjustment.new_stock,
      last_reconciled_at: new Date().toISOString()
    })
    .eq('id', adjustment.inventory_item_id);

  if (updateError) {
    throw updateError;
  }

  return adjustmentData;
}

// Alert functions
export async function getAlerts(companyId) {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function createAlert(alert) {
  const { data, error } = await supabase
    .from('alerts')
    .insert([alert])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateAlertStatus(id, status) {
  const { data, error } = await supabase
    .from('alerts')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
