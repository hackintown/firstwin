import React, { useState, useRef } from "react";
import {
  FaChevronDown,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaCheck,
  FaPhone,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import { GB, IN, US, AU, JP, CN } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
import Header from "../Common/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../features/auth/authThunks";
import { toast } from "react-toastify";

const countryCodes = [
  {
    code: "+1",
    label: "United States",
    flag: US,
  },
  {
    code: "+44",
    label: "United Kingdom",
    flag: GB,
  },
  {
    code: "+91",
    label: "India",
    flag: IN,
  },
  {
    code: "+61",
    label: "Australia",
    flag: AU,
  },
  {
    code: "+81",
    label: "Japan",
    flag: JP,
  },
  {
    code: "+86",
    label: "China",
    flag: CN,
  },
];

export default function LoginForm() {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("phone"); // "phone" or "email"
  const countrySelectorRef = useRef(null);

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    rememberMe: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  // Handle country code change
  const handleCountryChange = (code) => {
    setSelectedCountryCode(code);
    setShowCountryDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.password) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        phone: formData.phone,
        password: formData.password,
      };

      // Dispatch the login action
      const response = await dispatch(loginThunk(payload)).unwrap();
      toast.success("Login successful!");

      // Navigate based on user role
      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err || "Login failed");
    }
  };
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden max-w-[400px] mx-auto">
      <div className="absolute inset-0 opacity-5">
        <div className="pattern-dots h-full w-full"></div>
      </div>

      <Header />

      <div className="relative px-6 pt-6 pb-6 text-foreground">
        <h2 className="text-2xl font-medium mb-2 drop-shadow-lg text-foreground">
          {t("header.login")}
        </h2>
        <p className="text-sm text-foreground font-light">
          Please log in with your phone number or email
        </p>
      </div>

      <div className="relative bg-background border border-border backdrop-blur-xl rounded-t-[2.5rem] min-h-screen p-6 shadow-2xl">
        {/* Login Tabs */}
        <div className="flex mb-8 border-b border-[#2D2F45]">
          <button
            onClick={() => setActiveTab("phone")}
            className={`flex items-center justify-center gap-2 flex-1 pb-4 text-lg font-medium transition-all ${
              activeTab === "phone"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <IoMdPhonePortrait className="h-5 w-5" />
            Phone Number
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`flex items-center justify-center gap-2 flex-1 pb-4 text-lg font-medium transition-all ${
              activeTab === "email"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <MdEmail className="h-5 w-5" />
            Email Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          {/* Conditional Input Field */}
          {activeTab === "phone" ? (
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-200 font-medium mb-2">
                <FaPhone className="h-5 w-5 text-primary" />
                {t("form.phone_number")}
              </label>
              <div
                className="flex gap-2 relative country-selector"
                ref={countrySelectorRef}
              >
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center justify-between gap-2 w-[120px] px-3 py-2.5 
                border border-[#2D2F45] rounded-xl text-gray-200 bg-[#252736] hover:bg-[#2D2F45] 
                transition-all shadow-sm group focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-haspopup="listbox"
                  aria-expanded={showCountryDropdown}
                >
                  <div className="flex items-center gap-2">
                    {countryCodes.find((c) => c.code === selectedCountryCode)
                      ?.flag && (
                      <span className="w-5">
                        {React.createElement(
                          countryCodes.find(
                            (c) => c.code === selectedCountryCode
                          ).flag
                        )}
                      </span>
                    )}
                    <span className="text-sm font-medium">
                      {selectedCountryCode}
                    </span>
                  </div>
                  <FaChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform duration-300 
                  group-hover:text-gray-600 ${
                    showCountryDropdown ? "rotate-180" : ""
                  }`}
                  />
                </button>
                {showCountryDropdown && (
                  <ul
                    className="absolute top-14 left-0 w-[250px] rounded-xl shadow-xl bg-background backdrop-blur-sm 
                  ring-1 ring-black/5 z-50 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-primary 
                  scrollbar-track-background divide-y divide-gray-100 animate-fadeIn"
                    role="listbox"
                    tabIndex="-1"
                  >
                    {countryCodes.map((country) => (
                      <li key={country.code}>
                        <button
                          onClick={() => handleCountryChange(country.code)}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-all duration-200
                        flex items-center gap-3 ${
                          selectedCountryCode === country.code ? "bg-muted" : ""
                        }`}
                          role="option"
                        >
                          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-base font-medium">
                            {country.code}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">
                              {country.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {country.code}
                            </span>
                          </div>
                          {selectedCountryCode === country.code && (
                            <span className="ml-auto text-accent">
                              <FaCheck className="h-4 w-4" />
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="relative">
                  <input
                    type="tel"
                    placeholder={t("form.phone_number_placeholder")}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 pl-12 border border-[#2D2F45] bg-[#252736] text-white rounded-xl  
                    focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm 
                  valid:border-green-500 invalid:border-red-500"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <FaPhone className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-200 font-medium mb-2">
                <MdEmail className="h-5 w-5 text-primary" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 pl-12 border border-[#2D2F45] bg-[#252736] text-white rounded-xl  
                    focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <MdEmail className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          )}

          {/* Password Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-200 font-medium mb-2">
              <FaLock className="h-5 w-5 text-primary" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2.5 pl-12 border border-[#2D2F45] bg-[#252736] text-white rounded-xl  
                focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <FaLock className="h-5 w-5 text-primary" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-300">Remember password</span>
            </label>
            <button
              type="button"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:from-accent hover:to-primary 
            text-background py-3 rounded-full text-xl font-medium transition-all duration-300 
            shadow-lg hover:shadow-xl"
          >
            {t("form.login")}
          </button>

          {/* Register Link */}
          <button
            type="button"
            className="w-full border border-[#2D2F45] text-gray-300 py-3 rounded-full text-lg 
            transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#252736]"
          >
            <span className="text-gray-400">Don't have an account?</span>
            <Link to="/register" className="text-primary">
              {t("form.register")}
            </Link>
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        {/* Customer Service Link */}
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-primary hover:underline text-sm"
          >
            Customer Service
          </button>
        </div>
      </div>
    </div>
  );
}
