import { NextRequest, NextResponse } from "next/server";
import kitsData from "./KITS_SHIPPING_DATA.json";

export async function GET(request: NextRequest) {
  const labelIdSearch = request.nextUrl.searchParams.get("labelId");

  if (!labelIdSearch) {
    return NextResponse.json([]);
  }

  return NextResponse.json(
    kitsData.filter((kit) => kit.label_id.includes(labelIdSearch))
  );
}
