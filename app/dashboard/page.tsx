"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store";
import { useUsersList, useUser } from "@/lib/queries";
import { getRole } from "@/lib/types";
import { UserTable } from "@/app/dashboard/components/UserTable";
import { UserDetails } from "@/app/dashboard/components/UserDetails";

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
        <UserTable
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
        />
        <UserDetails
          selectedUserId={selectedUserId}
          selectedUser={selectedUser}
          selectedUserLoading={loadingUser}
        />
      </div>
    </main>
  );
}
