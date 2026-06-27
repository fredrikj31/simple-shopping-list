import { Button } from "@shadcn-ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { useGetListById } from "../../hooks/useGetListById";

export const ListRoute = () => {
  const { id } = useParams();

  const { data: list } = useGetListById({ id: id ?? "" });

  if (!id) {
    return <Navigate to="/" />;
  }

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
            <h1 className="text-2xl font-bold text-foreground">{list?.name}</h1>
            <p className="text-sm text-muted-foreground">
              Keep track of what you need
            </p>
          </div>
        </div>
      </header>
    </main>
  );
};
