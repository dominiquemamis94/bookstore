require("dotenv").config();
const express = require("express");
const app = express();

//Middleware
app.use(express.json()); //parse json bodies in the request bodies

app.use("/books", require("./routes/bookRoutes"));
app.use("/login", require("./routes/userRoutes"));

//Global Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = app;
