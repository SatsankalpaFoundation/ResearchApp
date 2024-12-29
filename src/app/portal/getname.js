'use server'
import mongoose from "mongoose";
import connect from "@/lib/db";

export async function getname(id) {
    await connect();
    const UserModel = mongoose.models.users || mongoose.model('users', new mongoose.Schema({}, { strict: false }), 'users');
    const user = await UserModel.findById(id);
    return JSON.stringify(user);
}