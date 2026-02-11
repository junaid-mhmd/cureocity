"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store";
import { useUsersList, useUser, queryKeys } from "@/lib/queries";
import { getRole } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { LogOut, RefreshCw, User } from "lucide-react";

const PAGE_SIZE = 20;

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.role);
  const selectedUserId = useAuthStore((s) => s.selectedUserId);
  const setSelectedUser = useAuthStore((s) => s.setSelectedUser);
  const logout = useAuthStore((s) => s.logout);

  const [skip, setSkip] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const { data: usersData, isLoading, isError, error, refetch } = useUsersList(PAGE_SIZE, skip);
  const { data: selectedUser, isLoading: loadingUser } = useUser(selectedUserId);

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

  if (!hydrated || !token) return null;

  const effectiveRole = role ?? (user ? getRole({ id: user.id, role: user.role }) : null);
  const canManageUsers = effectiveRole === "admin";
  const canViewAllUsers = effectiveRole === "admin" || effectiveRole === "moderator";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <header
          className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          role="banner"
        >
          <div className="flex flex-1 items-center gap-2">
            <span className="font-semibold">Dashboard</span>
            {effectiveRole && (
              <Badge variant="secondary" aria-label={`Role: ${effectiveRole}`}>
                {effectiveRole}
              </Badge>
            )}
          </div>
          <nav className="flex items-center gap-2" aria-label="Dashboard actions">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: queryKeys.users(PAGE_SIZE, skip) });
                if (selectedUserId) queryClient.invalidateQueries({ queryKey: queryKeys.user(selectedUserId) });
                refetch();
              }}
              disabled={isLoading}
              aria-label="Refresh data"
              className="focus-visible:ring-2"
            >
              <RefreshCw className="size-4 aria-hidden" aria-hidden />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              aria-label="Sign out"
              className="focus-visible:ring-2"
            >
              <LogOut className="size-4" aria-hidden />
              Sign out
            </Button>
          </nav>
        </header>

        <SidebarInset>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6" role="main" aria-label="Dashboard content">
            {/* Role-based welcome */}
            <section aria-labelledby="welcome-heading">
              <h2 id="welcome-heading" className="text-lg font-medium">
                {canManageUsers && "Admin — manage users below"}
                {effectiveRole === "moderator" && "Moderator — view and browse users"}
                {effectiveRole === "user" && "Dashboard — view user list"}
              </h2>
            </section>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_400px]">
              {/* Users list */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle id="users-table-label">Users</CardTitle>
                  {usersData && (
                    <span className="text-muted-foreground text-sm" aria-live="polite">
                      {usersData.total} total
                    </span>
                  )}
                </CardHeader>
                <CardContent>
                  {isError && (
                    <p role="alert" className="text-destructive text-sm">
                      {error?.message ?? "Failed to load users"}
                    </p>
                  )}
                  {isLoading && (
                    <p className="text-muted-foreground text-sm">Loading users…</p>
                  )}
                  {usersData && !isLoading && (
                    <>
                      <Table aria-labelledby="users-table-label">
                        <TableHeader>
                          <TableRow>
                            <TableHead scope="col">ID</TableHead>
                            <TableHead scope="col">Name</TableHead>
                            <TableHead scope="col">Email</TableHead>
                            {canViewAllUsers && (
                              <TableHead scope="col">Role</TableHead>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {usersData.users.map((u) => (
                            <TableRow
                              key={u.id}
                              data-state={selectedUserId === u.id ? "selected" : undefined}
                              tabIndex={0}
                              onClick={() => setSelectedUser(u.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setSelectedUser(u.id);
                                }
                              }}
                              className="cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              role="button"
                              aria-pressed={selectedUserId === u.id}
                              aria-label={`Select user ${u.firstName} ${u.lastName}`}
                            >
                              <TableCell>{u.id}</TableCell>
                              <TableCell>
                                {u.firstName} {u.lastName}
                              </TableCell>
                              <TableCell>{u.email}</TableCell>
                              {canViewAllUsers && (
                                <TableCell>
                                  <Badge variant="outline">{u.role ?? getRole({ id: u.id, role: u.role })}</Badge>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4 flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={skip === 0}
                          onClick={() => setSkip((s) => Math.max(0, s - PAGE_SIZE))}
                          aria-label="Previous page"
                          className="focus-visible:ring-2"
                        >
                          Previous
                        </Button>
                        <span className="text-muted-foreground text-sm">
                          {skip + 1}–{Math.min(skip + PAGE_SIZE, usersData.total)} of {usersData.total}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={skip + PAGE_SIZE >= usersData.total}
                          onClick={() => setSkip((s) => s + PAGE_SIZE)}
                          aria-label="Next page"
                          className="focus-visible:ring-2"
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Selected user detail */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle id="user-detail-label" className="flex items-center gap-2">
                    <User className="size-4" aria-hidden />
                    User detail
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!selectedUserId && (
                    <p className="text-muted-foreground text-sm">
                      Select a user from the table to view details.
                    </p>
                  )}
                  {selectedUserId && loadingUser && (
                    <p className="text-muted-foreground text-sm">Loading…</p>
                  )}
                  {selectedUser && !loadingUser && (
                    <dl className="grid gap-2 text-sm" aria-labelledby="user-detail-label">
                      <div>
                        <dt className="text-muted-foreground font-medium">Name</dt>
                        <dd>
                          {selectedUser.firstName} {selectedUser.lastName}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground font-medium">Email</dt>
                        <dd>{selectedUser.email}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground font-medium">Username</dt>
                        <dd>{selectedUser.username}</dd>
                      </div>
                      {selectedUser.phone && (
                        <div>
                          <dt className="text-muted-foreground font-medium">Phone</dt>
                          <dd>{selectedUser.phone}</dd>
                        </div>
                      )}
                      {selectedUser.company && (
                        <div>
                          <dt className="text-muted-foreground font-medium">Company</dt>
                          <dd>{selectedUser.company.name} — {selectedUser.company.title}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-muted-foreground font-medium">Role</dt>
                        <dd>
                          <Badge variant="secondary">
                            {selectedUser.role ?? getRole({ id: selectedUser.id, role: selectedUser.role })}
                          </Badge>
                        </dd>
                      </div>
                    </dl>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
