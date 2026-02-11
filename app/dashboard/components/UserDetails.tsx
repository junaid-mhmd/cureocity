"use client";

import type { DummyUser } from "@/lib/types";
import { getRole } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

export interface UserDetailsProps {
  selectedUserId: number | null;
  selectedUser: DummyUser | undefined;
  selectedUserLoading: boolean;
}

export function UserDetails({
  selectedUserId,
  selectedUser,
  selectedUserLoading,
}: UserDetailsProps) {
  return (
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
  );
}
