import 'dotenv/config'

const PORT = process.env.PORT || 3000
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://root:example@mongo:27017/books?authSource=admin'

export { PORT, MONGO_URI }
