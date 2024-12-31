'use server'
import mongoose from "mongoose";
import { auth } from "@/app/auth";
import { getname } from "../getname";
import connect from "@/lib/db";



export default async function createUser(name, email, role) {
    await connect(); // Connect to MongoDB
    const session = await auth();
    const information = await getname(session?.user?.id);
    const parsedinformation = JSON.parse(information) || 'loading';
    if (!session?.user) throw new Error("Not authenticated");
    if (Object.keys(session.user).length === 0) throw new Error("Not Authenticated");
    if (parsedinformation.role === "Contributor" || parsedinformation.role === "Editior") throw new Error("Not Authorized");


    const UserModel = mongoose.models.users || mongoose.model('users', new mongoose.Schema({}, { strict: false }), 'users');

    // Extract necessary fields from formData

    // Assuming the form data contains an _id field to identify the user to update
    try {
        await UserModel.create({name: name, email: email, role: role});

    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}