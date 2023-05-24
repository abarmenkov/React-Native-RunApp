const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const SECRET = "secret";
const USERS = [
  {
    email: "a@m.ru",
    password: "123456",
  },
  {
    email: "johnsmith",
    password: "password",
  },
  {
    email: "janedoe",
    password: "password",
  },
];

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { email, password, type } = req.body;
  console.log(req.body);
  switch (type) {
    case "login":
      if (
        !email ||
        !password ||
        !USERS.some((u) => u.email === email && u.password === password)
      ) {
        res.send({ success: false, message: "Login not found" });
      } else {
        const accessToken = jwt.sign({ email: email }, SECRET);

        res.json({
          accessToken,
          success: true,
        });
      }
      break;
    case "registration":
      res.send({ success: false, message: "Type registration" });
      break;
    default:
      res.send({ success: false, message: "Type not found" });
  }
  /*if (type === "login") {
    if (
      !email ||
      !password ||
      !USERS.some((u) => u.email === email && u.password === password)
    ) {
      res.send({ success: false, message: "Login not found" });
    } else {
      const accessToken = jwt.sign({ email: email }, SECRET);

      res.json({
        accessToken,
        success: true,
      });
    }
  } else {
    res.send({ success: false, message: "Type not found" });
  }*/
});

/*const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});*/
app.listen(8080, () => {
  console.log("Server running? -- port 8080!!!");
});
