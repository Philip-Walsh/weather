import { makeDb } from 'src/data/db';

describe('makeDb', () => {
    const COLLECTION = 'test-collection';
    let db: any;

    beforeAll(async () => {
        db = makeDb('mongodb://localhost:27017', 'test-db')();
    });

    afterAll(async () => {
        await db.dropCollection(COLLECTION);
    });

    describe('insertOne', () => {
        it('should insert a document into the collection', async () => {
            const result = await db.insertOne(COLLECTION, { name: 'John' });
            expect(result.insertedId).toBeTruthy();
        });
    });

    describe('insertMany', () => {
        it('should insert multiple documents into the collection', async () => {
            const result = await db.insertMany(COLLECTION, [{ name: 'John' }, { name: 'Jane' }]);
            console.log(result);

            expect(result.insertedCount).toBe(2);
        });
    });

    describe('findAll', () => {
        it('should return all documents in a collection', async () => {
            await db.insertOne(COLLECTION, { name: 'John' });
            await db.insertOne(COLLECTION, { name: 'Jane' });

            const result = await db.findAll(COLLECTION, {});

            expect(result.length).toBeGreaterThan(1);
        });

        it('should return an empty array if no documents match the query', async () => {
            const result = await db.findAll(COLLECTION, { name: 'Jim' });

            expect(result).toHaveLength(0);
        });
    });

    describe('findOne', () => {
        it('should return the first document that matches the query', async () => {
            await db.insertOne(COLLECTION, { name: 'John' });

            const result = await db.findOne(COLLECTION, { name: 'John' });

            expect(result.name).toBe('John');
        });

        it('should return null if no documents match the query', async () => {
            const result = await db.findOne(COLLECTION, { name: 'Jim' });

            expect(result).toBeNull();
        });
    });

    describe('deleteOne', () => {
        it('should delete a document that matches the query', async () => {
            await db.insertOne(COLLECTION, { name: 'Jimmy' });

            const deleteResult = await db.deleteOne(COLLECTION, { name: 'Jimmy' });

            expect(deleteResult.deletedCount).toBe(1);

            const result = await db.findAll(COLLECTION, { name: 'Jimmy' });
            expect(result).toHaveLength(0);
        });
    });

    describe('deleteMany', () => {
        it('should delete multiple documents that match the query', async () => {
            await db.insertOne(COLLECTION, { name: 'John', type:'deleted' });
            await db.insertOne(COLLECTION, { name: 'Jane', type:'deleted' });

            const deleteResult = await db.deleteMany(COLLECTION, {type:'deleted'});

            expect(deleteResult.deletedCount).toBe(2);

            const result = await db.findAll(COLLECTION, {type:'deleted'});
            expect(result).toHaveLength(0);
        });
    });

    describe('updateOne', () => {
        it('should update a document that matches the query', async () => {
            const name = 'josh'
            await db.insertOne(COLLECTION, { name, age: 25 });

            const updateResult = await db.updateOne(COLLECTION, { name }, { $set: { age:  30  } });
            console.log(updateResult);
            expect(updateResult.modifiedCount).toBe(1);

            const result = await db.findOne(COLLECTION, { name });
            expect(result.age).toBe(30);
        });
    });

    describe('updateMany', () => {
        it('should update multiple documents that match the query', async () => {
            const age = 21;
            await db.insertOne(COLLECTION, { name: 'John', age });
            await db.insertOne(COLLECTION, { name: 'Jane', age });

            const updateResult = await db.updateMany(COLLECTION, { age }, { $set: { age: 42 } });
            console.log({updateResult});
            expect(updateResult.modifiedCount).toBe(2);

            const result = await db.findAll(COLLECTION, { age: 42 });
            expect(result).toHaveLength(2);
        });
    });

    describe('count', () => {
        it('should count the number of documents in a collection', async () => {
            await db.insertOne(COLLECTION, { name: 'John', type:'countable' });
            await db.insertOne(COLLECTION, { name: 'Jane', type:'countable' });

            const count = await db.count(COLLECTION, {type:'countable'});

            expect(count).toBe(2);
        });
    });

    describe('aggregate', () => {
        it('should aggregate documents of type user in a collection', async () => {
            await db.insertOne(COLLECTION, { name: 'John', type:'user', age: 25 });
            await db.insertOne(COLLECTION, { name: 'Jane', type:'user', age: 30 });

            const result = await db.aggregate(COLLECTION, [
                { $match: { type: 'user' } },
                { $group: { _id: null, avgAge: { $avg: '$age' } } }
            ]);

            expect(result[0].avgAge).toBe(27.5);
        });
    });

    describe('dropCollection', () => {
        it('should drop a collection', async () => {
            await db.insertOne(COLLECTION, { name: 'John' });

            await db.dropCollection(COLLECTION);

            const result = await db.findAll(COLLECTION, {});
            expect(result).toHaveLength(0);
        });
    });
});
