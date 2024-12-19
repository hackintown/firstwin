import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "./App.jsx";
import "./i18n/i18n";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "./app/store.js";

// PWA registration using Vite's PWA plugin
if ("serviceWorker" in navigator) {
  const updateSW = registerSW({
    onNeedRefresh() {
      // Show a prompt to user about new content being available
      if (confirm("New content available. Reload?")) {
        updateSW(true);
      }
    },
    onOfflineReady() {
      // Show a ready to work offline to user
      console.log("App ready to work offline");
    },
  });
}

// Add PWA installation prompt handler
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;

  const installButton = document.createElement("button");
  installButton.textContent = "Install App";
  installButton.className = "pwa-install-button"; // Add styling class
  installButton.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
      installButton.remove(); // Remove button after installation or rejection
    }
  });

  document.body.appendChild(installButton);
});

window.addEventListener("appinstalled", () => {
  console.log("PWA installed successfully");
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
