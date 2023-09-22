import React, { useContext, useState } from "react";
import { AuthContext } from "./ِِAuthContext";
export const WorkoutsContext = React.createContext();

export const WorkoutsProvider = (props) => {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState(null);
  const fetchWorkouts = async () => {
    const response = await fetch("/api/workouts", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setWorkouts(json);
    }
  };
  const clearWorkouts = () => {
    setWorkouts(null);
  };

  return (
    <WorkoutsContext.Provider
      value={{
        workouts,
        fetchWorkouts,
        clearWorkouts,
      }}
    >
      {props.children}
    </WorkoutsContext.Provider>
  );
};
