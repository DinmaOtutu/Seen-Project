import { Router } from 'express';
import { getCustomerTransactions, getRelatedCustomers } from '../controllers/transactionController';

const router = Router();

router.get('/transactions/:customerId', getCustomerTransactions);
router.get('/related-customers/:customerId', getRelatedCustomers);

export default router;
