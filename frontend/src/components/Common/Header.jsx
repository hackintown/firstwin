import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GB, IN } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack } from "react-icons/io";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const languageSelectorRef = useRef(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng");
    if (savedLang) {
      setSelectedLanguage(savedLang.toLowerCase() === "hi" ? "HI" : "EN");
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showLanguageDropdown &&
        languageSelectorRef.current &&
        !languageSelectorRef.current.contains(event.target)
      ) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLanguageDropdown]);

  const handleLanguageChange = async (lang) => {
    try {
      await i18n.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
      setSelectedLanguage(lang === "hi" ? "HI" : "EN");
      setShowLanguageDropdown(false);
    } catch (error) {
      console.error("Language change error:", error);
    }
  };

  return (
    <div className="relative p-2 flex items-center justify-between border-b border-white/15 shadow-lg bg-[#1E1F2E]/80">
      <button className="text-foreground hover:bg-muted p-3 rounded-full transition-all duration-300 backdrop-blur-sm">
        <IoIosArrowBack className="h-6 w-6" />
      </button>
      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl font-bold text-foreground tracking-wider font-serif drop-shadow-lg">
          {t("header.title")}
        </h1>
      </div>
      <div className="relative language-selector" ref={languageSelectorRef}>
        <button
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          className="flex items-center gap-2 text-foreground px-4 py-2 rounded-full hover:bg-primary/20 
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

        {showLanguageDropdown && (
          <div
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 z-50"
            role="menu"
          >
            <div className="py-1">
              <button
                onClick={() => handleLanguageChange("en")}
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted w-full"
                role="menuitem"
              >
                <GB className="h-4 w-4" />
                English
              </button>
              <button
                onClick={() => handleLanguageChange("hi")}
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted w-full"
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
  );
};

export default Header;
