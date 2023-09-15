import React, { useContext, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutsForm from "../components/WorkoutsForm";
import { WorkoutsContext } from "../contexts/WorkoutsContext";

export default function Home() {
  const { workouts, fetchWorkouts } = useContext(WorkoutsContext);
  useEffect(() => {
    fetchWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })}
      </div>
      <WorkoutsForm />
    </div>
  );
}
