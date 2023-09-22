const express = require("express");
const workoutsModel = require("../models/workoutsModel");
const {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all workouts routes
router.use(requireAuth);

router.get("/", getAllWorkouts);

router.get("/:id", getSingleWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
