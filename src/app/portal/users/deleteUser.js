'use server'
import mongoose from "mongoose";
import connect from "@/lib/db";

export async function deleteUser(userId) {
    try {
        await connect();
        const UserModel = mongoose.models.users || mongoose.model('users', new mongoose.Schema({}, { strict: false }), 'users');
        await UserModel.findByIdAndDelete(userId);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}