"use server";

import { type z } from "zod";
import { revalidatePath } from "next/cache";
import { type SettingsSchema } from "../schemas";
import prisma from "@/utils/connect";
import { getUserByEmail, getUserById } from "@/utils/data/user";
import { currentUser } from "@/lib/currentUser";
import { labels } from "@/views/labels";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await currentUser();
	const saltRounds = 10;

	if (!user) {
		return { error: labels.errors.unauthorized };
	}

	const dbUser = await getUserById(user.id as string);

	if (!dbUser) {
		return { error: labels.errors.unauthorized };
	}

	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	if (values.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);

		if (existingUser && existingUser.id !== user.id) {
			return { error: labels.errors.emailAlreadyInUse };
		}

		const verificationToken = await generateVerificationToken(values.email);

		await sendVerificationEmail(verificationToken.email, verificationToken.token);

		return { success: labels.verificationEmailSent };
	}

	if (values.password && values.newPassword && dbUser.password) {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const bcrypt = require("bcrypt") as typeof import("bcrypt");
		const passwordMatch = await bcrypt.compare(values.password, dbUser.password);

		if (!passwordMatch) {
			return { error: labels.errors.incorrectPassword };
		}

		const hashedPassword = await bcrypt.hash(values.newPassword, saltRounds);

		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await prisma.user.update({
		where: { id: dbUser.id },
		data: {
			...values,
		},
	});

	revalidatePath("/");
	return { success: labels.settingsUdpated };
};
