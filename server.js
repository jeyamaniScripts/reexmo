import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import employeeRouter from "./routes/employeeRoute.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", employeeRouter);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
