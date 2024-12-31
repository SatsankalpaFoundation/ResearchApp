"use server";
import mongoose from "mongoose";
import connect from "@/lib/db";
import { auth } from "@/app/auth";

import { getname } from "../../getname";

export default async function editMuseum(
  id,
  sourceType,
  museumName,
  museumType,
  museumAddress,
  contactPersonName,
  artefactTitle,
  artefactDescription,
  date,
  sources,
  medium,
  keywords,
  dimensions,
  creditLine,
  pdd,
  url,
  provenance,
  multimedia
) {
  await connect(); // Connect to MongoDB
  const session = await auth();
  const information = await getname(session?.user?.id);
  const parsedinformation = JSON.parse(information) || "loading";
  if (!session?.user) throw new Error("Not authenticated");
  if (Object.keys(session.user).length === 0)
    throw new Error("Not Authenticated");
  if (parsedinformation.role === "Contributor")
    throw new Error("Not Authorized");

  const UserModel =
    mongoose.models.Museum ||
    mongoose.model(
      "Museum",
      new mongoose.Schema({}, { strict: false }),
      "Museum"
    );
  const now = new Date();
  const month = now.getMonth() + 1; // Months are 0-indexed, so we add 1
  const day = now.getDate();
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Format minutes to always have two digits (e.g., '07' instead of '7')
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return in the format: "3/10/2023 19:07"

  try {
    // Update the user document with the new fields
    await UserModel.findByIdAndUpdate(id, {
      "Date Contributed": `${month}/${day}/${year} ${hours}:${formattedMinutes}`,
      "Contributer Email Adress": parsedinformation.email,
      "Type of source": sourceType,
      "Name of the Museum": museumName,
      "Type of Museum": museumType,
      "Address of the Museum": museumAddress,
      "Contact Person Name": contactPersonName,
      "Artefact Title": artefactTitle,
      "Artefact Description": String(artefactDescription),
      Date: date,
      Sources: sources,
      Medium: medium,
      "Keywords used": keywords,
      Dimensions: dimensions,
      "Credit Line": creditLine,
      "Public Domain Designation (PDD)": pdd,
      URL: url,
      "Provenance (Ownership History)": provenance,
      Multimedia: multimedia,
    });
    // console.log(    {
    //     "Type of source": sourceType,
    //     "Name of the Museum": museumName,
    //     "Type of Museum": museumType,
    //     "Address of the Museum": museumAddress,
    //     "Contact Person Name": contactPersonName,
    //     "Artefact Title": artefactTitle,
    //     "Artefact Description": String(artefactDescription),
    //     "Date": date,
    //     "Sources": sources,
    //     "Medium": medium,
    //     "Keywords used": keywords,
    //     "Dimensions": dimensions,
    //     "Credit Line": creditLine,
    //     "Public Domain Designation (PDD)": pdd,
    //     "URL": url,
    //     "Provenance (Ownership History)": provenance,
    //     "Multimedia": multimedia
    //   })
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
