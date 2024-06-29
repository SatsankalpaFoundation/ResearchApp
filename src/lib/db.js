import mongoose from "mongoose";


const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState !== 1 && connectionState !== 2) {
    try {
      await mongoose.connect("mongodb://localhost:27017/", {
        dbName: "Satsankalpa",
        bufferCommands: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected");
    } catch (err) {
      console.log("Error: ", err);
      throw new Error("Error: ", err);
    }
  }
};

export default connect;