import { MongoClient } from "mongodb";


export function makeDb(uri: string, dbName: string) {
    const client = new MongoClient(uri);

    return function db() {
        async function _connect() {
            await client.connect();
            return client.db(dbName);
        }

        async function _disconnect() {
            await client.close();
        }

        async function _runQuery(collectionName: string, fn: (collection: any) => Promise<unknown>) {
            try {
                const db = await _connect();
                const collection = db.collection(collectionName);
                const result = await fn(collection);
                return result;
            } catch (error) {
                console.log(error);
            } finally {
                await _disconnect();
            }
        }

        async function findAll(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.find(query).toArray());
        }

        async function findOne(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.findOne(query));
        }
        async function insertOne(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.insertOne(query));
        }
        async function deleteOne(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.deleteOne(query));
        }
        async function updateOne(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.updateOne(query));
        }
        async function updateMany(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.updateMany(query));
        }
        async function insertMany(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.insertMany(query));
        }
        async function deleteMany(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.deleteMany(query));
        }
        async function aggregate(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.aggregate(query).toArray());
        }
        async function count(collectionName: string, query: object) {
            return await _runQuery(collectionName, collection => collection.countDocuments(query));
        }
        async function dropCollection(collectionName: string) {
            const db = await _connect();
            await db.dropCollection(collectionName);
        }

        return {
            findAll,
            findOne,
            insertOne,
            deleteOne,
            deleteMany,
            updateOne,
            updateMany,
            insertMany,
            count,
            aggregate,
            dropCollection,
        };
    };
}

