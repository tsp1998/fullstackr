import mongoose from 'mongoose'

interface ConnectToMongoDBParams {
  MONGO_DB_USER?: string;
  MONGO_DB_PASSWORD?: string;
  MONGO_DB_NAME?: string;
  local?: boolean;
  connectionString?: string;
}

type MongoDBDisconnectFunctionType = () => Promise<void>;

async function connectToMongoDB({
  MONGO_DB_USER = process.env.MONGO_DB_USER,
  MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD,
  MONGO_DB_NAME = process.env.MONGO_DB_NAME,
  local = false,
  connectionString = ''
}: ConnectToMongoDBParams = {}): Promise<MongoDBDisconnectFunctionType>  {
  return new Promise((resolve, reject) => {
    if (!connectionString) {
      connectionString = local ? `mongodb://localhost:27017/${MONGO_DB_NAME}` : `
        mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@royaltsp.trbef.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority
      `
    }
    // console.log(`connectionString`, connectionString)
    mongoose.connect(connectionString, (error) => {
      if (error) {
        return reject(error)
      }
      return resolve(() => mongoose.disconnect());
    })
  })
}

export default connectToMongoDB