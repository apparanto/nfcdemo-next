import dbConnect from "@/lib/mongodb/mongoose";
import { IVisitor } from "@/models/visitor/Visitor";
import Visitor from "@/models/visitor/Visitor";
import { NextResponse } from "next/server";

const select = { latitude: 1, longitude: 1, lastVisit: 1, visitCount: 1, _id: 0 };

export async function GET() {
  await dbConnect();
  const Visitors: IVisitor[] = await Visitor.find().sort({ lastVisit: -1 } as any).select(select).limit(50).exec();
  return NextResponse.json(Visitors);
}