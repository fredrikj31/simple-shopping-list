import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcn-ui/components/ui/card";
import { ShoppingCart } from "lucide-react";

export const ListCard = ({
  list,
}: {
  list: { name: string; index: number };
}) => {
  return (
    <Card className="hover:bg-accent transition-colors cursor-pointer">
      <CardHeader>
        <div className="flex items-center gap-3">
          <ShoppingCart className="size-5 text-muted-foreground shrink-0" />
          <div>
            <CardTitle>{list.name}</CardTitle>
            <CardDescription>List #{list.index}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
