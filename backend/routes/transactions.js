import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

// Mock database
const transactions = [];

router.get('/transactions', (req, res) => {
  try {
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/transactions', (req, res) => {
  try {
    // Generate a transaction id
    req.body.transaction_id = uuidv4();

    // Update balance
    req.body.balance = req.body.amount;
    // Update balance if there were previous transactions
    const lastTransactionIndex = transactions.findLastIndex(x => x.account_id === req.body.account_id);
    if (lastTransactionIndex !== -1) {
      req.body.balance += transactions[lastTransactionIndex].balance;
    }

    transactions.push(req.body);

    res.status(201).json(req.body);
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/transactions/:transactionId', (req, res) => {
  try {
    // Find the transaction by its id
    const foundTransaction = transactions.findLast(transaction => transaction.transaction_id === req.params.transactionId);

    if (!foundTransaction) {
      res.status(404).json({ message: 'Transaction not found' });
    } else {
      res.status(200).json(foundTransaction);
    }
  } catch (error) {
    console.error('Error retrieving transaction:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/accounts/:accountId', (req, res) => {
  try {
    // Find the account by its account id
    const foundAccount = transactions.findLast(account => account.account_id === req.params.accountId);

    if (!foundAccount) {
      res.status(404).json({ message: 'Account not found' });
    } else {
      res.status(200).json(foundAccount);
    }
  } catch (error) {
    console.error('Error retrieving account:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;