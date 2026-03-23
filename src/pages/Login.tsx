import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { RootState } from "../app/store";

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    dispatch(login(form));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login Successful ");
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 p-8 shadow-lg rounded-xl w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p
          className="text-sm mt-3 text-center cursor-pointer text-blue-400 hover:text-blue-300 transition"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Signup
        </p>
      </form>
    </div>
  );
};

export default Login;