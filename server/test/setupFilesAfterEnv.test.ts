import path from 'path';

export default async function setupFilesAfterEnv() {
    // The following line is required for jest to find the setupFilesAfterEnv.ts file.
    require.resolve(path.join(process.cwd(), 'test/setupFilesAfterEnv.test.ts'));

    console.log('Finished');

}

