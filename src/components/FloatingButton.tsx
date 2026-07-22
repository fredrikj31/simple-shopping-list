import { cn } from "@shadcn-ui/lib/utils";
import { ReactNode } from "react";

interface FloatingButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}
export const FloatingButton = ({
  onClick,
  children,
  className,
}: FloatingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
};
