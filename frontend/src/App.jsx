import { useState } from "react";
import RegisterForm from "./components/Auth/RegisterForm";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <RegisterForm />
    </I18nextProvider>
  );
}

export default App;
