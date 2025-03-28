"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
	children: React.ReactNode;
	session?: Session | null;
}

export const AuthProvider = ({ children, session }: AuthProviderProps) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};
