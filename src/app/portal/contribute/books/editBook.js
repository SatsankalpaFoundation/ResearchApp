'use server';
import { auth } from "@/app/auth";

import mongoose from 'mongoose';
import connect from '@/lib/db';
import { getname } from '../../getname';

export async function editBook(
  id, 
  sourceType, 
  libraryName, 
  libraryType, 
  libraryAddress, 
  bookName, 
  bookDescription, 
  author, 
  publication, 
  year, 
  copyright, 
  isbn, 
  language, 
  url, 
  keywords, 
  bookImage
) {
  await connect(); // Connect to MongoDB
      const session = await auth();
      const information = await getname(session?.user?.id);
      const parsedinformation = JSON.parse(information) || 'loading';
      if (!session?.user) throw new Error("Not authenticated");
      if (Object.keys(session.user).length === 0) throw new Error("Not Authenticated");
      if (parsedinformation.role === "Contributor" || parsedinformation.role === "Ediitor") throw new Error("Not Authorized");
  const UserModel = mongoose.models.Books || mongoose.model('Books', new mongoose.Schema({}, { strict: false }), 'Books');
  
  const now = new Date();
  const month = now.getMonth() + 1; // Months are 0-indexed, so we add 1
  const day = now.getDate();
  const yearr = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Format minutes to always have two digits (e.g., '07' instead of '7')
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  // Assuming the form data contains an _id field to identify the user to update
  console.log(id, sourceType, libraryName, libraryType, libraryAddress, bookName, bookDescription, author, publication, year, copyright, isbn, language, url, keywords, bookImage);

  try {
    // Update the user document with the new fields
    await UserModel.findByIdAndUpdate(
      id, 
      { 
        "Date Contributed": `${month}/${day}/${yearr} ${hours}:${formattedMinutes}`,
        "Contributer Email Adress": parsedinformation.email,
        "Type of source": sourceType, 
        "Name of the Library": libraryName, 
        "Type of Library": libraryType, 
        "Address of the Library": libraryAddress, 
        "Book Name": bookName, 
        "Description of Book": String(bookDescription), 
        "Author(s)": author, 
        Publication: publication, 
        Year: year, 
        Copyright: copyright, 
        "ISBN/ISSN Number": isbn, 
        Language: language, 
        URL: url, 
        "Keywords used": keywords, 
        "Image of the Book": bookImage 
      }    );

  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
