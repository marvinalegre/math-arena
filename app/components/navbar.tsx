import { NavLink } from "react-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

interface NavbarProps {
  username: string;
  playerElo?: number;
  streak?: number;
}

const TABS = [
  { to: "/play", label: "Play" },
  { to: "/types", label: "Question types" },
  { to: "/stats", label: "My stats" },
];

export default function Navbar({
  username = "marvin",
  playerElo = 1347,
  streak = 4,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Logo */}
      <NavLink
        to="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-secondary text-sm">
          ∮
        </div>
        <span className="text-sm font-medium tracking-tight">MathArena</span>
      </NavLink>

      {/* Tabs — pill group */}
      <div className="flex items-center gap-px rounded-lg border border-border bg-secondary p-1">
        {TABS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "rounded-md px-3.5 py-1 text-sm transition-all whitespace-nowrap",
                isActive
                  ? "bg-background font-medium text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground",
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Player info */}
      <div className="flex items-center gap-2">
        {streak > 1 && (
          <div className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            🔥 {streak}
          </div>
        )}
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs">
          <span className="font-medium text-foreground">{playerElo}</span>
          <span className="text-muted-foreground">ELO</span>
        </div>
        <Separator orientation="vertical" className="h-5" />
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-secondary text-xs font-medium">
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{username}</span>
        </div>
      </div>
    </nav>
  );
}
