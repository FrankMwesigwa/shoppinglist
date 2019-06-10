import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import items from "./items/routes";
import users from "./users/routes";
import auth from "./auth/routes";

const app = express();
dotenv.config();

//here we are using bodyparse from the express library
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected .... "))
  .catch(err => console.log(err));

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/login", auth);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 9005;

app.listen(port, () => console.log(`Server started on port ${port}`));
