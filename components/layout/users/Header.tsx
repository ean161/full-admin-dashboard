import { Button } from "@/components/ui/button";
import { ArrowRightLeft, List, Plus } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
    hasFullFeats?: boolean;
};

export default function Header({ hasFullFeats = false }: HeaderProps) {
    return (
        <div className="md:flex items-center justify-between mb-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                    User management
                </h2>
                <p className="text-muted-foreground">
                    Create, update, delete users
                </p>
            </div>
            {!hasFullFeats && (
                <div className="mt-6 flex justify-end">
                    <Link href="/users">
                        <Button
                            variant={"secondary"}
                            className="cursor-pointer"
                        >
                            <List />
                            <span>List</span>
                        </Button>
                    </Link>
                </div>
            )}
            {hasFullFeats && (
                <div className="flex space-x-2 mt-6 md:mt-0 justify-end">
                    <Link href="/users/transfer-money">
                        <Button
                            variant={"secondary"}
                            className="cursor-pointer"
                        >
                            <ArrowRightLeft />
                            <span>Transfer money</span>
                        </Button>
                    </Link>
                    <Link href="/users/create">
                        <Button className="cursor-pointer">
                            <Plus />
                            <span>Create</span>
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
