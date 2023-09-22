import React, { useContext } from "react";
import { WorkoutsContext } from "../contexts/WorkoutsContext";
import { AuthContext } from "../contexts/ِِAuthContext";

export default function WorkoutDetails({ workout }) {
  const { fetchWorkouts } = useContext(WorkoutsContext);
  const { user } = useContext(AuthContext);
  const deleteWorkout = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
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
