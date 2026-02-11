import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30"
      role="main"
      aria-label="Loading login"
    >
      <Skeleton className="mb-6 h-8 w-[140px]" />
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </main>
  );
}
