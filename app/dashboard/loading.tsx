import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardLoading() {
  return (
    <main
      className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6"
      role="main"
      aria-label="Loading dashboard"
    >
      <Skeleton className="h-6 w-64" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_400px]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">ID</TableHead>
                  <TableHead scope="col">Name</TableHead>
                  <TableHead scope="col">Email</TableHead>
                  <TableHead scope="col">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-14 rounded-full" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-9 w-16" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent className="grid gap-4">
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
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
