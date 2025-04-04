import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../auth";

import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
	protectedRoutes,
} from "../routes";

import { currentRole } from "./features/auth/utils/currentUser";
import { routes } from "./shared/utils/routes";

/**
 * Adds cache control headers to HTTP response
 * @param headers - Headers object to which headers are added
 * @param isApi - Whether the request is for API (affects header types)
 */
function addCacheHeaders(headers: Headers, isApi: boolean = false): void {
	if (isApi) {
		// For API - prevent caching
		headers.set("Cache-Control", "no-store, must-revalidate");
		headers.set("Pragma", "no-cache");
	} else {
		// For pages - reasonable caching
		headers.set("Cache-Control", "public, max-age=300, stale-while-revalidate=60");
	}
}

export const middleware = auth(async (req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	// Type assertion to ensure apiAuthPrefix is treated as string
	const apiAuthPrefixStr = apiAuthPrefix as string;
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefixStr);

	// Check if this is a regular API route (not auth API)
	const isRegularApiRoute = nextUrl.pathname.startsWith("/api/") && !isApiAuthRoute;

	// Simplified function to check if a path matches a route pattern
	const isPathMatchingRoute = (path: string, routePattern: string) => {
		// Handle exact matches
		if (path === routePattern) return true;

		// Handle dynamic routes (e.g. /posts/[slug])
		if (routePattern.includes("[") && routePattern.includes("]")) {
			const pathParts = path.split("/");
			const routeParts = routePattern.split("/");

			// Different number of segments means no match
			if (pathParts.length !== routeParts.length) return false;

			// Check each segment
			return routeParts.every((routePart, i) => {
				// If it's a dynamic segment [something], it matches anything
				if (routePart.startsWith("[") && routePart.endsWith("]")) return true;
				// Otherwise, segments must match exactly
				return routePart === pathParts[i];
			});
		}

		// Handle prefix matches (e.g. /posts/ should match /posts/123)
		if (routePattern.endsWith("/")) {
			return path.startsWith(routePattern);
		}

		// Handle API routes that should match their sub-routes
		if (routePattern === "/api/posts" || routePattern === "/posts") {
			return path.startsWith(`${routePattern}/`);
		}

		return false;
	};

	const pathWithoutQuery = nextUrl.pathname.split("?")[0];
	const isPublicRoute = publicRoutes.some((route) => isPathMatchingRoute(pathWithoutQuery, route));
	const isProtectedRoute = protectedRoutes.some((route) =>
		isPathMatchingRoute(pathWithoutQuery, route),
	);

	// For API routes, only proceed if they're public or the user is logged in
	if (isRegularApiRoute) {
		if (isPublicRoute || isLoggedIn) {
			return NextResponse.next();
		}
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	const isAuthRoute = Array.isArray(authRoutes) && authRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoute) {
		return NextResponse.next();
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			// Ensure DEFAULT_LOGIN_REDIRECT is treated as string
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT as string, nextUrl));
		}
		return NextResponse.next();
	}

	if (!isLoggedIn && (isProtectedRoute || !isPublicRoute)) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
	}

	const adminOnlyRoutes = ["/admin", "/write"];

	if (adminOnlyRoutes.includes(nextUrl.pathname)) {
		const role = await currentRole();

		if (role !== UserRole.ADMIN && role !== UserRole.SUPERADMIN) {
			return Response.redirect(new URL(routes.home, nextUrl));
		}
	}

	// Add cache headers to response (only for non-API routes)
	const response = NextResponse.next();
	const isApiRoute = nextUrl.pathname.startsWith("/api/");

	// Only add cache headers to non-API routes
	if (!isApiRoute) {
		addCacheHeaders(response.headers, false);
	} else {
		addCacheHeaders(response.headers, true);
	}

	return response;
});

export const config = {
	matcher: [
		// Match all paths except:
		// 1. Files with extensions (e.g. .js, .css)
		// 2. Next.js internal paths (_next)
		// 3. Public files (favicon.ico, etc.)
		"/((?!_next|.*\\..*|favicon.ico).*)",
		"/",
	],
};
