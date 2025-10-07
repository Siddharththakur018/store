const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/authRoutes");
const sellerRoutes = require("./routes/sellerRoutes")

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,                
  })
);
app.use(cookieParser());
dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("Db error", err);
  });


app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes)

app.listen(process.env.PORT, async () => {
  try {
    console.log("Server running");
  } catch (error) {
    console.log("Server error", error);
  }
});
