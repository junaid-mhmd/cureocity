"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store";
import { getRole } from "@/lib/types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/app/dashboard/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.role);
  const logout = useAuthStore((s) => s.logout);

  const [hydrated, setHydrated] = useState(false);
  const isFetchingUsers = useIsFetching({ queryKey: ["users"] });

  useEffect(() => {
    useAuthStore.getState().hydrate();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) router.replace("/login");
  }, [hydrated, token, router]);

  const handleLogout = () => {
    logout();
    queryClient.clear();
    router.replace("/login");
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "users" });
  };

  if (!hydrated || !token) return null;

  const effectiveRole = role ?? (user ? getRole({ id: user.id, role: user.role }) : null);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <DashboardHeader
          roleLabel={effectiveRole}
          onRefresh={handleRefresh}
          isRefreshing={isFetchingUsers > 0}
          onLogout={handleLogout}
        />
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
