import { makeDb } from 'src/data/db';

describe('makeDb', () => {
  let db: any;

  beforeEach(() => {
    const mockDb = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      insertMany: jest.fn().mockResolvedValue({ insertedCount: 0 }),
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 0 }),
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      aggregate: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
    };
    db = makeDb('mongodb://localhost:27017', 'test-db');
    Object.assign(db, mockDb);
  });

  describe('findAll', () => {
    it('should return all documents in a collection', async () => {
      (db.findAll as jest.Mock).mockResolvedValueOnce([{ name: 'John' }, { name: 'Jane' }]);

      const result = await db.findAll('test-collection', {});

      expect(result).toHaveLength(2);
      expect((result[0] as any).name).toBe('John');
      expect((result[1] as any).name).toBe('Jane');
    });

    it('should return an empty array if no documents match the query', async () => {
      const result = await db.findAll('test-collection', { name: 'John' });

      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return the first document that matches the query', async () => {
      (db.findOne as jest.Mock).mockResolvedValueOnce({ name: 'John' });

      const result = await db.findOne('test-collection', { name: 'John' });

      expect(result.name).toBe('John');
    });

    it('should return null if no documents match the query', async () => {
      const result = await db.findOne('test-collection', { name: 'John' });

      expect(result).toBeNull();
    });
  });
});

