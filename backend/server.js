require("dotenv").config();

const express = require("express");
const workoutsRouter = require("./routes/workouts");
const mongoose = require("mongoose");

// express app
const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connect to db & listened at port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutsRouter);
