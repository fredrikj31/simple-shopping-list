import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomeRoute } from "./routes/home/route";
import { SettingsRoute } from "./routes/settings/route";
import { PWAUpdatePrompt } from "./components/PWAUpdatePrompt";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/settings" element={<SettingsRoute />} />
        </Routes>
      </BrowserRouter>
      <PWAUpdatePrompt />
    </>
  );
};
