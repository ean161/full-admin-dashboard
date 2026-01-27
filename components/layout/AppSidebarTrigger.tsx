"use client";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AppSidebarTrigger() {
    const isMobile = useIsMobile();
    const { open, toggleSidebar } = useSidebar();

    if (!isMobile) {
        return <></>;
    }

    return (
        <Button onClick={toggleSidebar} variant={"secondary"} className="w-fit">
            {open ? <ChevronsRight /> : <ChevronsLeft />}
        </Button>
    );
}
