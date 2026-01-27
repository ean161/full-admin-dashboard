import { Button } from "@/components/ui/button";
import { ArrowRightLeft, ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
    hasFullFeats?: boolean;
};

export default function Header({ hasFullFeats = false }: HeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                    User management
                </h2>
                <p className="text-muted-foreground">
                    Create, update, delete users
                </p>
            </div>
            {!hasFullFeats && (
                <Link href="/users">
                    <Button variant={"secondary"}>
                        <ChevronLeft />
                        <span>Back</span>
                    </Button>
                </Link>
            )}
            {hasFullFeats && (
                <div className="flex space-x-2">
                    <Link href="/users/transfer-money">
                        <Button variant={"secondary"}>
                            <ArrowRightLeft />
                            <span>Transfer money</span>
                        </Button>
                    </Link>
                    <Link href="/users/create">
                        <Button>
                            <Plus />
                            <span>Create</span>
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
