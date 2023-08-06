import mongoose from "mongoose";

export async function dbConnect() {
  await mongoose.connect(process.env.ATLAS_URI || 'mongodb+srv://snachan:snachan%40123@cluster0.alyunsy.mongodb.net/?retryWrites=true&w=majority', {dbName: 'snachan-db', autoIndex: true});
}
