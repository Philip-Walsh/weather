import { makeDb } from 'src/data/db';

describe('makeDb', () => {
    const COLLECTION = 'test-collection';
    let db: any;

    beforeAll(async () => {
        db = makeDb('mongodb://localhost:27017', 'test-db');
        console.log({db});
    });

    afterEach(async () => {
        await db.dropCollection(COLLECTION);
    });

    describe('findAll', () => {
        it('should return all documents in a collection', async () => {
            await db.insertOne(COLLECTION, { name: 'John' });
            await db.insertOne(COLLECTION, { name: 'Jane' });

            const result = await db.findAll(COLLECTION, {});

            expect(result).toHaveLength(2);
            expect((result[0] as any).name).toBe('John');
            expect((result[1] as any).name).toBe('Jane');
        });

        it('should return an empty array if no documents match the query', async () => {
            const result = await db.findAll(COLLECTION, { name: 'John' });

            expect(result).toHaveLength(0);
        });
    });

    describe('findOne', () => {
        it('should return the first document that matches the query', async () => {

            await db.insertOne(COLLECTION, { name: 'John' });
            await db.insertOne(COLLECTION, { name: 'Jane' });

            const result = await db.findOne(COLLECTION, { name: 'John' });

            expect(result.name).toBe('John');
        });

        it('should return null if no documents match the query', async () => {
            const result = await db.findOne(COLLECTION, { name: 'John' });

            expect(result).toBeNull();
        });
    });

    // TODO: add more tests
});

