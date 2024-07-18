import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
      email: { type: "string", required: true, unique: true },
      password: { type: "string", required: true },
      name: { type: "string", required: true },
      avatar: { type: "string", required: false },
    }
  );
  
  const User = models.User || model("User", UserSchema);
  
  export default User;