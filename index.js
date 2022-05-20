import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";

const app = express();

app.use("/posts", postRoutes); // по адресу localhost:3000/posts будут postRoutes
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://admin:12345@cluster0.hwrz9.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log("server running on port " + PORT);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });

// mongoose.set("useFindAndModify", false);
