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

  const handleReset = async () => {
    if (!code || !newPassword) {
      toast.error("All fields required");
      return;
    }

    try {
      await dispatch(
        resetUserPassword({
          email,
          providedCode: code,
          newPassword,
        })
      ).unwrap();

      toast.success("Password updated");
      navigate("/login");
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <div className="bg-gray-900 p-6 rounded">
        <h2 className="text-white mb-3">Reset Password</h2>

        <input
          placeholder="Enter code"
          className="w-full mb-2 p-2"
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-2"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="bg-green-500 text-white px-4 py-2 w-full"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;