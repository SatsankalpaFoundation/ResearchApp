import { Schema, model, models } from "mongoose";

const PersonSchema = new Schema(
    {
      Name: { type: "string", required: true, unique: true },
      imageurl: { type: "string", required: true },
      desc: { type: "string", required: true, unique: true },
      catergory: { type: "string", required: true, unique: true },
    }
  );
  
  const Person = models.Person || model("Person", PersonSchema);
  
  export default Person;