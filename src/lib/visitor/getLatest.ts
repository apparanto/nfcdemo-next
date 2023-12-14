import Visitor, { IVisitor } from "@/models/visitor/Visitor";
import dbConnect from "../mongodb/mongoose";

export async function getLatest(limit: number,
  select: Record<string, number | boolean | object>): Promise<IVisitor[]> {
  dbConnect();
  const visitors: IVisitor[] =
    await Visitor.find()
      .sort({ lastVisit: -1 } as any)
      .select(select)
      .limit(limit).exec();
  return visitors;
}

export async function getLatestByCity() {
  dbConnect();
  const visitors: IVisitor[] = await Visitor.aggregate([
    {
      $group: {
        _id: { city: "$cityName", country: "$countryName" },
        visitCount: { $sum: "$visitCount" },
        latitude: { $avg: "$latitude" },
        longitude: { $avg: "$longitude" }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 100 }
  ]);
  return visitors;
}