import { TransactionRepository } from '../repositories/transactionRepository';

export class TransactionService {
    private repository: TransactionRepository;

    constructor() {
        this.repository = new TransactionRepository();
    }

    async getAggregatedTransactions(customerId: number) {
        try {

            return this.repository.aggregateTransactions(customerId);
        } catch (error) {
            throw error
        }
    }

    async getRelatedCustomers(customerId: number) {
        try {

            return this.repository.findRelatedCustomers(customerId);
        } catch (error) {
            throw error
        }
    }
}
