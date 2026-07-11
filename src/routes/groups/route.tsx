import { Button } from "@shadcn-ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export const GroupsRoute = () => {
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
            <h1 className="text-2xl font-bold text-foreground">Groups</h1>
            <p className="text-sm text-muted-foreground">
              Manage your item groups
            </p>
          </div>
        </div>
      </header>
    </main>
  );
};
