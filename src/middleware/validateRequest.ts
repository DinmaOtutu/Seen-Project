import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const { customerId } = req.params;
  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required.' });
  }
  next();
};
