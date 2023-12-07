import express from "express";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./config.js";
import secondhandRouter from "./routes/secondhandRoute.js";
import lostfoundRouter from "./routes/lostfoundRoute.js";
import authRouter from "./routes/userRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/secondhand", secondhandRouter);
app.use("/lostfound", lostfoundRouter);
app.use("/user", authRouter)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database");
    console.log(err);
  });
