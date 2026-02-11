"use client";

import type { DummyUser } from "@/lib/types";
import type { UsersListResponse } from "@/lib/api";
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
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

export interface DashboardContentProps {
  canManageUsers: boolean;
  canViewAllUsers: boolean;
  usersData: UsersListResponse | undefined;
  usersLoading: boolean;
  usersError: boolean;
  usersErrorMessage?: string;
  pageSize: number;
  skip: number;
  onSkipChange: (fn: (prev: number) => number) => void;
  selectedUserId: number | null;
  onSelectUser: (id: number) => void;
  selectedUser: DummyUser | undefined;
  selectedUserLoading: boolean;
}

export function DashboardContent({
  canManageUsers,
  canViewAllUsers,
  usersData,
  usersLoading,
  usersError,
  usersErrorMessage,
  pageSize,
  skip,
  onSkipChange,
  selectedUserId,
  onSelectUser,
  selectedUser,
  selectedUserLoading,
}: DashboardContentProps) {
  return (
    <main
      className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6"
      role="main"
      aria-label="Dashboard content"
    >
      <section aria-labelledby="welcome-heading">
        <h2 id="welcome-heading" className="text-lg font-medium">
          {canManageUsers && "Admin — manage users below"}
          {!canManageUsers && canViewAllUsers && "Moderator — view and browse users"}
          {!canViewAllUsers && "Dashboard — view user list"}
        </h2>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_400px]">
        {/* Users list */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle id="users-table-label">Users</CardTitle>
            {usersLoading && <Skeleton className="h-4 w-16" />}
            {usersData && !usersLoading && (
              <span className="text-muted-foreground text-sm" aria-live="polite">
                {usersData.total} total
              </span>
            )}
          </CardHeader>
          <CardContent>
            {usersError && (
              <p role="alert" className="text-destructive text-sm">
                {usersErrorMessage ?? "Failed to load users"}
              </p>
            )}
            {usersLoading && (
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
                    {Array.from({ length: 8 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                        {canViewAllUsers && (
                          <TableCell><Skeleton className="h-5 w-14 rounded-full" /></TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex items-center justify-between">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-9 w-16" />
                </div>
              </>
            )}
            {usersData && !usersLoading && (
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
                        onClick={() => onSelectUser(u.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelectUser(u.id);
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
                    onClick={() => onSkipChange((s) => Math.max(0, s - pageSize))}
                    aria-label="Previous page"
                    className="focus-visible:ring-2"
                  >
                    Previous
                  </Button>
                  <span className="text-muted-foreground text-sm">
                    {skip + 1}–{Math.min(skip + pageSize, usersData.total)} of {usersData.total}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={skip + pageSize >= usersData.total}
                    onClick={() => onSkipChange((s) => s + pageSize)}
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
            {selectedUserId && selectedUserLoading && (
              <div className="grid gap-4" aria-busy="true" aria-label="Loading user details">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-5 w-full max-w-[200px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-full max-w-[240px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-full max-w-[160px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-5 w-full max-w-[140px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            )}
            {selectedUser && !selectedUserLoading && (
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
  );
}
