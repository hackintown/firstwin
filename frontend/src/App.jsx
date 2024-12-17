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

function App() {
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <div className="max-w-md min-h-screen relative overflow-hidden">
      <I18nextProvider i18n={i18n}>
        {/* Show global loader while API requests are processing */}
        {isLoading && <Loader />}
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              // <AuthGuard roles={["user"]}>
              <UserLayout>
                <Dashboard />
              </UserLayout>
              // </AuthGuard>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <AuthGuard roles={["admin"]}>
                <AdminDashboard />
              </AuthGuard>
            }
          />
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </I18nextProvider>
    </div>
  );
}

export default App;
