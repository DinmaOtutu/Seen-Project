import request from 'supertest';
import app from '../app';

describe('App Integration Tests', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Route not found' });
  });

  it('should handle errors gracefully', async () => {
    const res = await request(app).get('/api/error');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Route not found' });
  });
});
