import connect from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';

// Check if the model exists, if not, define it
const BooksModel = mongoose.models.Books || mongoose.model('Books', new mongoose.Schema({}, { strict: false }), 'Books');

export const GET = async (req, { params }) => {
  await connect();
  try {
    const book = await BooksModel.findOne({ _id: params.id }).exec();
    if (!book) {
      return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: book }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
