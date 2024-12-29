'use server'
import mongoose from "mongoose";
import connect from "@/lib/db";

export async function getAllUsers() {
    await connect();
    const UserModel = mongoose.models.users || mongoose.model('users', new mongoose.Schema({}, { strict: false }), 'users');
    const user = await UserModel.find({});
    return JSON.stringify(user);
}