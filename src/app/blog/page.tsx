import { CardList } from "@/components/CardList/CardList";
import { Menu } from "@/components/Menu/Menu";
import "./blogPage.css";

const BlogPage = () => {
	return (
		<div className="blogPage">
			<h1 className="blogPage__title">Style Blog</h1>
			<div className="blogPage__content">
				<CardList />
				<Menu />
			</div>
		</div>
	);
};

export default BlogPage;
