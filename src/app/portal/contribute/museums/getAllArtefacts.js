'use server'
import mongoose from "mongoose";
import connect from "@/lib/db";

export default async function getAllBooks() {
    await connect();
    const Books = mongoose.models.Museum || mongoose.model('Museum', new mongoose.Schema({}, { strict: false }), 'Museum');
    const books = await Books.find({});
    return JSON.stringify(books);
}