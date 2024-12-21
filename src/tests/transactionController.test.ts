import { getCustomerTransactions, getRelatedCustomers } from '../controllers/transactionController';
import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transactionService';

jest.mock('../services/transactionService'); // Mock the TransactionService

const MockTransactionService = jest.mocked(TransactionService);

describe('Transaction Controller Tests', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
  } as unknown as Response;
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return aggregated transactions', async () => {
    const mockData = [{ transactionId: 1, status: 'SETTLED' }];
    MockTransactionService.prototype.getAggregatedTransactions.mockResolvedValue(mockData);

    mockRequest.params = { customerId: '1' };

    await getCustomerTransactions(mockRequest, mockResponse, mockNext);

    expect(MockTransactionService.prototype.getAggregatedTransactions).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockData);
  });

  it('should handle errors in getCustomerTransactions', async () => {
    MockTransactionService.prototype.getAggregatedTransactions.mockRejectedValue(new Error('Service Error'));

    await getCustomerTransactions(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error('Service Error'));
  });

  it('should return related customers', async () => {
    const mockData = [{ relatedCustomerId: 3, relationType: 'P2P_SEND' }];
    MockTransactionService.prototype.getRelatedCustomers.mockResolvedValue(mockData);

    mockRequest.params = { customerId: '1' };

    await getRelatedCustomers(mockRequest, mockResponse, mockNext);

    expect(MockTransactionService.prototype.getRelatedCustomers).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockData);
  });
});
