'use server'
import mongoose from "mongoose";
import connect from "@/lib/db";

export default async function getAllBooks() {
    await connect();
    const Books = mongoose.models.Books || mongoose.model('Books', new mongoose.Schema({}, { strict: false }), 'Books');
    const books = await Books.find({});
    return JSON.stringify(books);
}