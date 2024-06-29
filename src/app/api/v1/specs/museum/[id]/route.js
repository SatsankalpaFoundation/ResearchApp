import connect from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';

// Check if the model exists, if not, define it
const MuseumModel = mongoose.models.Museum || mongoose.model('Museum', new mongoose.Schema({}, { strict: false }), 'Museum');

export const GET = async (req, { params }) => {
  await connect();
  try {
    const Museum = await MuseumModel.findOne({ _id: params.id }).exec();
    if (!Museum) {
      return NextResponse.json({ success: false, message: 'Museum not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: Museum }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
