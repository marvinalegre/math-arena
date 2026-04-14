import { NavLink } from "react-router";
import { Menu } from "lucide-react";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";

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
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 md:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72 p-0">
              {/* Header */}
              <div className="px-5 py-4 border-b border-border flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-sm">
                  ∮
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">
                    MathArena
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 px-4 py-5">
                {TABS.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-lg px-3 py-2.5 text-sm transition-all",
                        "hover:bg-secondary",
                        isActive
                          ? "bg-secondary font-medium text-foreground"
                          : "text-muted-foreground",
                      )
                    }
                  >
                    {label}
                  </NavLink>
                ))}

                <Separator />

                {/* Profile */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-3 py-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {username}
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

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
      </div>

      {/* CENTER (desktop tabs) */}
      <div className="hidden md:flex items-center gap-px rounded-lg border border-border bg-secondary p-1">
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

      {/* RIGHT (stats + avatar) */}
      <div className="flex items-center gap-2">
        {/* Streak */}
        {streak > 1 && (
          <div className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-xs text-muted-foreground">
            🔥 {streak}
          </div>
        )}

        {/* ELO */}
        <div className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 font-mono text-xs">
          <span className="font-medium text-foreground">{playerElo}</span>
        </div>

        {/* Avatar */}
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-xs font-medium">
            {username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="hidden sm:block">
          <p className="text-sm font-medium leading-none">{username}</p>
        </div>
      </div>
    </nav>
  );
}
