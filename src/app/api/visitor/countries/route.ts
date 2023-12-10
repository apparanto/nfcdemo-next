import dbConnect from "@/lib/mongodb/mongoose";
import Visitor from "@/models/visitor/Visitor";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  const visitorCountries = await Visitor.aggregate([
    { $group: { _id: { code: "$countryCode", name: "$countryName", region: "$regionName" }, count: { $sum: "$visitCount" } } },
    { $sort: { count: -1 } },
    { $limit: 100 }
  ]);
  return NextResponse.json(visitorCountries);
}