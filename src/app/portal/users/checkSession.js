'use server'
import { auth } from "@/app/auth";
import { getname } from "../getname";

export default async function checkSession() {
    const session = await auth();
    const information = await getname(session?.user?.id);
    const parsedinformation = JSON.parse(information) || 'loading';
    return JSON.stringify(parsedinformation.role);
}