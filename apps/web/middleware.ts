import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    console.log(req)
    return NextResponse.next();
}