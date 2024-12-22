import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";

// Import your components/pages
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";
import AuthGuard from "./components/Auth/AuthGuard";
import NotFound from "./pages/NotFound";
import Loader from "./components/Common/Loader";
import { useSelector } from "react-redux";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Dashboard from "./pages/User/Dashboard";
import UserLayout from "./layouts/UserLayout";
import Unauthorized from "./pages/Unauthorized";
import AdminLayout from "./layouts/AdminLayout";
import PWAPrompt from "./components/PWAPrompt";
import Wingo from "./pages/User/Wingo";

function App() {
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <div className="max-w-md sm:max-w-full min-h-screen relative overflow-hidden">
      <I18nextProvider i18n={i18n}>
        {/* Show global loader while API requests are processing */}
        {isLoading && <Loader />}
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected User Routes */}
          <Route
            element={
              <AuthGuard roles={["user", "admin"]}>
                <UserLayout />
              </AuthGuard>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/wingo" element={<Wingo />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route
            element={
              <AuthGuard roles={["admin"]}>
                <AdminLayout />
              </AuthGuard>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </I18nextProvider>
      <button
        id="install-app"
        style={{
          display: "none", // Hidden by default
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Install App
      </button>
      <PWAPrompt />
    </div>
  );
}

export default App;
