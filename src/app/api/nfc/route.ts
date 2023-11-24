import TagRead from "@/models/nfc/TagRead";
import UFR from "@/lib/nfc/ufr";
import dbConnect from "@/lib/mongodb/mongoose";
import { log } from "console";

export async function POST(request: Request) {
  const data: Tag = await request.json();
  const timestamp: Date = new Date();
  console.log({ timestamp, data });
  await dbConnect();
  try {
    const tagRead: typeof TagRead = await TagRead.create({
      timestamp,
      uid: data.UID,
      sn: data.SN,
      osn: data.OSN,
      zone: data.Zone,
      section: data.Section,
      post: data.Post,
    });
    console.log({ tagRead });
    const ufr = new UFR();
    ufr.readerUISignal(ufr.UFR1, 1, 1);
    ufr.onlineRGB(ufr.ONLINE, 0, 255, 0, 1500);
    const response = ufr.getResponse;
    return new Response(response, { status: 200 });
  } catch (error) {
    log(error);
    return new Response("FAILED", { status: 500 });
  }
}
