const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
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

app.use("/", async (req, res) => {
  res.send("Server is running");
});

app.get("/", (req, res) => res.send("Server is running"));

app.get("/api/auth", authRoutes);

app.listen(process.env.PORT, async () => {
  try {
    console.log("Server running");
  } catch (error) {
    console.log("Server error", error);
  }
});
