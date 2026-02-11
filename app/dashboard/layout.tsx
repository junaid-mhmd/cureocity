import type { Metadata } from "next";
import { DashboardShell } from "./DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User dashboard — view and manage users",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
