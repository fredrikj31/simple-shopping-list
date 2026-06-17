import { Button } from "@shadcn-ui/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router";
import { InstallButton } from "../../components/InstallButton";

export const HomeRoute = () => {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex flex-row items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-foreground">
              Shopping Lists
            </h1>
            <p className="text-sm text-muted-foreground">
              Organize your shopping with multiple lists
            </p>
          </div>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="size-5" />
            </Button>
          </Link>
        </div>
      </header>

      <InstallButton />
    </main>
  );
};
