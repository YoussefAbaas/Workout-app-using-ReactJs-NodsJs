import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/ِِAuthContext";

export default function useSignup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const signup = async (email, password) => {
    const user = { email, password };
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      //setEmptyFields(json.emptyFields);
    } else {
      localStorage.setItem("user", JSON.stringify(json));
      authContext.login(json);
      navigate("/");
      alert("successfully done");
      setError(null);
    }
  };
  return { signup, error };
}
