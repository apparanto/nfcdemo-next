import { IVisitor } from "@/models/visitor/Visitor";

const limit = parseInt(process.env.VISTOR_LATEST_LIMIT || '200');

const select = {
  latitude: 1, longitude: 1, lastVisit: 1, visitCount: 1, _id: 1, cityName: 1, countryCode: 1
};

export async function getLatest(): Promise<IVisitor[]> {
  const visitors: IVisitor[] = await getLatest();
  return visitors;
}