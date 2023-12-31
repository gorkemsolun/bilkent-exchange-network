/**
 * This is the main entry point of the backend application.
 * It sets up the server, connects to the database, and defines the routes.
 */
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./config.js";
import adminRouter from "./routes/adminRoute.js";
import borrowRouter from "./routes/borrowRoute.js";
import conversationRouter from "./routes/conversationRoute.js";
import donateRouter from "./routes/donateRoute.js";
import forumRouter from "./routes/forumRoute.js";
import lostfoundRouter from "./routes/lostfoundRoute.js";
import profileRouter from "./routes/profileRoute.js";
import secondhandRouter from "./routes/secondhandRoute.js";
import sectionexchangeRouter from "./routes/sectionexchangeRoute.js";
import authRouter from "./routes/userRoute.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/borrow", borrowRouter);
app.use("/secondhand", secondhandRouter);
app.use("/lostfound", lostfoundRouter);
app.use("/donate", donateRouter);
app.use("/sectionexchange", sectionexchangeRouter);
app.use("/forum", forumRouter);
app.use("/user", authRouter);
app.use("/profile", profileRouter);
app.use("/conversation", conversationRouter);
app.use("/admin", adminRouter);

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
