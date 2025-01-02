import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
