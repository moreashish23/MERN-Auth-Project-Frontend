import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetUserPassword } from "../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!code || !newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (code.length !== 6) {
      toast.error("Code must be exactly 6 digits");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        resetUserPassword({ email, providedCode: code, newPassword })
      ).unwrap();

      toast.success("Password updated! Please login with your new password.");
      navigate("/login");
    } catch (err: any) {
      const msg = typeof err === "string" ? err : err?.message;
      toast.error(msg || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl w-80">
        <h2 className="text-white text-xl font-bold mb-1 text-center">
          Reset Password
        </h2>
        <p className="text-gray-400 text-xs text-center mb-4">
          Enter the 6-digit code sent to your email
        </p>

        <input
          placeholder="6-digit code"
          maxLength={6}
          className="w-full mb-3 p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-1 p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          Min 8 chars, uppercase, lowercase, number &amp; special character.{" "}
          <span className="text-blue-400">e.g. User@1234</span>
        </p>

        <button
          onClick={handleReset}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 w-full rounded-lg hover:bg-green-600 disabled:opacity-50 transition"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;