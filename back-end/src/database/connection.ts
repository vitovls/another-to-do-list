import mongoose from 'mongoose';

const MONGO_DB_URL = 'mongodb://localhost:27017/to_do_db';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
