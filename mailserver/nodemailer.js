const express = require("express");
const sendEmail = require(`./mail`);
const bodyParser = require("body-parser");
const app = express();
//avoid cors
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

const port = 3000;

app.use(express.json());
//handle post request from the frontend
app.post("/mail", async function (req, res, next) {
  let data = req.body;
  let response = await sendEmail(data.email, data.weather);

  res.send({response});
});

app.listen(port, () => {
  console.log(`Mailer server listening on port ${port}`);
});
