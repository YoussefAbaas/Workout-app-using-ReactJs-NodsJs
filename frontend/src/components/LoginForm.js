import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useSignup from "../hooks/useSignup";

export default function LoginForm() {
  const path = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error: loginError } = useLogin();
  const { signup, error: signupError } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (path.pathname === "/signup") await signup(email, password);
    else await login(email, password);
  };
  return (
    <div>
      <form action="" className="create" onSubmit={handleSubmit}>
        <h3>{path.pathname === "/signup" ? "Sign up" : "Login"}</h3>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">
          {path.pathname === "/signup" ? "Sign up" : "Login"}
        </button>
      </form>
      {path.pathname === "/signup" ? (
        <div className={signupError ? "error" : ""}>{signupError}</div>
      ) : (
        <div className={loginError ? "error" : ""}>{loginError}</div>
      )}
    </div>
  );
}
