'use server'
import mongoose from 'mongoose';
import connect from '@/lib/db';
import { auth } from "@/app/auth";
import { getname } from '../getname';

export async function updateUser(id, name, email, role) {
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
    console.log(id, name, email, role);
    try {
        await UserModel.findByIdAndUpdate(id, { name: name, email: email, role: role } ,
            { new: true } // Return the updated document
        );

    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}