import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: true },
  role: { type: String, required: true },
});
export default mongoose.model("employess", employeeSchema);
