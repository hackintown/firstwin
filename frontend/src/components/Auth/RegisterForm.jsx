import React, { useState, useEffect, useRef } from "react";
import {
  FaChevronDown,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPhone,
  FaUser,
  FaCheck,
} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { GB, IN, US, AU, JP, CN } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Language dropdown state
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  // Country code dropdown state
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Refs for dropdowns (to detect outside clicks)
  const languageSelectorRef = useRef(null);
  const countrySelectorRef = useRef(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng");
    if (savedLang) {
      setSelectedLanguage(savedLang.toLowerCase() === "hi" ? "HI" : "EN");
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  // Handle click outside of language dropdown
  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showLanguageDropdown &&
        languageSelectorRef.current &&
        !languageSelectorRef.current.contains(event.target)
      ) {
        setShowLanguageDropdown(false);
      }
      if (
        showCountryDropdown &&
        countrySelectorRef.current &&
        !countrySelectorRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLanguageDropdown, showCountryDropdown]);

  // Handle language change
  const handleLanguageChange = async (lang) => {
    try {
      // lang should be 'en' or 'hi'
      await i18n.changeLanguage(lang);
      // Store the language in localStorage for persistence
      localStorage.setItem("i18nextLng", lang);

      // Update the selectedLanguage state for the UI label
      // This is just for UI display, not for i18n itself.
      setSelectedLanguage(lang === "hi" ? "HI" : "EN");

      setShowLanguageDropdown(false);
    } catch (error) {
      console.error("Language change error:", error);
    }
  };

  // Handle country code change
  const handleCountryChange = (code) => {
    setSelectedCountryCode(code);
    setShowCountryDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden max-w-[400px] mx-auto">
      {/* Header */}
      <div className="relative p-2 flex items-center justify-between border-b border-white/10 shadow-md">
        <button className="text-white hover:bg-white/10 p-3 rounded-full transition-all duration-300 backdrop-blur-sm">
          <IoIosArrowBack className="h-6 w-6" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-4xl font-bold text-white tracking-wider drop-shadow-lg">
            {t("header.title")}
          </h1>
        </div>
        <div className="relative language-selector" ref={languageSelectorRef}>
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-full hover:bg-white/20 
            transition-all duration-300 backdrop-blur-sm"
            aria-haspopup="true"
            aria-expanded={showLanguageDropdown}
          >
            {selectedLanguage === "EN" ? (
              <GB className="h-4 w-4" title="English" />
            ) : (
              <IN className="h-4 w-4" title="Hindi" />
            )}
            <span className="text-sm font-medium">{selectedLanguage}</span>
            <FaChevronDown
              className={`h-3 w-3 transition-transform duration-300 ${
                showLanguageDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {showLanguageDropdown && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
              role="menu"
            >
              <div className="py-1">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  role="menuitem"
                >
                  <GB className="h-4 w-4" />
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("hi")}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  role="menuitem"
                >
                  <IN className="h-4 w-4" />
                  हिंदी (Hindi)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Title Section */}
      <div className="relative px-6 pt-8 pb-12 text-white text-center">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
          {t("header.register_now")}
        </h2>
        <p className="text-lg text-white/90 font-light">
          {t("header.join_us")}
        </p>
      </div>

      {/* Form Section */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-t-[2.5rem] min-h-screen p-8 shadow-2xl">
        <div className="max-w-md mx-auto space-y-6">
          {/* Register Phone Title */}
          <div className="flex items-center gap-3 justify-center text-blue-600 mb-8">
            <h3 className="text-2xl font-bold">{t("form.create_account")}</h3>
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <FaPhone className="h-5 w-5 text-blue-500" />
              {t("form.phone_number")}
            </label>
            <div
              className="flex gap-2 relative country-selector"
              ref={countrySelectorRef}
            >
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center justify-between gap-2 w-[120px] px-3 py-3 
                border border-gray-200 rounded-xl text-gray-700 bg-white hover:bg-gray-50 
                transition-all shadow-sm group focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  group-hover:text-gray-600 ${
                    showCountryDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showCountryDropdown && (
                <ul
                  className="absolute top-14 left-0 w-[250px] rounded-xl shadow-xl bg-white/95 backdrop-blur-sm 
                  ring-1 ring-black/5 z-50 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-blue-500 
                  scrollbar-track-gray-100 divide-y divide-gray-100 animate-fadeIn"
                  role="listbox"
                  tabIndex="-1"
                >
                  {countryCodes.map((country) => (
                    <li key={country.code}>
                      <button
                        onClick={() => handleCountryChange(country.code)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-all duration-200
                        flex items-center gap-3 ${
                          selectedCountryCode === country.code
                            ? "bg-blue-50"
                            : ""
                        }`}
                        role="option"
                      >
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base font-medium">
                          {country.code}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {country.label}
                          </span>
                          <span className="text-xs text-gray-500">
                            {country.code}
                          </span>
                        </div>
                        {selectedCountryCode === country.code && (
                          <span className="ml-auto text-blue-600">
                            <FaCheck className="h-4 w-4" />
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <input
                type="tel"
                placeholder={t("form.phone_number_placeholder")}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <FaLock className="h-5 w-5 text-blue-500" />
              {t("form.password")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("form.password_placeholder")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
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
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <FaLock className="h-5 w-5 text-blue-500" />
              {t("form.confirm_password")}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("form.confirm_password_placeholder")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
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
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <FaUser className="h-5 w-5 text-blue-500" />
              {t("form.invite_code")}
            </label>
            <input
              type="text"
              defaultValue="881671532114"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm font-medium text-gray-600"
              readOnly
            />
          </div>

          {/* Privacy Agreement */}
          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="privacy"
              className="mt-1 h-5 w-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="privacy"
              className="text-sm text-gray-600 leading-tight"
            >
              {t("form.privacy_agreement")}
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t("form.register")}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600">{t("form.login_prompt")}</p>
        </div>
      </div>
    </div>
  );
}
