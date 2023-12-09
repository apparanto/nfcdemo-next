import dbConnect from "@/lib/mongodb/mongoose";
import { IVisitor } from "@/models/visitor/Visitor";
import Visitor from "@/models/visitor/Visitor";
import { NextResponse } from "next/server";

const select = { latitude: 1, longitude: 1, lastVisit: 1, visitCount: 1, _id: 0 };

export async function GET() {
  await dbConnect();
  const visitorCountries = await Visitor.aggregate([
    { $group: { _id: { code: "$countryCode", name: "$countryName", region: "$regionName" }, count: { $sum: "$visitCount" } } },
    { $sort: { count: -1 } },
    { $limit: 100 }
  ]);
  return NextResponse.json(visitorCountries);
}