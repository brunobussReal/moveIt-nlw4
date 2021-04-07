import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req: any, res: any, next: any) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("daily");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
