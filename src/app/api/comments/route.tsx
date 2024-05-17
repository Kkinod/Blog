import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { labels } from "@/views/labels";
import { currentUser } from "@/lib/currentUser";

interface CommentRequestBody {
	postSlug: string;
	desc: string;
}

//GET ALL COMMENTS OF A POSTS
export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);

	const postSlug = searchParams.get("postSlug");

	try {
		const comments = await prisma.comment.findMany({
			where: { ...(postSlug && { postSlug }) },
			include: { user: true },
		});

		return new NextResponse(JSON.stringify(comments), { status: 200 });
	} catch (err) {
		console.log(err);
		return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
	}
};

//CREATE A COMMENT
export const POST = async (req: NextRequest) => {
	const session = await currentUser();

	if (!session) {
		return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), { status: 401 });
	}

	try {
		const body = (await req.json()) as CommentRequestBody;
		const userEmail = session.email || "";
		const comment = await prisma.comment.create({
			data: { ...body, userEmail },
		});

		return new NextResponse(JSON.stringify(comment), { status: 200 });
	} catch (err) {
		console.log(err);
		return new NextResponse(JSON.stringify({ message: labels.errors.somethingWentWrong }), {
			status: 500,
		});
	}
};
