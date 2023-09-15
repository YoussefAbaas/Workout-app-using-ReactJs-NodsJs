import React, { useContext } from "react";
import { WorkoutsContext } from "../contexts/WorkoutsContext";

export default function WorkoutDetails({ workout }) {
  const { fetchWorkouts } = useContext(WorkoutsContext);
  const deleteWorkout = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("deleted successfully");
      fetchWorkouts();
    }
  };
  return (
    <div className="workout-container">
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg):</strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps :</strong>
          {workout.reps}
        </p>
        <p>{workout.createdAt}</p>
      </div>
      <button onClick={deleteWorkout}>Delete</button>
    </div>
  );
}
