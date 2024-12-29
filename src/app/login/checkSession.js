'use server'
import { auth } from "../auth";

export default async function checkSession(){
    const session = await auth()
    if (session){
        return true
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
        return false
    }
}