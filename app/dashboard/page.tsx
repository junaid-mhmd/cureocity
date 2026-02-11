"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store";
import { useUsersList, useUser } from "@/lib/queries";
import { getRole } from "@/lib/types";
import { DashboardContent } from "@/app/dashboard/components/DashboardContent";

const PAGE_SIZE = 20;

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.role);
  const selectedUserId = useAuthStore((s) => s.selectedUserId);
  const setSelectedUser = useAuthStore((s) => s.setSelectedUser);

  const [skip, setSkip] = useState(0);

  const { data: usersData, isLoading, isError, error } = useUsersList(PAGE_SIZE, skip);
  const { data: selectedUser, isLoading: loadingUser } = useUser(selectedUserId);

  const effectiveRole = role ?? (user ? getRole({ id: user.id, role: user.role }) : null);
  const canManageUsers = effectiveRole === "admin";
  const canViewAllUsers = effectiveRole === "admin" || effectiveRole === "moderator";

  return (
    <DashboardContent
      canManageUsers={canManageUsers}
      canViewAllUsers={canViewAllUsers}
      usersData={usersData}
      usersLoading={isLoading}
      usersError={isError}
      usersErrorMessage={error?.message}
      pageSize={PAGE_SIZE}
      skip={skip}
      onSkipChange={setSkip}
      selectedUserId={selectedUserId}
      onSelectUser={setSelectedUser}
      selectedUser={selectedUser}
      selectedUserLoading={loadingUser}
    />
  );
}
