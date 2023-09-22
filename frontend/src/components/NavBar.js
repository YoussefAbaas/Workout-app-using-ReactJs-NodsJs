import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/ِِAuthContext";
import { WorkoutsContext } from "../contexts/WorkoutsContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { clearWorkouts } = useContext(WorkoutsContext);
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/login");
  };
  const signupHandler = () => {
    navigate("/signup");
  };
  const logoutHandler = () => {
    logout();
    clearWorkouts();
    navigate("/login");
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        {user ? (
          <div className="header-left">
            <h5>{user?.email}</h5>
            <button className="header-left-button" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        ) : (
          <div className="header-left">
            <button className="header-left-button" onClick={loginHandler}>
              Login
            </button>
            <button className="header-left-button" onClick={signupHandler}>
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
