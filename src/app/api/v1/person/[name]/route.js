import connect from "@/lib/db";
import Person from "@/lib/models/person";
import { NextResponse } from "next/server";
import { Types } from "mongoose";


const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (request, { params }) => {
  try {
    await connect();
    const persons = await Person.findOne({ Name: params.name });
    if (!persons) {
      return new NextResponse(
        `Person with name ${params.name} not found`,
        {
          status: 404,
        }
      );
    }
    return new NextResponse(JSON.stringify(persons), { status: 200 });
  } catch (error) {
    return new NextResponse(`Error in fetching person${error.message}`, {
      status: 500,
    });
  }
};
