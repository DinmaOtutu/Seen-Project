import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transactionService';

const transactionService = new TransactionService();

export const getCustomerTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = Number(req.params.customerId);
    const transactions = await transactionService.getAggregatedTransactions(customerId);
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getRelatedCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = Number(req.params.customerId);
    const relatedCustomers = await transactionService.getRelatedCustomers(customerId);
    res.status(200).json(relatedCustomers);
  } catch (error) {
    next(error);
  }
};
