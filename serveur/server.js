console.clear();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./Config/dbConnect");
const cloudinary = require("./Config/cloudinary");
require("dotenv").config();
connectDB();
app.use(express.json());
app.use(cors());
// app.use("/Convertissuer", require("./routes/Convertissuer"));
//ROUTE
app.use("/api", require("./Routes/memeRoutes"));
app.use("/user", require("./Routes/user"));

cloudinary.api
  .ping()
  .then(() => console.log("✅ Cloudinary est bien connecté !"))
  .catch((err) => console.error("❌ Erreur de connexion à Cloudinary :", err));

const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server running on ${PORT}`)
);
