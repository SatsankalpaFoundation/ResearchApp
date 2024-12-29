'use server'
import { auth } from "@/app/auth"
import { getname } from "@/app/portal/getname"
import { NextResponse } from "next/server";

export async function GET(){
    const session = await auth();
    const information = await getname(session?.user?.id);
    const parsedinformation = JSON.parse(information) || 'loading';
    return new NextResponse(JSON.stringify(parsedinformation));
}