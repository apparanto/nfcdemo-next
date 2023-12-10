import Visitor from "@/models/visitor/Visitor";
import dbConnect from "../mongodb/mongoose";

export async function getCount(): Promise<number> {
  await dbConnect();
  const count = await Visitor.countDocuments();
  return count;
}