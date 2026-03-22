import { useDispatch, useSelector } from "react-redux";
import { logoutState } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutState());
    navigate("/login");
  };

  return (
    <div className="bg-gray-950 border-b border-gray-800 px-4 sm:px-6 py-4">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-lg sm:text-xl font-bold cursor-pointer"
        >
          <span className="text-blue-500">Post</span>
          <span className="text-purple-500">Sphere</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-300">
          <button onClick={() => navigate("/")}>All Posts</button>

          {isAuthenticated ? (
            <>
              <button onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-lg text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-500 px-3 py-1 rounded-lg text-white"
              >
                Signup
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-3 mt-4 md:hidden text-gray-300">
          <button onClick={() => navigate("/")}>All Posts</button>

          {isAuthenticated ? (
            <>
              <button onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-500 px-3 py-1 rounded text-white"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;