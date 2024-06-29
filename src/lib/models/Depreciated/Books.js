import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const booksSchemas = new Schema({
    "_id": { type: Schema.Types.ObjectId },    
    "Id": Number,
    "Date Contributed": String,
    "Contributer Email Adress": String,
    "Type of source": String,
    "Name of the Library": String,
    "Type of Library": String,
    "Address of the Library": String,
    "Book Name": String,
    "Description of Book": String,
    "Author(s)": String,
    "Publication": String,
    "Year": Number,
    "Copyright": String,
    "ISBN/ISSN Number": String,
    "Language": String,
    "URL": String,
    "Keywords used": String,
    "Image of the Book": String
});

const Books = mongoose.models.Books || new mongoose.model('Books', booksSchemas);


export default Books;
