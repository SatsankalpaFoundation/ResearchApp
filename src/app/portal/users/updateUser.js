'use server'
import mongoose from 'mongoose';
import connect from '@/lib/db';

export async function updateUser(id, name, email, role) {
    await connect(); // Connect to MongoDB

    const UserModel = mongoose.models.users || mongoose.model('users', new mongoose.Schema({}, { strict: false }), 'users');

    // Extract necessary fields from formData

    // Assuming the form data contains an _id field to identify the user to update
    console.log(id, name, email, role);
    try {
        await UserModel.findByIdAndUpdate(id, { name: name, email: email, role: role } ,
            { new: true } // Return the updated document
        );

    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}