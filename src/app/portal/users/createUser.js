'use server'
import mongoose from "mongoose";
import connect from "@/lib/db";



export default async function createUser(name, email, role) {
    await connect(); // Connect to MongoDB

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