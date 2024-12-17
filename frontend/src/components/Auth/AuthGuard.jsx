import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children, roles = [] }) => {
  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.auth); // Extract token and role from Redux state

  useEffect(() => {
    if (!token) {
      // If the user is not logged in, redirect to login page
      navigate("/login");
      return;
    }

    // If roles are specified, check if the user's role is authorized
    if (roles.length > 0 && !roles.includes(role)) {
      // Role not authorized, redirect to a "Not Authorized" page or home
      navigate("/not-found");
      return;
    }
  }, [navigate, roles, token, role]);

  // Render the children components if authorized
  return token && (roles.length === 0 || roles.includes(role)) ? (
    children
  ) : null;
};

export default AuthGuard;
