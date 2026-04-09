import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, sendCode } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// const passwordHint =
//   "Min 8 chars · uppercase · lowercase · number · special character\nExample: User@1234";

const Signup = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await dispatch(signup(form)).unwrap();
      toast.success("Account created successfully!");

      await dispatch(sendCode({ email: form.email })).unwrap();
      toast.success("Verification code sent to your email");

      navigate("/verify", { state: { email: form.email } });
    } catch (err: any) {
      const msg = typeof err === "string" ? err : err?.message;
      toast.error(msg || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 border border-gray-800 p-8 shadow-lg rounded-xl w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-white">
          Create Account
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
          className="w-full mb-1 p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Password hint shown always so user knows the rule upfront */}
        <p className="text-xs text-gray-400 mb-3 leading-relaxed">
          Min 8 chars, uppercase, lowercase, number &amp; special character.{" "}
          <span className="text-blue-400">e.g. User@1234</span>
        </p>

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p
          className="text-sm mt-3 text-center cursor-pointer text-blue-400 hover:text-blue-300 transition"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Signup;