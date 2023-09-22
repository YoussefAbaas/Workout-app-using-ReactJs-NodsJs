const workoutsModel = require("../models/workoutsModel");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await workoutsModel
      .find({ ownerId: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json(error);
  }
};
const getSingleWorkout = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "no such workout like that" });
    const workout = await workoutsModel.findById(id);
    if (!workout) res.status(404).json({ error: "no such workout like that" });
    else res.status(200).json(workout);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (!load) {
      emptyFields.push("load");
    }
    if (!reps) {
      emptyFields.push("reps");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all fields", emptyFields });
    }
    const workout = await workoutsModel.create({
      title,
      load,
      reps,
      ownerId: req.user._id,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await workoutsModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateWorkout = async (req, res) => {
  const id = req.params.id;
  const { title, load, reps } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "no such workout like that" });
    const result = await workoutsModel.findByIdAndUpdate(id, {
      title,
      load,
      reps,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
