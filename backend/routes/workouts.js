const express = require("express");
const workoutsModel = require("../models/workoutsModel");
const {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutsController");

const router = express.Router();

router.get("/", getAllWorkouts);

router.get("/:id", getSingleWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
