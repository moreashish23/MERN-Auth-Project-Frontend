import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendForgotCode } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email required");
      return;
    }

    try {
      await dispatch(sendForgotCode({ email })).unwrap();
      toast.success("Code sent");
      navigate("/reset-password", { state: { email } });
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded">
        <h2 className="text-white mb-3">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full mb-3 p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Send Code
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;