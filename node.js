const express = require("express");
const albumRoutes = require("./albumRoutes/albumRoutes");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json()); // Helps process request body to a data the server can use

// Connect to MongoDB
db.on("error", (error) => console.log("DB connection error:", error));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", albumRoutes);
console.log("Routes loaded");

app.listen(1669, () => {
  console.log("Server is running on port 1669");
});
