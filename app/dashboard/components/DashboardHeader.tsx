"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, RefreshCw } from "lucide-react";

export interface DashboardHeaderProps {
  roleLabel?: string | null;
  onRefresh: () => void;
  isRefreshing: boolean;
  onLogout: () => void;
}

export function DashboardHeader({
  roleLabel,
  onRefresh,
  isRefreshing,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header
      className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="flex flex-1 items-center gap-2">
        <span className="font-semibold">Dashboard</span>
        {roleLabel && (
          <Badge variant="secondary" aria-label={`Role: ${roleLabel}`}>
            {roleLabel}
          </Badge>
        )}
      </div>
      <nav className="flex items-center gap-2" aria-label="Dashboard actions">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh data"
          className="focus-visible:ring-2"
        >
          <RefreshCw className="size-4 aria-hidden" aria-hidden />
          <span className="sr-only">Refresh</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          aria-label="Sign out"
          className="focus-visible:ring-2"
        >
          <LogOut className="size-4" aria-hidden />
          Sign out
        </Button>
      </nav>
    </header>
  );
}
