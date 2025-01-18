import type { SortOption, VisibilityFilter } from "./types";
import type { Posts } from "@/app/api/posts/route";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { labels } from "@/views/labels";

interface PostFiltersProps {
	posts: Posts[];
	sortBy: SortOption;
	setSortBy: (value: SortOption) => void;
	searchQuery: string;
	setSearchQuery: (value: string) => void;
	visibilityFilter: VisibilityFilter;
	setVisibilityFilter: (value: VisibilityFilter) => void;
	categoryFilter: string[];
	setCategoryFilter: (value: string[]) => void;
	filteredCount: number;
}

export const PostFilters = ({
	posts,
	sortBy,
	setSortBy,
	searchQuery,
	setSearchQuery,
	visibilityFilter,
	setVisibilityFilter,
	categoryFilter,
	setCategoryFilter,
	filteredCount,
}: PostFiltersProps) => {
	const uniqueCategories = Array.from(new Set(posts.map((post) => post.catSlug)));
	const isFiltering = searchQuery || visibilityFilter !== "all" || categoryFilter.length > 0;

	const toggleCategory = (category: string) => {
		setCategoryFilter(
			categoryFilter.includes(category)
				? categoryFilter.filter((cat) => cat !== category)
				: [...categoryFilter, category],
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold">{labels.posts.list}</h2>
				<Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder={labels.posts.sortBy} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="newest">{labels.posts.newest}</SelectItem>
						<SelectItem value="oldest">{labels.posts.oldest}</SelectItem>
						<SelectItem value="most-viewed">{labels.posts.mostViewed}</SelectItem>
						<SelectItem value="least-viewed">{labels.posts.leastViewed}</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex items-center justify-between text-sm text-muted-foreground">
				<div className="flex gap-2">
					<span>
						{labels.posts.total}: {posts.length}
					</span>
					{isFiltering && (
						<span>
							• {labels.posts.filtered}: {filteredCount}
						</span>
					)}
				</div>
				<span>
					{labels.posts.visible}: {posts.filter((post) => post.isVisible).length}
				</span>
			</div>

			<div className="space-y-2">
				<div className="flex flex-wrap gap-2">
					<Badge
						variant={visibilityFilter === "all" ? "default" : "outline"}
						className="cursor-pointer"
						onClick={() => setVisibilityFilter("all")}
					>
						{labels.posts.allPosts}
					</Badge>
					<Badge
						variant={visibilityFilter === "visible" ? "default" : "outline"}
						className="cursor-pointer"
						onClick={() => setVisibilityFilter("visible")}
					>
						{labels.posts.onlyVisible}
					</Badge>
					<Badge
						variant={visibilityFilter === "hidden" ? "default" : "outline"}
						className="cursor-pointer"
						onClick={() => setVisibilityFilter("hidden")}
					>
						{labels.posts.onlyHidden}
					</Badge>
				</div>

				<div className="flex flex-wrap gap-2">
					{uniqueCategories.map((category) => (
						<Badge
							key={category}
							variant={categoryFilter.includes(category) ? "default" : "outline"}
							className="cursor-pointer"
							onClick={() => toggleCategory(category)}
						>
							{category}
						</Badge>
					))}
				</div>
			</div>

			<Input
				placeholder={labels.posts.search}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="max-w-full"
			/>
		</div>
	);
};
