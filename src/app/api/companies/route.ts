import { getCompanies } from "@/services/companies/compaies";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,resp:NextResponse) {
    const jsonRequest = await req.json();
    const newContent = await getCompanies(jsonRequest.limit,jsonRequest.id);
    return NextResponse.json({ success: true, data: newContent });
}