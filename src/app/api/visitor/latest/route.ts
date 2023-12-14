import dbConnect from "@/lib/mongodb/mongoose";
import { getLatest, getLatestByCity } from "@/lib/visitor/getLatest";
import { IVisitor } from "@/models/visitor/Visitor";
import Visitor from "@/models/visitor/Visitor";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const limit = parseInt(process.env.VISTOR_LATEST_LIMIT || '200');

const select = {
  latitude: 1, longitude: 1, lastVisit: 1, visitCount: 1, _id: 1, cityName: 1, countryCode: 1
};

export async function GET() {
  await dbConnect();
  // const Visitors: IVisitor[] = await getLatest(limit, select);
  const Visitors: IVisitor[] = await getLatestByCity();
  return NextResponse.json(Visitors);
}