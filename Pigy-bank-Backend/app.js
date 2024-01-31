const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const piggyBankRoutes = require("./routes/piggy-bank");

const app = express();

app.use(bodyparser.json());

// CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });
app.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(piggyBankRoutes);

mongoose
  .connect(
    "mongodb+srv://tanish001:6N4nWCcarCaHp1vE@cluster0.kiedzcc.mongodb.net/Bank?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Db Connected");
  });

app.listen(8080);
