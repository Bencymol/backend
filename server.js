import express from "express";
import cors from "cors";
import multer from "multer";
import mongoose from "./db/dbConnection.js";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use(routes);

app.listen(4000, () => {
  console.log("App is running @ http://localhost:4000");
});
