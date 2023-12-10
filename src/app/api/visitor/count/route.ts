import { getCount } from "@/lib/visitor/getCount";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const count = await getCount();
  return NextResponse.json({ count });
}