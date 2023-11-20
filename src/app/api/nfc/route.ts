import { NextResponse } from "next/server";
import UFR from "@/lib/nfc/ufr";

export async function POST(request: Request) {
  const data: Tag = await request.json();
  console.log(data);
  const ufr = new UFR();
  ufr.readerUISignal(ufr.UFR1, 1, 1);
  ufr.onlineRGB(ufr.ONLINE, 0, 255, 0, 1500);
  const response = ufr.getResponse;
  return new Response(response, { status: 200 });
}
