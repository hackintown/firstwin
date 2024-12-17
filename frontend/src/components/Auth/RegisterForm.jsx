import React, { useState, useEffect, useRef } from "react";
import {
  FaChevronDown,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPhone,
  FaUser,
  FaCheck,
  FaExclamationCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { IoIosArrowBack, IoMdPhonePortrait } from "react-icons/io";
import { GB, IN, US, AU, JP, CN } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
import Header from "../Common/Header";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../features/auth/authThunks";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

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

export default function RegisterForm() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countrySelectorRef = useRef(null);
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Handle country code change
  const handleCountryChange = (code) => {
    setSelectedCountryCode(code);
    setShowCountryDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    // Dispatch the registration action
    try {
      const payload = {
        phone: formData.phone,
        password: formData.password,
        countryCode: selectedCountryCode,
        agreeToTerms: formData.agreeToTerms,
      };
      await dispatch(registerThunk(payload)).unwrap();
      toast.success("Registration successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden max-w-[400px] mx-auto">
      {/* Add subtle animated dots/grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="pattern-dots h-full w-full"></div>
      </div>
      <Header />
      {/* Title Section */}
      <div className="relative px-4 pt-4 pb-8 text-foreground">
        <h2 className="text-2xl font-medium mb-1 drop-shadow-lg text-tertiary-foreground">
          {t("header.register_now")}
        </h2>
        <p className="text-sm text-foreground font-light">
          {t("header.join_us")}
        </p>
      </div>

      {/* Form Section */}
      <div className="relative bg-background border border-border backdrop-blur-xl rounded-t-[2.5rem] min-h-screen p-6 shadow-2xl">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          {/* Register Phone Title */}
          <div className="flex flex-col items-center gap-3 justify-center text-primary mb-8 lg:mb-14 relative">
            <IoMdPhonePortrait className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-medium text-primary">
              {t("form.create_account")}
            </h3>
            <div className="absolute -bottom-4 right-0 left-0 w-[90%] mx-auto h-[2px] bg-primary" />
          </div>

          {/* Phone Input */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-gray-200 font-semibold mb-2">
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
                          countryCodes.find((c) => c.code === selectedCountryCode)
                            .flag
                        )}
                      </span>
                    )}
                  <span className="text-sm font-medium">
                    {selectedCountryCode}
                  </span>
                </div>
                <FaChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform duration-300 
                  group-hover:text-gray-600 ${showCountryDropdown ? "rotate-180" : ""
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
                        flex items-center gap-3 ${selectedCountryCode === country.code ? "bg-muted" : ""
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

          {/* Password Input */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <FaLock className="h-5 w-5 text-primary" />
              {t("form.password")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("form.password_placeholder")}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full text-secondary px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              />
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

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <FaLock className="h-5 w-5 text-primary" />
              {t("form.confirm_password")}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("form.confirm_password_placeholder")}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 text-secondary border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Invite Code Input */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <FaUser className="h-5 w-5 text-primary" />
              {t("form.invite_code")}
            </label>
            <input
              type="text"
              defaultValue="881671532114"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm font-medium text-gray-600"
              readOnly
            />
          </div>

          {/* Privacy Agreement */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.agreeToTerms}
              onChange={(e) =>
                setFormData({ ...formData, agreeToTerms: e.target.checked })
              }
              className="h-5 w-5 rounded-full border-gray-600 bg-transparent checked:bg-primary hover:cursor-pointer"
            />
            <label
              htmlFor="privacy"
              className="text-sm text-gray-400 flex gap-2"
            >
              {t("form.i_have_read")}
              <span className="text-primary">
                {t("form.privacy_agreement")}
              </span>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:from-accent hover:to-primary text-background py-3 rounded-full text-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : t("form.register")}
          </button>

          {/* Login Link */}
          <button
            type="button"
            className="w-full border border-[#2D2F45] text-gray-300 py-3 rounded-full text-lg transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#252736]"
          >
            <span className="text-gray-400">{t("form.i_have_account")}</span>
            <Link to="/login" className="text-primary">
              {t("form.login")}
            </Link>
          </button>

          <button
            onClick={() => setShowTermsModal(true)}
            className="text-primary hover:underline text-sm"
          >
            View Terms & Conditions
          </button>
        </form>
      </div>

      <div className="mt-2">
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${passwordStrength === 0
              ? "w-0"
              : passwordStrength === 1
                ? "w-1/3 bg-primary"
                : passwordStrength === 2
                  ? "w-2/3 bg-accent"
                  : "w-full bg-success"
              }`}
          ></div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 p-3 bg-[#252736] rounded-lg border border-[#2D2F45]">
        <FaShieldAlt className="h-5 w-5 text-primary" />
        <span className="text-sm text-gray-300">
          Age verification required. Must be 18+ to register
        </span>
      </div>

      <div className="text-center mt-6 text-sm text-gray-400">
        <p>Play responsibly. Gambling can be addictive.</p>
        <Link to="#" className="text-primary hover:underline">
          Learn more about responsible gambling
        </Link>
      </div>
    </div>
  );
}
