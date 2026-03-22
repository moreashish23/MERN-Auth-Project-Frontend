import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyUser } from "../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Verify = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [code, setCode] = useState("");

  const handleVerify = async () => {
    try {
      await dispatch(
        verifyUser({ email, providedCode: code })
      ).unwrap();

      toast.success("Account verified 🎉");
      navigate("/login");
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-lg font-bold mb-3">Enter Code</h2>

        <input
          type="text"
          placeholder="6 digit code"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Verify;