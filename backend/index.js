require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const handler = require("./components/paragraph.js");
const sign = require("./components/sign.js");
const mongoose = require("mongoose");
const reply = require("./components/codegen.js");
const uri = process.env.MONGO_URI;
const path = require("path");

const bodyParser = require("body-parser");
const codecon = require("./components/codecon.js");
const chat = require("./components/chat.js");
async function connectToMongoDB() {
  await mongoose
    .connect(uri)
    .then(() => {
      app.listen(port, () => console.log(`Listening on port ${port}`));
      console.log("Connected to MongoDB successfully!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
connectToMongoDB();
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/sign-up", sign.register);
app.get("*", function (_, res) {
  res.sendFile(__dirname, "./frontend/build/index.html"),
    (err) => {
      res.status(400).send(err);
    };
});
app.use("/api/login", sign.signin);
app.post("/api/paragraph", handler.getData);
app.post("/api/codegen", reply);
app.post("/api/codecon", codecon);
app.post("/api/chat", chat);
app.get('/',(req,res)=>{
  res.json({message:"Routes starts at /api/"});
})