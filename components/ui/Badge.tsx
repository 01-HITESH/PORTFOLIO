import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "accent2" | "muted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-muted text-muted-foreground border-border",
    accent: "bg-accent/10 text-accent border-accent/20",
    accent2: "bg-accent-2/10 text-accent-2 border-accent-2/20",
    muted: "bg-surface text-muted-foreground border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
