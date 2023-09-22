import React, { useContext, useState } from "react";
import { WorkoutsContext } from "../contexts/WorkoutsContext";
import { AuthContext } from "../contexts/ِِAuthContext";

export default function WorkoutsForm() {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { fetchWorkouts } = useContext(WorkoutsContext);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const workout = { title, load, reps };
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      fetchWorkouts();
      setTitle("");
      setReps("");
      setLoad("");
      setEmptyFields([]);
    }
  };
  return (
    <div>
      <form action="" className="create" onSubmit={handleSubmit}>
        <h3>Add a new workout</h3>
        <label>Exercise title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {emptyFields.includes("title") && (
          <p className="error">required field</p>
        )}
        <label>Load (in Kg):</label>
        <input
          type="number"
          value={load}
          onChange={(e) => {
            setLoad(e.target.value);
          }}
        />
        {emptyFields.includes("load") && (
          <p className="error">required field</p>
        )}
        <label>Reps :</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => {
            setReps(e.target.value);
          }}
        />
        {emptyFields.includes("reps") && (
          <p className="error">required field</p>
        )}
        <button type="submit">Add Workout</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
