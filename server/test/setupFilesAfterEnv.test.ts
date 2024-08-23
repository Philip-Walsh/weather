import { makeDb } from 'src/data/db';

async function setupFilesAfterEnv() {
    const COLLECTION = 'test-collection';
    await makeDb('mongodb://localhost:27017', 'test-db')().dropCollection(COLLECTION);

    console.log('Finished Tests 🏁');

}

setupFilesAfterEnv();