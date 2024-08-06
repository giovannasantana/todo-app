import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://Cluster84393:RFNmTEx4bmte@cluster84393.5mdu0xn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster84393";
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
