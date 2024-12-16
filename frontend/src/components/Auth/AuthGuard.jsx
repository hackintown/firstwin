import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children, roles }) => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      // Not logged in, redirect to login page
      navigate("/login");
      return;
    }

    // Check if user has required role
    if (roles && roles.length > 0) {
      if (!user || !roles.includes(user.role)) {
        // Role not authorized, redirect to home page
        navigate("/");
        return;
      }
    }
  }, [navigate, roles, token, user]);

  return children;
};

export default AuthGuard;
