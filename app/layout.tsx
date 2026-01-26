import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/contexts/AuthProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Full admin dashboard",
    description: "BIWOCO intern program practice",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <SidebarProvider>
                        <AppSidebar />
                        <main className="w-full flex flex-1 flex-col gap-6 px-4 py-4 md:px-8 md:py-4">
                            <SidebarTrigger />
                            <div className="mt-2">{children}</div>
                        </main>
                        <Toaster />
                    </SidebarProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
