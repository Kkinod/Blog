import { COMMENT_LIMITS } from "@/config/constants";

export const labels = {
	heroTextHey: "Hey, kkindo here!",
	verification: "Verification",
	heroTextInformation: "Discover my stories and road to the specialist",
	write: "Write",
	next: "Next",
	previous: "Previous",
	emailVerified: "Email verified",
	admin: "Admin",
	user: "User",
	role: "Role",
	selectARole: "Select a role",
	save: "Save",
	register: "Register",
	johnDoe: "John Doe",
	login: "Login",
	logout: "Logout",
	name: "Name",
	password: "Password",
	newPassword: "New Password",
	email: "Email",
	successLogin: "Email sent!",
	successRegister:
		"Welcome, commander! Your account is ready. The first step toward world domination begins now.",
	welcomeBack: "Welcome Back",
	dontHaveAnAccount: "Don't have an account?",
	createAnAccount: "Create an Account",
	alreadyHaveAnAccount: "Already Have an Account?",
	backToLogin: "Back to login",
	confirmationEmailSent: "Confirmation email sent!",
	verificationEmailSent: "Verification email sent!",
	pleaseConfirmYourEmail: "Please confirm your email",
	forgotYourPassword: "Forgot your password?",
	forgotPassword: "Forgot password?",
	sendResetEmail: "Send reset email",
	resetEmailSend: "Reset email send!",
	resetPassword: "Reset password",
	resetYourPassword: "Reset your password",
	enterANewPassword: "Enter a new password",
	passwordUpdated: "Password updated!",
	twoFACode: "2FA Code",
	twoFactorCode: "Two Factor Code",
	twoFactorAuthentication: "Two Factor Authentication",
	enableTwoFactorAuthentication: "Enable two factor authentication",
	confirm: "Confirm",
	allowed: "Allowed",
	settingsUdpated: "Settings Udpated!",
	emailExample: "example@example.com",
	passwordExample: "******",
	readMore: "Read More",
	popularCategories: "Popular Categories",
	discoverByTopic: "Discover by topic",
	categories: "Categories",
	chosenByTheEditor: "Chosen by the editor",
	editorsPick: "Editors Pick",
	mostPopular: "Most Viewed",
	whatsHot: "What's hot",
	settings: "Settings",
	id: "ID",
	fullBlogTitle: "bezpiecznik na fron(t)cie",
	shortBlogTitle: "bnf",
	server: "Server",
	loading: "Loading",
	selectCategory: "Select category",
	remove: "Remove",
	publish: "Publish",
	loginToWriteComment: "Login to write a comment",
	youAreAAdmin: "You are a admin",
	adminOnlyApiRoute: "Admin-only API route",
	adminOnlyServerAction: "Admin-only Server Action",
	clickToTest: "Click to test",
	backToHome: "Return to home",
	comments: "Comments",
	send: "Send",
	commentAdded: "Comment deployed successfully! Your wisdom is now live for all to see.",
	commentEmpty: "Empty comment? That's like clapping with one hand. We need some content!",
	commentError: "Failed to add comment",
	writeAComment: "Write a comment...",
	commentTooLong: `Comment is too long. Maximum length is ${COMMENT_LIMITS.MAX_LENGTH} characters.`,
	rateLimitExceeded:
		"Keyboard warrior detected! Please wait {time} before continuing your noble quest.",
	loginRateLimitExceeded:
		"Easy there, Agent 47! Too many failed logins. Maybe try remembering your password this time? Wait {time} before your next top-secret attempt.",
	registerRateLimitExceeded:
		"Creating an army of accounts, are we? Nice try, but you'll have to wait a while before attempting world domination again.",
	sending: "Sending...",

	links: {
		homepage: "Homepage",
		contact: "Contact",
		about: "About",
	},

	errors: {
		error: "Error!",
		missingToken: "Missing token!",
		tokenDoesNotExist: "Token does not exist",
		tokenHasExpired: "Token has expired",
		emailDesNotExist: "Email does not exist",
		emailAlreadyInUse: "Email already in use!",
		nameIsRequired: "Name is required",
		emailIsRequired: "Email is required",
		passwordIsRequired: "Password is required",
		errorLogin: "Invalid fields!",
		errorToken: "Invalid token!",
		somethingWentWrong: "Ooops! Something went wrong!",
		invalidCredentials: "Invalid Credentials",
		emailAlreadyInUseWithDifferentProvider: "Email already in use with different provider",
		confirmYourVerification: "Confirm your verification",
		pleaseConfirmYourEmail: "Please confirm your email",
		invalidEmail: "Invalid email!",
		emailNotFound: "Email not found!",
		min6CharactersRequired: "Mininium 6 characters required",
		invalidCode: "Invalid code!",
		codeExpired: "Code expired!",
		unauthorized: "Unauthorized!",
		youDoNoteHavePermissionToViewThisContent: "You do note have permission to view this content!",
		passwordAndNewPasswordIsRequired: "Password and new password is required!",
		incorrectPassword: "Incorrect password!",
		forbidden: "Forbidden!",
		postNotFound: "Post Not Found",
		titleRequired: "Title is required",
		categoryRequired: "Category is required",
		contentRequired: "Content is required",
		pageNotFound: "404 | Page not found",
		tooManyRequests: "Too many requests. Please try again later.",
		uploadFailed: "Failed to upload image",
		downloadUrlFailed: "Failed to get download URL for the image",
		unexpectedUploadError: "An unexpected error occurred during upload",
		uploadCancelled: "Upload cancelled",
		savingPostFailed: "Failed to save post",
		savingPostUnexpectedError: "An unexpected error occurred while saving your post",
	},

	posts: {
		list: "Posts List",
		edit: "Edit",
		delete: "Delete",
		deleteNotAvailable: "Delete functionality is not available yet",
		category: "Category",
		views: "Views",
		sortBy: "Sort by",
		date: "Date",
		newest: "Newest",
		oldest: "Oldest",
		mostViewed: "Most viewed",
		leastViewed: "Least viewed",
		hide: "Hide post",
		show: "Show post",
		hiddenSuccessfully: "Post hidden successfully",
		visibleSuccessfully: "Post is now visible",
		search: "Search by title...",
		total: "Total",
		filtered: "Filtered",
		visible: "Visible",
		allPosts: "All posts",
		onlyVisible: "Visible",
		onlyHidden: "Hidden",
		pick: "Pick",
		unpick: "Unpick",
		picksRemaining: "picks remaining",
		pickedSuccessfully: "Post has been picked successfully",
		unpickedSuccessfully: "Post has been unpicked successfully",
		pickLimitExceeded: "You can only pick 3 posts",
		onlyPicked: "Picked",
		onlyUnpicked: "Unpicked",
	},

	users: {
		list: "Users List",
		edit: "Edit",
		delete: "Delete",
		role: "Role",
		email: "Email",
		name: "Name",
		sortBy: "Sort by",
		date: "Date",
		newest: "Newest",
		oldest: "Oldest",
		search: "Search by name or email...",
		total: "Total",
		filtered: "Filtered",
	},

	common: {
		sectionInPreparation: "Sekcja w przygotowaniu",
	},

	writePost: {
		titlePlaceholder: "Enter title...",
		titleAriaLabel: "Post title",
		contentPlaceholder: "Tell your story...",
		contentAriaLabel: "Post content",
		addMediaAriaLabel: "Show media upload options",
		uploadedImageAlt: "Uploaded image preview",
		removeImageAriaLabel: "Remove image",
		publishAriaLabel: "Publish post",
		uploading: "Uploading",
		unauthorized: "You don't have permission to access this page",
		uploadSuccess: "Image uploaded successfully",
		postSavedSuccess: "Post saved successfully!",
		pageTitle: "Create New Post",
		publishing: "Publishing your post...",
	},
} as const;
