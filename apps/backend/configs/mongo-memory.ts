import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function startMongoMemory(): Promise<void> {
  const mongoServer = await MongoMemoryServer.create({
    binary: { version: '4.4.4' },
  });
  const mongoUri = mongoServer.getUri();
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
  mongoose.connection.on('error', async (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      await mongoose.connect(mongoUri);
    }
    console.log(e);
  });
}

export async function dropMongoDatabase(): Promise<void> {
  await mongoose.connection.db.dropDatabase();
}

export async function stopMongoMemoryServer(): Promise<void> {
  await mongoose.disconnect();
}
