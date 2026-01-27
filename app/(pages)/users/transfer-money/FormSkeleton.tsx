import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
    return (
        <>
            <div className="flex justify-between">
                <div className="flex w-fit items-center gap-4">
                    <div className="grid gap-4">
                        <Skeleton className="h-4 w-[50px]" />
                        <Skeleton className="h-8 w-[200px]" />
                    </div>
                </div>
                <div className="flex w-fit items-center gap-4">
                    <div className="grid gap-4">
                        <Skeleton className="h-4 w-[50px]" />
                        <Skeleton className="h-8 w-[200px]" />
                    </div>
                </div>
            </div>
            <div className="flex mt-4 space-x-2">
                <Skeleton className="h-10 w-20" />
            </div>
        </>
    );
}
