import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: any, res: any) => {
  let doc = await req.db.collection("daily").find({}).toArray();
  console.log(doc);
  res.json(doc);
});
export default handler;
