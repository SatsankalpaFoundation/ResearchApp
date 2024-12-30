'use server';
import mongoose from 'mongoose';
import connect from '@/lib/db';

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

  const UserModel = mongoose.models.Museum || mongoose.model('Museum', new mongoose.Schema({}, { strict: false }), 'Museum');

  try {
    // Update the user document with the new fields
    await UserModel.findByIdAndUpdate(
      id,
      {
        "Type of source": sourceType,
        "Name of the Museum": museumName,
        "Type of Museum": museumType,
        "Address of the Museum": museumAddress,
        "Contact Person Name": contactPersonName,
        "Artefact Title": artefactTitle,
        "Artefact Description": String(artefactDescription),
        "Date": date,
        "Sources": sources,
        "Medium": medium,
        "Keywords used": keywords,
        "Dimensions": dimensions,
        "Credit Line": creditLine,
        "Public Domain Designation (PDD)": pdd,
        "URL": url,
        "Provenance (Ownership History)": provenance,
        "Multimedia": multimedia
      }
    );
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
