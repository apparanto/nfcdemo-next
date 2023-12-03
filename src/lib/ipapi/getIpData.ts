import Visitor from "@/models/visitor/Visitor";
import dbConnect from "../mongodb/mongoose";

export function validateIpAddress(ipAddress: string): boolean {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
    return true;
  }
  return false;
}

export default async function getIpData(ipAddress: string): Promise<IpData> {
  if (!validateIpAddress(ipAddress)) {
    throw new Error('Invalid IP address: ' + ipAddress);
  }
  await dbConnect();
  let v = await Visitor.findOne({ ipAddress: ipAddress }).exec();
  if (v) {
    v.visitCount++;
    v.lastVisit = new Date();
    await v.save();
  } else {
    const url: string = 'https://freeipapi.com/api/json/' + ipAddress;
    const res = await fetch(url);
    const ipData: IpData = await res.json();
    v = await Visitor.create({ ...ipData, visitCount: 1, firstVisit: new Date(), lastVisit: new Date() });
  }
  return v as IpData;
}