"use server";

import { type z } from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../schemas";
import { prisma } from "@/shared/utils/connect";
import { labels } from "@/shared/utils/labels";
import { getUserByEmail } from "@/features/auth/utils/data/user";
import { generateVerificationToken } from "@/features/auth/utils/tokens";
import { sendVerificationEmail } from "@/features/auth/utils/mail";
import { getRegisterRatelimit } from "@/features/auth/utils/ratelimit";
import { handleRateLimit } from "@/features/auth/utils/rateLimitHelper";
import { SECURITY } from "@/config/constants";
import { isRegistrationEnabled } from "@/features/settings/utils/settings.service";

const CONSTANT_TIME_DELAY_MS = SECURITY.CONSTANT_AUTH_DELAY_MS;

const addConstantTimeDelay = async () => {
	return new Promise((resolve) => setTimeout(resolve, CONSTANT_TIME_DELAY_MS));
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	// Start timing the operation for consistent response time
	const startTime = Date.now();

	const registrationEnabled = await isRegistrationEnabled();
	if (!registrationEnabled) {
		// Add delay to ensure constant response time
		await addConstantTimeDelay();
		return { error: labels.registrationCurrentlyDisabled };
	}

	const saltRounds = 10;
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		await addConstantTimeDelay();
		return { error: labels.errors.errorLogin };
	}

	const { email, password, name } = validatedFields.data;

	const ratelimit = getRegisterRatelimit();
	const rateLimitResult = await handleRateLimit(ratelimit, {
		email,
		errorMessage: labels.registerRateLimitExceeded || "",
	});

	if (!rateLimitResult.success) {
		await addConstantTimeDelay();
		return {
			error: rateLimitResult.error,
			status: rateLimitResult.status,
			waitTimeSeconds: rateLimitResult.waitTimeSeconds,
		};
	}

	// Always perform hashing operation for consistent timing
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const existingUser = await getUserByEmail(email);

	// Normalize response time
	const elapsedTime = Date.now() - startTime;

	// Ensure minimum processing time
	if (elapsedTime < CONSTANT_TIME_DELAY_MS) {
		await new Promise((resolve) => setTimeout(resolve, CONSTANT_TIME_DELAY_MS - elapsedTime));
	}

	if (existingUser) {
		return { error: labels.errors.emailAlreadyInUse };
	}

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	// Ensure we've spent at least CONSTANT_TIME_DELAY_MS since start
	const finalElapsedTime = Date.now() - startTime;
	if (finalElapsedTime < CONSTANT_TIME_DELAY_MS) {
		await new Promise((resolve) => setTimeout(resolve, CONSTANT_TIME_DELAY_MS - finalElapsedTime));
	}

	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(verificationToken.email, verificationToken.token);

	return {
		success: labels.confirmationEmailSent,
		verification: true,
	};
};
