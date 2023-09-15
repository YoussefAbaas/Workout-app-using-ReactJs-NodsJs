import React, { useState } from "react";

export const WorkoutsContext = React.createContext();

export const WorkoutsProvider = (props) => {
  const [workouts, setWorkouts] = useState(null);
  const fetchWorkouts = async () => {
    const response = await fetch("/api/workouts");
    const json = await response.json();
    if (response.ok) {
      setWorkouts(json);
    }
  };

  return (
    <WorkoutsContext.Provider
      value={{
        workouts,
        fetchWorkouts,
      }}
    >
      {props.children}
    </WorkoutsContext.Provider>
  );
};
