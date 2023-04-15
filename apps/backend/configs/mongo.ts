import mongoose from 'mongoose';

export async function connectToMongo(url: string): Promise<void> {
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(url);
    mongoose.connection.on('connection', () => console.log('MONGO: success'));
  } catch (err) {
    console.log(`MONGO: failure, ${err}`);
    process.exit(1);
  }
}
