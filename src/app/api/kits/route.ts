import { NextRequest, NextResponse } from "next/server";
import kitsData from "./KITS_SHIPPING_DATA.json";

export async function GET(request: NextRequest) {
  const labelIdSearchText = request.nextUrl.searchParams.get("labelId");

  if (!labelIdSearchText) {
    return NextResponse.json([]);
  }

  return NextResponse.json({
    results: kitsData.filter((kit) => kit.label_id.includes(labelIdSearchText)),
  });
}
