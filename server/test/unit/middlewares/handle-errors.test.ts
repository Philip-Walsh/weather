import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from 'src/middlewares/error-handler';
import { RequestError } from 'src/middlewares/request-error.type';
// TODO:test custom errors extended from RequestError
const app = express();

app.use(express.json());

app.get('/test-get', (req, res) => {
  res.status(200);
  throw new Error('GET error');
});

app.post('/test-post', (req, res) => {
  res.status(201);
  throw new Error('POST error');
});

app.delete('/test-delete', (req, res) => {
  res.status(204);
  throw new Error('DELETE error');
});

app.put('/test-put', (req, res) => {
  res.status(500);
  throw new Error('PUT error');
});

app.patch('/test-patch', (req, res) => {
  res.status(200);
  throw new Error('PATCH custom error');
});

app.use(errorHandler);

describe('Error Handler Middleware with HttpSuccessStatus', () => {
  it('should handle GET errors and return 500 for unexpected success status', async () => {
    const res = await request(app).get('/test-get');
    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error: GET error');
  });

  it('should handle POST errors and return 500 for unexpected success status', async () => {
    const res = await request(app).post('/test-post');
    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error: POST error');
  });

  it('should handle DELETE errors and return 500 for unexpected success status', async () => {
    const res = await request(app).delete('/test-delete');
    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error: DELETE error');
  });

  it('should return original status for PUT when it is already set to error status', async () => {
    const res = await request(app).put('/test-put');
    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error: PUT error');
  });

  it('should handle RequestError for PATCH and return custom status', async () => {
    const res = await request(app).patch('/test-patch');
    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error: PATCH custom error');
  });
});
