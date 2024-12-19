import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";

const AuthGuard = ({ children, roles = [] }) => {
  const navigate = useNavigate();
  const { token, role, isLoading } = useSelector((state) => state.auth);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = () => {
      // Wait for auth state to be loaded
      if (isLoading) {
        return;
      }

      // Check if user is logged in
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      // Check if user has required role
      if (roles.length > 0 && !roles.includes(role)) {
        navigate("/unauthorized", { replace: true });
        return;
      }

      // User is authorized
      setIsAuthorized(true);
    };

    checkAuthorization();
  }, [navigate, roles, token, role, isLoading]);

  // Show loading state while checking authorization
  if (isLoading) {
    return <Loader />;
  }

  // Show nothing while checking authorization
  if (!isAuthorized) {
    return null;
  }

  // Render children if authorized
  return children;
};

export default AuthGuard;
