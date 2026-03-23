import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendForgotCode } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      await dispatch(sendForgotCode({ email })).unwrap();

      
      toast.success("Verification code sent to your email!");

      navigate("/reset-password", { state: { email } });
    } catch (err: any) {
      toast.error(
        typeof err === "string"
          ? err
          : err?.message || "Failed to send code"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded w-80">
        <h2 className="text-white mb-3 text-center font-semibold">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 w-full rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Code"}
        </button>

        
        <p className="text-xs text-gray-400 mt-3 text-center">
          You will receive a 6-digit code via email
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;