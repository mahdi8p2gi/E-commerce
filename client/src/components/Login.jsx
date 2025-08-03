import React, { useState, useCallback } from "react";
import { useAppContext } from "../context/AppContext";

function Login() {
  const { setShowUserLogin, setUser } = useAppContext();

  const [state, setState] = useState("login"); // "login" | "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!email || !password || (state === "register" && !name)) {
        return setError("لطفاً همه فیلدها را پر کنید.");
      }

      setLoading(true);

      const endpoint = state === "login" ? "/api/user/login" : "/api/user/register";
      const payload =
        state === "login"
          ? { email, password }
          : { username: name, email, password };

      try {
        const response = await fetch(`http://localhost:5000${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok || !data.user) {
          throw new Error(data.message || "ورود/ثبت‌نام ناموفق بود.");
        }

        setUser({
          id: data.user.id || "",
          username: data.user.username || "",
          email: data.user.email || "",
        });

        resetForm();
        setShowUserLogin(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [state, name, email, password, setUser, setShowUserLogin]
  );

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white text-sm text-gray-600"
      >
        <button
          type="button"
          onClick={() => setShow(false)}
          className="absolute text-xl text-gray-400 top-3 right-3 hover:text-gray-600"
        >
          &times;
        </button>

        <p className="m-auto text-2xl font-medium">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {error && (
          <p className="text-sm text-center text-red-500 whitespace-pre-wrap">
            {error}
          </p>
        )}

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

        <p className="text-sm">
          {state === "register"
            ? "Already have an account?"
            : "Create an account?"}{" "}
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white transition-all rounded-md cursor-pointer bg-primary hover:bg-primary-dull disabled:opacity-60"
        >
          {loading
            ? "لطفاً صبر کنید..."
            : state === "register"
            ? "Create Account"
            : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
