import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, sendCode } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      await dispatch(signup(form)).unwrap();
      toast.success("Signup successful");

      await dispatch(sendCode({ email: form.email })).unwrap();
      toast.success("Verification code sent");

      navigate("/verify", { state: { email: form.email } });
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 border border-gray-800 p-8 shadow-lg rounded-xl w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-white">
          Signup
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

        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;