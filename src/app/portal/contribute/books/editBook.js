'use server';
import mongoose from 'mongoose';
import connect from '@/lib/db';

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

  const UserModel = mongoose.models.Books || mongoose.model('Books', new mongoose.Schema({}, { strict: false }), 'Books');

  // Assuming the form data contains an _id field to identify the user to update
  console.log(id, sourceType, libraryName, libraryType, libraryAddress, bookName, bookDescription, author, publication, year, copyright, isbn, language, url, keywords, bookImage);

  try {
    // Update the user document with the new fields
    await UserModel.findByIdAndUpdate(
      id, 
      { 
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
