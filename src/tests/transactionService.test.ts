import { TransactionService } from '../services/transactionService';
import { TransactionRepository } from '../repositories/transactionRepository';

jest.mock('../repositories/transactionRepository');

describe('Transaction Service Tests', () => {
  const mockTransactionRepository = {
    aggregateTransactions: jest.fn(),
    findRelatedCustomers: jest.fn(),
  };

  const transactionService = new TransactionService();

  beforeEach(() => {
    jest.clearAllMocks();
    (transactionService as any).repository = mockTransactionRepository;
  });

  it('should get aggregated transactions', async () => {
    const mockData = [{ transactionId: 1, status: 'SETTLED' }];
    mockTransactionRepository.aggregateTransactions.mockResolvedValue(mockData);

    const result = await transactionService.getAggregatedTransactions(1);

    expect(mockTransactionRepository.aggregateTransactions).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });

  it('should get related customers', async () => {
    const mockData = [{ relatedCustomerId: 3, relationType: 'P2P_SEND' }];
    mockTransactionRepository.findRelatedCustomers.mockResolvedValue(mockData);

    const result = await transactionService.getRelatedCustomers(1);

    expect(mockTransactionRepository.findRelatedCustomers).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockData);
  });
});
