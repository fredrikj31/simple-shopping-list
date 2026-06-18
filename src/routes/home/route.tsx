import { Button } from "@shadcn-ui/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router";

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

      <div className="rounded-lg border border-border bg-secondary/50 p-12 text-center mx-4 mt-4">
        <p className="text-muted-foreground mb-4">No shopping lists yet</p>
        <p className="text-sm text-muted-foreground">
          Create your first list to get started
        </p>
      </div>
    </main>
  );
};
