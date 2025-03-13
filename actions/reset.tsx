"use server";

import { type z } from "zod";
import { ResetSchema } from "../schemas";
import { getUserByEmail } from "@/features/auth/utils/data/user";
import { labels } from "@/shared/utils/labels";
import { sendPasswordResetEmail } from "@/features/auth/utils/mail";
import { generatePasswordResetToken } from "@/features/auth/utils/tokens";
import { getResetPasswordRatelimit } from "@/features/auth/utils/ratelimit";
import { handleRateLimit } from "@/features/auth/utils/rateLimitHelper";
import { SECURITY } from "@/config/constants";

// Constant time delay to prevent timing attacks
const CONSTANT_TIME_DELAY_MS = SECURITY.CONSTANT_AUTH_DELAY_MS;

// Helper function to introduce a constant time delay
const addConstantTimeDelay = async () => {
	return new Promise((resolve) => setTimeout(resolve, CONSTANT_TIME_DELAY_MS));
};

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	// Start timing the operation
	const startTime = Date.now();

	const validatedFields = ResetSchema.safeParse(values);

	if (!validatedFields.success) {
		// Add delay to ensure constant response time
		await addConstantTimeDelay();
		return { error: labels.errors.invalidEmail };
	}

	const { email } = validatedFields.data;

	// Rate limiting
	const ratelimit = getResetPasswordRatelimit();
	const rateLimitResult = await handleRateLimit(ratelimit, {
		email,
		errorMessage: labels.rateLimitExceeded || "",
	});

	if (!rateLimitResult.success) {
		// Add delay to ensure constant response time
		await addConstantTimeDelay();
		return {
			error: rateLimitResult.error,
			status: rateLimitResult.status,
			waitTimeSeconds: rateLimitResult.waitTimeSeconds,
		};
	}

	const existingUser = await getUserByEmail(email);

	// Calculate how much time has passed
	const elapsedTime = Date.now() - startTime;

	// If less than our constant time has passed, wait the remaining time
	if (elapsedTime < CONSTANT_TIME_DELAY_MS) {
		await new Promise((resolve) => setTimeout(resolve, CONSTANT_TIME_DELAY_MS - elapsedTime));
	}

	// Regardless of whether the user exists, we return the same message
	// This prevents timing attacks and email enumeration
	if (!existingUser || !existingUser?.password) {
		// We still return success to prevent email enumeration
		return { success: labels.resetEmailSend };
	}

	const passwordResetToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

	// Ensure we've spent at least CONSTANT_TIME_DELAY_MS since start
	const finalElapsedTime = Date.now() - startTime;
	if (finalElapsedTime < CONSTANT_TIME_DELAY_MS) {
		await new Promise((resolve) => setTimeout(resolve, CONSTANT_TIME_DELAY_MS - finalElapsedTime));
	}

	return { success: labels.resetEmailSend };
};
