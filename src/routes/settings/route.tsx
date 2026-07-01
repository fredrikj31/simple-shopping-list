import { Button } from "@shadcn-ui/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router";
import { EraseDataDialog } from "../../components/EraseDataDialog";
import { Theme, useTheme } from "../../providers/Theme";

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export const SettingsRoute = () => {
  const { theme, setTheme } = useTheme();

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center gap-2 px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Change your preferences here
            </p>
          </div>
        </div>
      </header>

      <div className="mx-4 mt-4 mb-6">
        <h2 className="text-lg font-semibold">Theme</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Choose your preferred color scheme.
        </p>
        <div className="flex gap-2">
          {THEME_OPTIONS.map(({ value, label }) => (
            <Button
              key={value}
              variant={theme === value ? "default" : "outline"}
              onClick={() => setTheme(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mx-4">
        <h2 className="text-lg font-semibold">Erase data</h2>
        <p className="text-sm text-muted-foreground mb-2">
          This actions is gonna erase all data stored on device.
        </p>
        <EraseDataDialog
          triggerElement={
            <Button variant="destructive">
              <RotateCcw className="h-4 w-4 mr-2" />
              Erase data
            </Button>
          }
        />
      </div>
    </main>
  );
};
