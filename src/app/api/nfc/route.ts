import { NextResponse } from "next/server";
import UFR from "@/lib/nfc/ufr";
import dbConnect from "@/lib/mongodb/mongoose";

export async function POST(request: Request) {
  const data: Tag = await request.json();
  const timestamp: Date = new Date();
  console.log({ timestamp, data });
  await dbConnect();

  const ufr = new UFR();
  ufr.readerUISignal(ufr.UFR1, 1, 1);
  ufr.onlineRGB(ufr.ONLINE, 0, 255, 0, 1500);
  const response = ufr.getResponse;
  return new Response(response, { status: 200 });
}
