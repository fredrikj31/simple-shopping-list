import { Button } from "@shadcn-ui/components/ui/button";
import { Layers, PlusIcon, Settings } from "lucide-react";
import { Link } from "react-router";
import { FloatingButton } from "../../components/FloatingButton";
import { CreateListDialog } from "../../components/CreateListDialog";
import { useListLists } from "../../hooks/useListLists";
import { ListCard } from "../../components/ListCard";

export const HomeRoute = () => {
  const { data: lists } = useListLists();

  return (
    <>
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
            <div className="flex items-center gap-1">
              <Link to="/groups">
                <Button variant="ghost" size="icon">
                  <Layers className="size-5" />
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" className="size-12">
                  <Settings className="size-6" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {lists && lists.length > 0 ? (
          <div className="flex flex-col gap-3 mx-4 mt-4">
            {lists.map((list) => (
              <Link key={list.id} to={`/list/${list.id}`}>
                <ListCard list={list} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mx-4 mt-4 flex flex-col items-center gap-4">
            <div className="rounded-lg border border-border bg-secondary/50 p-12 text-center w-full">
              <p className="text-muted-foreground mb-4">
                No shopping lists yet
              </p>
              <p className="text-sm text-muted-foreground">
                Create your first list to get started
              </p>
            </div>
          </div>
        )}
      </main>
      <CreateListDialog
        triggerElement={
          <FloatingButton>
            <PlusIcon className="size-6" />
          </FloatingButton>
        }
      />
    </>
  );
};
