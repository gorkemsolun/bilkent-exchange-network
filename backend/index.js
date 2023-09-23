import express from "express";

const app = express();

app.listen(7474, () => {
  console.log("connected");
});
