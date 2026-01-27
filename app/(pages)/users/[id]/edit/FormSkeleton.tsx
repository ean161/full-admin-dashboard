import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
    return (
        <div className="w-full space-y-6">
            <div className="grid gap-4">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-8 w-1/1" />
            </div>
            <div className="grid gap-4">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-8 w-1/1" />
            </div>
            <div className="grid gap-4">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-8 w-1/1" />
            </div>
            <div className="flex mt-8 space-x-2">
                <Skeleton className="h-10 w-35" />
                <Skeleton className="h-10 w-20" />
            </div>
        </div>
    );
}
