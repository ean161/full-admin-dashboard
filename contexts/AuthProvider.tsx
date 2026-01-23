"use client"

import { createContext, ReactNode } from "react"

type AuthContextProps = {
    name: string,
    role: string
}

export const AuthContext = createContext<AuthContextProps | null>(null);

type AuthProviderProps = {
    children: ReactNode
}
export default function AuthProvider({ children }: AuthProviderProps) {
    const name = "BIWOCO_ACC";
    const role = "TESTER";

    return (
        <AuthContext.Provider value={{ name, role }}>
            {children}
        </AuthContext.Provider>
    );
}