import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const Login = () => {
  const { setShowUserLogin, setUser } = useAppContext();
  const navigate = useNavigate();

  const [state, setState] = useState("login"); // "login" | "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  // Reset form fields
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!email || !password || (state === "register" && !name)) {
        return setError("Please fill all fields.");
      }

      setLoading(true);

      const endpoint = state === "login" ? "/api/users/login" : "/api/users/register";
      const payload = state === "login"
        ? { email, password }
        : { username: name, email, password };

      try {
        const response = await axios.post(
          `${API_URL}${endpoint}`,
          payload,
          { withCredentials: true } // جایگزین credentials
        );

        const data = response.data;

        if (!data.success) {
          return setError(data.message || "Something went wrong.");
        }

        setUser({
          id: data.user?.id || "",
          username: data.user?.username || "",
          email: data.user?.email || "",
          role: data.user?.role || "",
        });

        navigate("/");
        resetForm();
        setShowUserLogin(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Network error");
      } finally {
        setLoading(false);
      }
    },
    [state, name, email, password, setUser, setShowUserLogin, navigate, API_URL]
  );


 

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white text-sm text-gray-600"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setShow(false)}
          className="absolute text-3xl text-black top-3 right-3 hover:text-red-600 transition duration-200 hover:scale-110"
        >
          &times;
        </button>

        {/* Form title */}
        <p className="m-auto text-2xl font-medium">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {/* Error message */}
        {error && (
          <p className="text-sm text-center text-red-500 whitespace-pre-wrap">{error}</p>
        )}

        {/* Name input for register */}
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary"
              type="text"
              required
            />
          </div>
        )}

        {/* Email input */}
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary"
            type="email"
            required
          />
        </div>

        {/* Password input */}
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary"
            type="password"
            required
          />
        </div>

        {/* Toggle login/register */}
        <p className="text-sm">
          {state === "register" ? "Already have an account?" : "Create an account?"}{" "}
          <span
            onClick={() => {
              setState(state === "login" ? "register" : "login");
              setError("");
              resetForm();
            }}
            className="cursor-pointer text-primary hover:underline"
          >
            click here
          </span>
        </p>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white transition-all rounded-md cursor-pointer bg-primary hover:bg-primary-dull disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : state === "register"
              ? "Create Account"
              : "Login"}
        </button>

      </form>
    </div>
  );
};

export default Login;
