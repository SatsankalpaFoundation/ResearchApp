import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, required: false },
  role: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
