import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@shadcn-ui/components/ui/sonner";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { PWAUpdatePrompt } from "./components/PWAUpdatePrompt";
import { HomeRoute } from "./routes/home/route";
import { SettingsRoute } from "./routes/settings/route";
import { ListRoute } from "./routes/list/route";
import { GroupsRoute } from "./routes/groups/route";
import { ThemeProvider } from "./providers/Theme";
import { PWAInstallProvider } from "./providers/PWAInstall";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider
        defaultTheme="system"
        storageKey="simple-shopping-list-theme"
      >
        <PWAInstallProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomeRoute />} />
                <Route path="/settings" element={<SettingsRoute />} />
                <Route path="/groups" element={<GroupsRoute />} />
                <Route path="/list">
                  <Route path=":id" element={<ListRoute />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
          <PWAInstallPrompt />
          <PWAUpdatePrompt />
        </PWAInstallProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
};
