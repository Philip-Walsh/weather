import { MongoClient } from "mongodb";


export function makeDb(uri, dbName) {
    const client = new MongoClient(uri);

    return function getDb() {
        async function _connect() {
            await client.connect();
            return client.db(dbName);
        }

        async function _disconnect() {
            await client.close();
        }

        async function _runQuery(collectionName, fn) {
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

        async function findAll(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.find(query).toArray());
        }

        async function findOne(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.findOne(query));
        }
        async function insertOne(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.insertOne(query));
        }
        async function deleteOne(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.deleteOne(query));
        }
        async function updateOne(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.updateOne(query));
        }
        async function updateMany(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.updateMany(query));
        }
        async function insertMany(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.insertMany(query));
        }
        async function deleteMany(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.deleteMany(query));
        }
        async function aggregate(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.aggregate(query).toArray());
        }
        async function count(collectionName, query) {
            return await _runQuery(collectionName, collection => collection.countDocuments(query));
        }

        return {
            findAll,
            findOne,
            insertOne,
            deleteOne,
            updateOne,
            updateMany,
            insertMany,
            deleteMany,
            aggregate,
            count
        };
    };
}

