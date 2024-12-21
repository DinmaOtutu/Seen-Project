import axios from 'axios';

export class TransactionRepository {
  private apiUrl = 'https://cdn.seen.com/challenge/transactions-v2.json';

  async fetchTransactions() {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async aggregateTransactions(customerId: number) {
    const transactions = await this.fetchTransactions();
    return transactions
      .filter((t: any) => t.customerId === customerId)
      .reduce((agg: any[], curr: any) => {
        const existing = agg.find((t) => t.authorizationCode === curr.authorizationCode);
        if (existing) {
          existing.timeline.push({ createdAt: curr.transactionDate, status: curr.transactionStatus, amount: curr.amount });
          existing.updatedAt = curr.transactionDate;
          existing.status = curr.transactionStatus;
        } else {
          agg.push({
            transactionId: curr.transactionId,
            authorizationCode: curr.authorizationCode,
            createdAt: curr.transactionDate,
            updatedAt: curr.transactionDate,
            status: curr.transactionStatus,
            description: curr.description,
            transactionType: curr.transactionType,
            metadata: curr.metadata,
            timeline: [{ createdAt: curr.transactionDate, status: curr.transactionStatus, amount: curr.amount }],
          });
        }
        return agg;
      }, []);
  }

  async findRelatedCustomers(customerId: number) {
    const transactions = await this.fetchTransactions();
    const relatedTransactions = transactions.filter((t: any) => t.customerId === customerId);

    const relatedCustomers = relatedTransactions.flatMap((t: any) => {
      if (t.metadata.relatedTransactionId) {
        return { relatedCustomerId: t.metadata.relatedTransactionId, relationType: t.transactionType };
      }
      return [];
    });

    return relatedCustomers;
  }
}
