import React from "react";
import { useAppContext } from "../context/AppContext";

function Login() {
 const { setShowUserLogin, setUser } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(true); // نمایش/پنهان کردن فرم

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // 🟢 اصلاح شد
    setUser({
      email: "test@greatstack.dev",
      name: "GreatStack",
    });
    setShowUserLogin(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={onSubmitHandler}
        className="relative flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white text-sm text-gray-600"
      >
        {/* دکمه ضربدر */}
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

        {state === "register" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="cursor-pointer text-primary hover:underline"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="cursor-pointer text-primary hover:underline"
            >
              click here
            </span>
          </p>
        )}

        <button className="w-full py-2 text-white transition-all rounded-md cursor-pointer bg-primary hover:bg-primary-dull">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
