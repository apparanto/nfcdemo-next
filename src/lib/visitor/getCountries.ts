import dbConnect from "@/lib/mongodb/mongoose";
import Visitor from "@/models/visitor/Visitor";


export async function getCountries() {
  await dbConnect();
  const visitorCountries = await Visitor.aggregate([
    { $group: { _id: { code: "$countryCode", name: "$countryName", region: "$regionName" }, count: { $sum: "$visitCount" } } },
    { $sort: { count: -1 } },
    { $limit: 100 }
  ]);
  return visitorCountries;
}