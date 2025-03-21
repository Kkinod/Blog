import Link from "next/link";
import { DeletePostDialog } from "./DeletePostDialog";
import { Button } from "@/shared/components/ui/button";
import { labels } from "@/shared/utils/labels";
import { type ListPost } from "@/app/api/posts/route";

interface PostItemProps {
	post: ListPost;
	onToggleVisibility: (post: ListPost) => Promise<void>;
	onTogglePick: (post: ListPost) => Promise<void>;
	onDeletePost: (post: ListPost) => Promise<void>;
	isDisabled: boolean;
	remainingPicks: number;
}

export const PostItem = ({
	post,
	onToggleVisibility,
	onTogglePick,
	onDeletePost,
	isDisabled,
	remainingPicks,
}: PostItemProps) => {
	return (
		<div className="py-4">
			<div className="flex flex-row items-center justify-between xs:flex-col xs:items-start xs:gap-4">
				<div>
					<h3 className="text-lg font-medium">{post.title}</h3>
					<p className="text-sm text-muted-foreground">
						{new Date(post.createdAt).toLocaleDateString()}
					</p>
					<p className="text-sm text-muted-foreground">
						{labels.posts.category}: {post.catSlug}
					</p>
					<p className="text-sm text-muted-foreground">
						{labels.posts.views}: {post.views}
					</p>
				</div>
				<div className="flex gap-2 s:grid s:w-full s:max-w-[210px] s:grid-cols-2">
					<Link href={`/admin/edit-post/${post.slug}`} className="s:w-full">
						<Button
							variant="default"
							size="sm"
							disabled={isDisabled}
							className="s:w-full s:max-w-[100px]"
						>
							{labels.posts.edit || "Edit"}
						</Button>
					</Link>
					<Button
						variant={post.isVisible ? "outline" : "secondary"}
						size="sm"
						onClick={() => onToggleVisibility(post)}
						disabled={isDisabled}
						className="s:w-full s:max-w-[100px]"
					>
						{post.isVisible ? labels.posts.hide : labels.posts.show}
					</Button>
					<Button
						variant={post.isPick ? "secondary" : "default"}
						size="sm"
						onClick={() => onTogglePick(post)}
						disabled={isDisabled || (!post.isPick && remainingPicks === 0)}
						className="s:w-full s:max-w-[100px]"
					>
						{post.isPick ? labels.posts.unpick : `${labels.posts.pick} (${remainingPicks})`}
					</Button>
					<DeletePostDialog post={post} onDeletePost={onDeletePost} isDisabled={isDisabled} />
				</div>
			</div>
		</div>
	);
};
