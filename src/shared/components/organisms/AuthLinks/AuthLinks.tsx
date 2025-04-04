import Link from "next/link";
import { UserRole } from "@prisma/client";
import { signOut } from "../../../../../auth";
import { ResponsiveMenu } from "./components/ResponsiveMenu";
import { labels } from "@/shared/utils/labels";
import { currentUser } from "@/features/auth/utils/currentUser";
import { routes } from "@/shared/utils/routes";
import "./authLinks.css";

export const AuthLinks = async () => {
	const session = await currentUser();

	const authContent = (
		<>
			<Link href={routes.home} className="link">
				{labels.links.homepage}
			</Link>
			{!session ? (
				<Link href={routes.login} className="link">
					{labels.login}
				</Link>
			) : (
				<>
					{(session?.role === UserRole.ADMIN || session?.role === UserRole.SUPERADMIN) && (
						<Link href={routes.write} className="link">
							{labels.write}
						</Link>
					)}
					<Link href={routes.settings} className="link">
						{labels.settings}
					</Link>
					<form
						action={async () => {
							"use server";
							await signOut();
						}}
					>
						<button type="submit" className="link">
							{labels.logout}
						</button>
					</form>
				</>
			)}
		</>
	);

	return (
		<>
			{authContent}
			<ResponsiveMenu>{authContent}</ResponsiveMenu>
		</>
	);
};
