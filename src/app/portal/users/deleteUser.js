'use server'
import mongoose from "mongoose";
import connect from "@/lib/db";
import { auth } from "@/app/auth";
import { getname } from "../getname";

export async function deleteUser(userId) {
    try {
        await connect();
        const session = await auth();

        const information = await getname(session?.user?.id);
        const parsedinformation = JSON.parse(information) || 'loading';
        if (!session?.user) throw new Error("Not authenticated");
        if (Object.keys(session.user).length === 0) throw new Error("Not Authenticated");
        if (parsedinformation.role === "Contributor" || parsedinformation.role === "Editior") throw new Error("Not Authorized");
        const UserModel = mongoose.models.users || mongoose.model('users', new mongoose.Schema({}, { strict: false }), 'users');
        await UserModel.findByIdAndDelete(userId);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}