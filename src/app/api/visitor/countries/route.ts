import { getCountries } from "@/lib/visitor/getCountries";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const visitorCountries = await getCountries();
  return NextResponse.json(visitorCountries);
}