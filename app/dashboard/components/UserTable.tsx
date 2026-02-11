"use client";

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

export interface UserTableProps {
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
}

export function UserTable({
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
}: UserTableProps) {
  return (
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
  );
}
